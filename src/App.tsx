import { useState } from "react";
import "./App.css";
import Jar from "./Jar";
import { EMOJI_NAMES, type Emoji } from "./type";
import { emojiImageMap } from "./emojiImages";

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
      <div style={{ marginBottom: "20px" }}>
        <h3>Select Emoji:</h3>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            maxWidth: "fit-content",
          }}
        >
          {EMOJI_NAMES.map((emojiName) => (
            <button
              key={emojiName}
              onClick={() => {
                setEmojis([
                  ...emojis,
                  { name: emojiName, id: crypto.randomUUID() },
                ]);
              }}
              style={{
                padding: "8px",
                border: "2px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title={emojiName}
            >
              <img
                src={emojiImageMap[emojiName].src}
                alt={emojiName}
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Jar emojis={emojis} />
      </div>
    </>
  );
}

export default App;
