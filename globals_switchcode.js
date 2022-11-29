// GLOBAL VARIABLES
const testData = [
  {
    name: "Merlwyb",
    avatar: "https://img.nickpic.host/FLUPF5.png",
    shortcode: "ade",
  },
  {
    name: "Gold Mario",
    avatar: "https://img.nickpic.host/atc3Xf.png",
    shortcode: "abd",
  },
  {
    name: "Lord Hien",
    avatar: "https://img.nickpic.host/FLUz1n.png",
    shortcode: "hie",
  },
];

const inputData = [
  {
    name: "Character Name",
    id: "characterName",
    code: "name",
    type: "text",
  },
  {
    name: "Avatar Link",
    id: "characterAv",
    code: "avatar",
    type: "image",
  },
  { name: "Character Status", id: "charStat", code: "sts", type: "text" },
];

const switchSettings = {
  sectionTitle: "Set Character Information",
  saveCharacterText: "Select A Saved Character",
  savedCharacterDefault: "-- SELECT A CHARACTER --",
  showSavedDrop: true,
  showInputEntry: true,
};

export { switchSettings, inputData, testData };
