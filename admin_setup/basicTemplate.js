// DEFINE SETTINGS HERE

const switchSettings = {
  sectionTitle: "Set Character Information",
  saveCharacterText: "Select A Saved Character",
  savedCharacterDefault: "-- SELECT A CHARACTER --",
  showSavedDrop: true,
  showInputEntry: true,
  //   customFieldVariable: <!-- |field_114| -->,
  //   currentUser: <!-- |id| -->,
  //   currentUserGroup: <!-- |g_id| -->,
  allowUserChars: true,
  npcChars: true,
  groupsCanUse: [4],
  groupsCanNotUse: [14],
  memberCanUse: [1, 3],
  memberCanNotUse: [12, 9],
};

console.log(switchSettings);

// DEFINE INPUT DATA HERE
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

// DEFINE GLOBAL NPCS HERE
const npcs = [
  {
    name: "Moenbryda",
    avatar: "https://img.nickpic.host/FLU0Km.png",
    shortcode: "npc-exa",
    allowAll: true,
    exceptGroups: [4],
    exceptMembers: [2, 5],
    overrideMembers: [11],
    type: "npc",
  },
  {
    name: "Metal Mario",
    avatar: "https://img.nickpic.host/atcbLX.png",
    shortcode: "npc-mmr",
    allowAll: true,
    exceptGroups: [7],
    exceptMembers: [11, 5],
    overrideMembers: [11],
    type: "npc",
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
  },
];
