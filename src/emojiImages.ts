import depressed from "./assets/emojis/depressed.png";
import happy from "./assets/emojis/happy.png";
import stupid from "./assets/emojis/stupid.png";
import crazy from "./assets/emojis/crazy.png";
import sad from "./assets/emojis/sad.png";
import surprised from "./assets/emojis/surprised.png";
import confident from "./assets/emojis/confident.png";
import envious from "./assets/emojis/envious.png";
import curious from "./assets/emojis/curious.png";
import jealous from "./assets/emojis/jealous.png";
import confused from "./assets/emojis/confused.png";
import sorry from "./assets/emojis/sorry.png";
import anxious from "./assets/emojis/anxious.png";
import withdraw from "./assets/emojis/withdraw.png";
import angry from "./assets/emojis/angry.png";
import enraged from "./assets/emojis/enraged.png";
import cold from "./assets/emojis/cold.png";
import indifferent from "./assets/emojis/indifferent.png";
import miserable from "./assets/emojis/miserable.png";
import bored from "./assets/emojis/bored.png";
import ashamed from "./assets/emojis/ashamed.png";
import hot from "./assets/emojis/hot.png";
import determined from "./assets/emojis/determined.png";
import bashful from "./assets/emojis/bashful.png";
import sick from "./assets/emojis/sick.png";
import afraid from "./assets/emojis/afraid.png";
import love from "./assets/emojis/love.png";
import amused from "./assets/emojis/amused.png";
import frightened from "./assets/emojis/frightened.png";
import suspicious from "./assets/emojis/suspicious.png";

export type EmojiName =
  | "depressed"
  | "happy"
  | "stupid"
  | "crazy"
  | "sad"
  | "surprised"
  | "confident"
  | "envious"
  | "curious"
  | "jealous"
  | "confused"
  | "sorry"
  | "anxious"
  | "withdraw"
  | "angry"
  | "enraged"
  | "cold"
  | "indifferent"
  | "miserable"
  | "bored"
  | "ashamed"
  | "hot"
  | "determined"
  | "bashful"
  | "sick"
  | "afraid"
  | "love"
  | "amused"
  | "frightened"
  | "suspicious";

export const emojiImageMap: Record<EmojiName, HTMLImageElement> = {
  depressed: new Image(),
  happy: new Image(),
  stupid: new Image(),
  crazy: new Image(),
  sad: new Image(),
  surprised: new Image(),
  confident: new Image(),
  envious: new Image(),
  curious: new Image(),
  jealous: new Image(),
  confused: new Image(),
  sorry: new Image(),
  anxious: new Image(),
  withdraw: new Image(),
  angry: new Image(),
  enraged: new Image(),
  cold: new Image(),
  indifferent: new Image(),
  miserable: new Image(),
  bored: new Image(),
  ashamed: new Image(),
  hot: new Image(),
  determined: new Image(),
  bashful: new Image(),
  sick: new Image(),
  afraid: new Image(),
  love: new Image(),
  amused: new Image(),
  frightened: new Image(),
  suspicious: new Image(),
};

emojiImageMap.depressed.src = depressed;
emojiImageMap.happy.src = happy;
emojiImageMap.stupid.src = stupid;
emojiImageMap.crazy.src = crazy;
emojiImageMap.sad.src = sad;
emojiImageMap.surprised.src = surprised;
emojiImageMap.confident.src = confident;
emojiImageMap.envious.src = envious;
emojiImageMap.curious.src = curious;
emojiImageMap.jealous.src = jealous;
emojiImageMap.confused.src = confused;
emojiImageMap.sorry.src = sorry;
emojiImageMap.anxious.src = anxious;
emojiImageMap.withdraw.src = withdraw;
emojiImageMap.angry.src = angry;
emojiImageMap.enraged.src = enraged;
emojiImageMap.cold.src = cold;
emojiImageMap.indifferent.src = indifferent;
emojiImageMap.miserable.src = miserable;
emojiImageMap.bored.src = bored;
emojiImageMap.ashamed.src = ashamed;
emojiImageMap.hot.src = hot;
emojiImageMap.determined.src = determined;
emojiImageMap.bashful.src = bashful;
emojiImageMap.sick.src = sick;
emojiImageMap.afraid.src = afraid;
emojiImageMap.love.src = love;
emojiImageMap.amused.src = amused;
emojiImageMap.frightened.src = frightened;
emojiImageMap.suspicious.src = suspicious;
