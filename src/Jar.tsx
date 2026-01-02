import {
  Box,
  Testbed,
  Vec2,
  World,
  Body,
  Circle,
  Math as plMath,
} from "planck/with-testbed";
import { useEffect, useRef } from "react";
import { emojiImageMap } from "./emojiImages";
import jarImageSrc from "./assets/jar.png";
import type { Emoji, EmojiName } from "./type";

const jarImage = new Image();
jarImage.src = jarImageSrc;
jarImage.width = 200;
jarImage.height = 343;

const SCALE_FACTOR = 20;
type BodyData = {
  type: string;
  emojiName?: EmojiName;
  id: string;
};
const isTestBed = false;

type EntityType = "container" | "emoji";
type ContainerProps = {
  width: number;
  height: number;
};
type EmojiProps = {
  name: EmojiName;
};

type Entity = {
  type: EntityType;
  id: string;
  isDrew: boolean;
  props?: ContainerProps | EmojiProps;
};

function syncWorldWithEntities(
  world: World,
  entities: Entity[],
  toRemoveIds: string[]
) {
  const jarHeight = jarImage.height / SCALE_FACTOR;
  const jarWidth = jarImage.width / SCALE_FACTOR;
  function createContainer(entity: Entity) {
    const container = world.createBody({
      allowSleep: false,
      position: new Vec2(0, -jarHeight / 2),
      userData: {
        type: "container",
        id: entity.id,
      },
    });

    container.createFixture(
      new Box(0.5, jarHeight / 2, new Vec2(jarWidth / 2, jarHeight / 2), 0),
      5
    );
    container.createFixture(
      new Box(0.5, jarHeight / 2, new Vec2(-jarWidth / 2, jarHeight / 2), 0),
      5
    );
    container.createFixture(new Box(jarWidth / 2, 0.5, new Vec2(0, 0), 0), 5);
  }
  function createEmoji(entity: Entity) {
    const shape = new Circle(0.7);
    const body = world.createDynamicBody({
      userData: {
        type: "emoji",
        id: entity.id,
        emojiName: (entity.props as EmojiProps).name,
      },
    });
    body.setPosition(
      new Vec2(
        plMath.random(-jarWidth / 6, jarWidth / 6),
        plMath.random(jarHeight / 2 + 2, jarHeight / 2 + 4)
      )
    );
    body.createFixture(shape, {
      density: 1,
      restitution: 0.3,
    });
  }

  entities
    .filter((c) => !c.isDrew)
    .forEach((entity) => {
      switch (entity.type) {
        case "container":
          createContainer(entity);
          break;
        case "emoji": {
          createEmoji(entity);
          break;
        }
      }
      entity.isDrew = true;
    });

  const toRemoveIdsSet = new Set(toRemoveIds);
  const toRemoveBodies: Body[] = [];
  for (let body = world.getBodyList(); body; body = body.getNext()) {
    const bodyData = body.getUserData() as BodyData;
    if (toRemoveIdsSet.has(bodyData.id)) {
      toRemoveBodies.push(body);
    }
  }
  toRemoveBodies.forEach((b) => world.destroyBody(b));
}

class Renderer {
  private world: World;
  private canvas: HTMLCanvasElement;
  private started: boolean = false;

  constructor(world: World, canvas: HTMLCanvasElement) {
    this.world = world;
    this.canvas = canvas;
  }
  start() {
    // Start frame loop
    this.started = true;
    this.loop(0);
  }

  loop(_timeStamp: number) {
    if (!this.started) {
      return;
    }

    this.world.step(1 / 60);
    this.clearCanvas();

    // Iterate over bodies
    const canvas = this.canvas;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    for (let body = this.world.getBodyList(); body; body = body.getNext()) {
      this.renderBody(body, offscreenCanvas);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreenCanvas, 0, 0);
    // Request a new frame
    window.requestAnimationFrame((t) => this.loop(t));
  }

  private clearCanvas() {
    const ctx = this.canvas.getContext("2d");
    ctx?.clearRect(0, 0, this.canvas.width || 0, this.canvas.height || 0);
  }

  renderBody(body: Body, canvas: HTMLCanvasElement) {
    const data = body.getUserData() as BodyData;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.save();
    switch (data.type) {
      case "emoji": {
        const pos = body.getPosition();
        const x = pos.x * SCALE_FACTOR + canvas.width / 2;
        const y = canvas.height / 2 - pos.y * SCALE_FACTOR;
        ctx.translate(x, y);
        const fixture = body.getFixtureList();
        if (!fixture) {
          throw Error(
            "No fixture in body for some reason. Please check emoji creation"
          );
        }
        const circleShape = fixture?.getShape() as Circle;
        const imgWidth = circleShape.m_radius * 2 * SCALE_FACTOR;
        const imgHeight = circleShape.m_radius * 2 * SCALE_FACTOR;
        ctx.drawImage(
          emojiImageMap[data.emojiName || "happy"],
          -imgWidth / 2,
          -imgHeight / 2,
          imgWidth,
          imgHeight
        );
        break;
      }
      case "container": {
        const x = (canvas.width - jarImage.width) / 2;
        const y = (canvas.height - jarImage.height) / 2;
        ctx.drawImage(jarImage, x, y, jarImage.width, jarImage.height);
        break;
      }
    }
    ctx.restore();
  }
}

type JarProps = {
  emojis: Emoji[];
};

function emojiToEntity(e: Emoji): Entity {
  return {
    type: "emoji",
    id: e.id,
    isDrew: false,
    props: {
      name: e.name,
    },
  };
}
type EntitiesMap = Record<string, Entity>;
export default function Jar(props: JarProps) {
  const worldRef = useRef<World | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const entities = useRef<EntitiesMap>({
    container: { type: "container", isDrew: false, id: "container" },
  });
  useEffect(() => {
    if (!worldRef.current) {
      worldRef.current = new World({
        gravity: { x: 0, y: -10 },
        allowSleep: true,
      });
    }
    const world = worldRef.current;
    syncWorldWithEntities(world, Object.values(entities.current), []);
    if (isTestBed) {
      const tb = Testbed.mount();
      tb.start(world);
    } else {
      if (!canvasRef.current) {
        return;
      }
      rendererRef.current = new Renderer(world, canvasRef.current);
      rendererRef.current.start();
    }
  }, []);
  useEffect(() => {
    let requiredSync = false;

    const newEmojiIds = new Set<string>();

    // Add new emojis
    props.emojis.forEach((e) => {
      if (!entities.current[e.id]) {
        entities.current[e.id] = emojiToEntity(e);
        requiredSync = true;
      }
      newEmojiIds.add(e.id);
    });

    // Remove emojis
    const toRemoveIds: string[] = [];
    Object.keys(entities.current).forEach((id) => {
      if (id === "container") {
        return;
      }
      if (!newEmojiIds.has(id)) {
        delete entities.current[id];
        toRemoveIds.push(id);
        requiredSync = true;
      }
    });

    if (!worldRef.current) {
      return;
    }
    if (requiredSync) {
      syncWorldWithEntities(
        worldRef.current,
        Object.values(entities.current),
        toRemoveIds
      );
    }
  }, [props.emojis]);
  if (isTestBed) {
    return null;
  }
  return (
    <>
      <div>
        <canvas
          id="canvas"
          width={1200}
          height={600}
          style={{ backgroundColor: "gray" }}
          ref={canvasRef}
        />
      </div>
    </>
  );
}
