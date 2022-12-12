import { checkIfThereIsData } from "./ws_cf_buildPage.js";

// GET NPC VALUES FROM FIELDS AND CREATE NEW NPC LIST
const getNpcValues = () => {
  const npcList = [];
  const npcDivs = document.querySelectorAll(".sectionNpcEntry");
  for (const div of npcDivs) {
    const id = div.getAttribute("switch-data-npc-id");
    const npc = npcs.filter((char) => char.shortcode === id)[0];
    const inputs = div.querySelectorAll(".npcEntryInput");
    for (const input of inputs) {
      const ident = input.getAttribute("switch-data-input");
      const value = input.value;
      if (value === "undefined") {
      }
      const code = switchSettings.inputData.filter(
        (item) => item.id === ident
      )[0];

      if (code) {
        npc[code.code] = value;
      }
    }
    npcList.push(npc);
  }
  npcs = npcList;
};

// ADD NEW EMPTY NPC TO LIST
const addNewNpc = () => {
  getNpcValues();
  const exampleNpc = npcs[1];
  const newNpc = {};
  for (const property in exampleNpc) {
    if (property === "type") {
      newNpc[property] = "npc";
    } else if (property === "name") {
      newNpc[property] = "New Character";
    } else if (property === "order") {
      newNpc[property] = npcs.length + 1;
    } else if (property === "shortcode") {
      newNpc[property] = `npc-${Date.now()}`;
    } else if (
      property === "exceptGroups" ||
      property === "exceptMembers" ||
      property === "overrideMembers"
    ) {
      newNpc[property] = [];
    } else {
      newNpc[property] = "";
    }
  }
  const fullList = [...npcs, newNpc];
  npcs = fullList;
  checkIfThereIsData();
};

// ADD NEW EXCLUSION ITEM TO NPC PERMISSIONS BOX
const addNpcItem = (id, npc, property) => {
  const input = document.getElementById(id);
  const value = parseInt(input.value);

  const char = npcs.filter((npcList) => npcList.shortcode === npc)[0];
  char[property].push(value);

  checkIfThereIsData();
};

// REMOVE EXCUSION ITEM FROM NPC PERMISSIONS BOX
const removeNpcItem = (e) => {
  const item = parseInt(e.target.innerText);
  const makeSure = confirm(
    `Are you sure you want to remove ${item} from this list?`
  );
  if (makeSure) {
    const property = e.target.parentNode.getAttribute("switch-data-extype");
    const npcEntry = npcs.filter(
      (char) =>
        char.shortcode === e.target.parentNode.getAttribute("switch-data-npc")
    );
    const newArray = npcEntry[0][property].filter((test) => test != item);
    npcEntry[0][property] = newArray;
  }
  checkIfThereIsData();
};

export { addNpcItem, addNewNpc, getNpcValues, removeNpcItem };
