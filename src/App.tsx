import { useState } from "react";
import "./App.css";
import Jar from "./Jar";
import { EMOJI_NAMES, type Emoji } from "./type";

function initialEmojis(): Emoji[] {
  const result: Emoji[] = [
    { name: "happy", id: "1" },
    { name: "confident", id: "2" },
  ];
  return result;
}

function pickRandomFromArray<T>(arr: readonly T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
function App() {
  const [emojis, setEmojis] = useState(initialEmojis());
  return (
    <>
      <div>
        <button
          onClick={() => {
            // Random Emoji
            const thisEmojiName = pickRandomFromArray(EMOJI_NAMES);
            setEmojis([
              ...emojis,
              { name: thisEmojiName, id: crypto.randomUUID() },
            ]);
          }}
        >
          Add Random Emotion
        </button>
        <button
          onClick={() => {
            const toRemove = pickRandomFromArray(emojis);
            setEmojis(emojis.filter((c) => c.id !== toRemove.id));
          }}
        >
          Remove random emojis
        </button>
        <button
          onClick={() => {
            setEmojis([]);
          }}
        >
          Remove all
        </button>
      </div>
      <div>
        <Jar emojis={emojis} />
      </div>
    </>
  );
}

export default App;
