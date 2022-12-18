// DEFINE SETTINGS HERE

const settingsFromSite = false;
const inputDataFromSite = false;

const sMSet = {
  systemData: {},
  switchSettings: {
    currentlyEnabled: true,
    languageStrings: {
      sectionTitle: "Set Character Information",
      saveCharacterText: "Select A Saved Character",
      savedCharacterDefault: "-- SELECT A CHARACTER --",
      selectYourCharsText: "Select from Your Characters",
      selectNpcCharsText: "Select from Global NPCs",
      clearSelectButton: "Clear Selections",
    },
    permissions: {
      groupsCanUse: [4],
      groupsCanNotUse: [14],
      memberCanUse: [1, 3],
      memberCanNotUse: [12, 9],
    },
    settings: {
      typeOptions: ["text", "image"],
      customFieldVariable: 114,
      allowUserChars: true,
      npcChars: true,
      showSavedDrop: true,
      showInputEntry: true,
    },
    systemData: {
      memberData: [
        {
          name: "Merlwyb",
          avatar: "https://img.nickpic.host/FLUPF5.png",
          shortcode: "ade",
          sts: "this is a status",
          order: 3,
          type: "pc",
        },
        {
          name: "Gold Mario",
          avatar: "https://img.nickpic.host/atc3Xf.png",
          shortcode: "abd",
          order: 1,
          sts: "gold mario should have a status too",
          type: "pc",
        },
        {
          name: "Lord Hien",
          avatar: "https://img.nickpic.host/FLUz1n.png",
          shortcode: "hie",
          order: 2,
          sts: "Lord Bae for life",
          type: "pc",
        },
      ],
    },
    inputData: [
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
    ],
    npcs: [
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
        toggleOpen: true,
        desc: "Kind of a legend, kind of annoying",
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
        toggleOpen: true,
        desc: "Mario, but hardcore",
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
        toggleOpen: false,
        desc: "Frozen husband",
      },
    ],
  },
};

console.log(String(sMSet));
