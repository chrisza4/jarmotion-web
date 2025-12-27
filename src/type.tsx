export const EMOJI_NAMES = [
  "depressed",
  "happy",
  "stupid",
  "crazy",
  "sad",
  "surprised",
  "confident",
  "envious",
  "curious",
  "jealous",
  "confused",
  "sorry",
  "anxious",
  "withdraw",
  "angry",
  "enraged",
  "cold",
  "indifferent",
  "miserable",
  "bored",
  "ashamed",
  "hot",
  "determined",
  "bashful",
  "sick",
  "afraid",
  "love",
  "amused",
  "frightened",
  "suspicious",
] as const;

export type EmojiName = (typeof EMOJI_NAMES)[number];

export type Emoji = {
  name: EmojiName;
  id: string;
};
