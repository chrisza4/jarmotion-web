import {
  Box,
  Testbed,
  Vec2,
  World,
  Fixture,
  Joint,
  Body,
  type TestbedInterface,
  Circle,
  Math as plMath,
} from "planck";
import { useEffect, useRef } from "react";
import happy from "./assets/emojis/happy.png";

type BodyData = {
  type: string;
};
class Renderer {
  private world: World;
  private started: boolean = false;

  constructor(world: World) {
    this.world = world;
  }
  start() {
    // Add listeners
    this.world.on("remove-body", this.removeBody);
    this.world.on("remove-joint", this.removeJoint);
    this.world.on("remove-fixture", this.removeFixture);

    // Start frame loop
    this.started = true;
    this.loop(0);
  }

  loop(_timeStamp: number) {
    if (!this.started) {
      return;
    }

    // In each frame call world.step with fixed timeStep
    // This is a simplified implementation, in a more advanced implementation
    // you need to use elapsed time since last frame and call step more than once if needed.
    // When called by requestAnimationFrame() you'll get a timestamp as argument,
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    this.world.step(1 / 60);
    this.clearCanvas();

    // Iterate over bodies
    const canvas = this.getCanvas();
    if (!canvas) {
      return;
    }
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }

    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    for (let body = this.world.getBodyList(); body; body = body.getNext()) {
      this.renderBody(body, offscreenCanvas);
      // ... and fixtures
      for (
        let fixture = body.getFixtureList();
        fixture;
        fixture = fixture.getNext()
      ) {
        this.renderFixture(fixture);
      }
    }

    // Iterate over joints
    for (
      let joint = this.world.getJointList();
      joint;
      joint = joint.getNext()
    ) {
      this.renderJoint(joint);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreenCanvas, 0, 0);
    // Request a new frame
    window.requestAnimationFrame((t) => this.loop(t));
  }

  private clearCanvas() {
    const canvas = this.getCanvas();
    const ctx = this.getContext();
    ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
  }

  private getCanvas() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.log("Canvas not found");
      return;
    }
    return canvas;
  }

  private getContext() {
    const ctx = this.getCanvas()?.getContext("2d");
    if (!ctx) {
      console.log("CTX not found");
      return;
    }
    return ctx;
  }

  renderBody(body: Body, canvas: HTMLCanvasElement) {
    const data = body.getUserData() as BodyData;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const SCALE_FACTOR = 20;
    ctx.save();
    switch (data.type) {
      case "emoji": {
        const img = new Image();
        img.src = happy;

        const pos = body.getPosition();
        const x = pos.x * SCALE_FACTOR + canvas.width / 2; // Scale factor of 30
        const y = canvas.height / 2 - pos.y * SCALE_FACTOR; // Flip Y axis
        ctx.translate(x, y);
        const imgWidth = 20;
        const imgHeight = 20;
        ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
      }
    }
    ctx.restore();
  }

  renderFixture(fixture: Fixture) {
    // Render or update fixture rendering
  }

  renderJoint(joint: Joint) {
    // Render or update joint rendering
  }

  removeBody(body: Body) {
    // Remove body rendering
  }

  removeFixture(fixture: Fixture) {
    // Remove fixture rendering
  }

  removeJoint(joint: Joint) {
    // Remove joint from rendering
  }
}

export default function Jar() {
  const worldRef = useRef<World | null>(null);
  useEffect(() => {
    if (!worldRef.current) {
      worldRef.current = new World({
        gravity: { x: 0, y: -10 },
        allowSleep: true,
      });
    }
    const world = worldRef.current;

    const container = world.createBody({
      allowSleep: false,
      position: Vec2(0, 10),
      userData: {
        type: "container",
      },
    });

    container.createFixture(new Box(0.5, 20, new Vec2(10, 0), 0), 5);
    container.createFixture(new Box(0.5, 20, new Vec2(-10, 0), 0), 5);
    container.createFixture(new Box(10, 0.5, new Vec2(0, -20), 0), 5);

    const shape = new Circle(0.5);
    let count = 0;
    while (count < 20) {
      const body = world.createDynamicBody({
        userData: {
          type: "emoji",
        },
      });
      body.setPosition(
        new Vec2(plMath.random(-10, 10), 10 + plMath.random(-10, 10))
      );
      body.createFixture(shape, 1);
      ++count;
    }
    new Renderer(world).start();
  }, []);
  return (
    <canvas
      id="canvas"
      width={1200}
      height={500}
      style={{ backgroundColor: "gray", opacity: 1 }}
    />
  );
}
