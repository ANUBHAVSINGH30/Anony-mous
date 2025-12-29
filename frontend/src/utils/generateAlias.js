const adjectives = [
  "Silent",
  "Lost",
  "Midnight",
  "Hidden",
  "Lonely",
  "Curious",
  "Broken",
  "Calm",
  "Wandering",
];

const nouns = [
  "Owl",
  "Fox",
  "Coder",
  "Soul",
  "Shadow",
  "Dreamer",
  "Wolf",
  "Mind",
];

export function generateAlias() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj} ${noun}`;
}
