// DEFINE SETTINGS HERE

const settingsFromSite = false;
const inputDataFromSite = false;

const switchSettings = {
  sectionTitle: "Set Character Information",
  saveCharacterText: "Select A Saved Character",
  savedCharacterDefault: "-- SELECT A CHARACTER --",
  selectYourCharsText: "Select from Your Characters",
  selectNpcCharsText: "Select from Global NPCs",
  clearSelectButton: "Clear Selections",
  showSavedDrop: true,
  showInputEntry: true,
  customFieldVariable: 114,
  currentUserVariable: `<!-- |id| -->`,
  currentUserGroupVariable: `<!-- |g_id| -->`,
  allowUserChars: true,
  npcChars: true,
  groupsCanUse: [4],
  groupsCanNotUse: [14],
  memberCanUse: [1, 3],
  memberCanNotUse: [12, 9],
  typeOptions: ["text", "image"],
};

// DEFINE INPUT DATA HERE
let inputData = [
  {
    name: "Character Name",
    id: "characterName",
    code: "name",
    type: "text",
    order: 1,
    required: true,
  },
  {
    name: "Avatar Link",
    id: "characterAv",
    code: "avatar",
    type: "image",
    order: 2,
    required: false,
  },
  {
    name: "Character Status",
    id: "charStat",
    code: "sts",
    type: "text",
    order: 3,
    required: true,
  },
];

// DEFINE GLOBAL NPCS HERE
let npcs = [
  {
    name: "Moenbryda",
    avatar: "https://img.nickpic.host/FLU0Km.png",
    shortcode: "npc-exa",
    allowAll: true,
    exceptGroups: [4],
    exceptMembers: [2, 5],
    overrideMembers: [11],
    type: "npc",
    order: 1,
    sts: "It's a thing",
  },
  {
    name: "Metal Mario",
    avatar: "https://img.nickpic.host/atcbLX.png",
    shortcode: "npc-mmr",
    allowAll: true,
    exceptGroups: [7],
    exceptMembers: [11, 5],
    overrideMembers: [14],
    type: "npc",
    order: 2,
    sts: "another status",
  },
  {
    name: "Aymeric",
    avatar: "https://img.nickpic.host/FLUVvN.png",
    shortcode: "npc-aym",
    allowAll: false,
    exceptGroups: [40],
    exceptMembers: [2, 5],
    overrideMembers: [1],
    type: "npc",
    order: 3,
    sts: "don't wanna see undefined",
  },
];
