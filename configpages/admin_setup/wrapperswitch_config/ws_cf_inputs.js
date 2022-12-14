import { reDraw } from "../global_admin_scripts/global_admin.js";
import { buildNpcs } from "./ws_cf_buildPage.js";
import { checkIfThereIsData } from "../wrapperswitch_config/ws_cf_buildPage.js";

// SET CHANGES TO INPUTS
const setInputChanges = () => {
  const inputArray = [];

  const fieldBoxes = document.querySelectorAll(".inputBox");
  for (const item of fieldBoxes) {
    const inputElement = {};
    const inputs = item.querySelectorAll("input, select");
    for (const input of inputs) {
      const property = input.getAttribute("name");
      inputElement[property] = input.value;
    }
    inputArray.push(inputElement);
  }
  sMSet.switchSettings.inputData = inputArray;
};

// REMOVE AN INPUT ITEM
const removeInputItem = (removeMe, myName) => {
  const makeSure = confirm(`Are you sure you want to remove ${myName}?`);

  if (makeSure) {
    const filteredArray = sMSet.switchSettings.inputData.filter(
      (item) => item.id !== removeMe
    );
    sMSet.switchSettings.inputData = filteredArray;
    checkIfThereIsData();
  } else {
    return;
  }
};

// ADD A NEW INPUT ITEM
const addNewInput = () => {
  reDraw();
  const newItem = {
    name: "New Field",
    id: "",
    code: "",
    type: "text",
    order: sMSet.switchSettings.inputData.length + 1,
    required: "",
  };
  const newData = [...sMSet.switchSettings.inputData, newItem];
  sMSet.switchSettings.inputData = newData;
  checkIfThereIsData();
};

// SEE IF ANY CODES HAVE CHANGED AND CHANGE NPCS ACCORDINGLY
const switchValues = (e, item) => {
  const changed = e.target.value;

  const inputElement = sMSet.switchSettings.inputData.find(
    (input) => input.id === e.target.parentNode.parentNode.getAttribute("id")
  );

  if (inputElement) {
    if (inputElement.code === "name" && item === "code") {
      e.target.value = inputElement.code;
      return;
    }

    if (item === "id") {
      sMSet.switchSettings.inputData.map((element) => {
        if (element.id === inputElement.id) {
          element.id = changed;
        }
      });
    }

    if (item === "code") {
      const newList = [];
      for (let npc of sMSet.switchSettings.npcs) {
        const newChar = { ...npc, [changed]: npc[inputElement.code] };
        delete newChar[inputElement.code];
        newList.push(newChar);
      }
      sMSet.switchSettings.npcs = newList;
    }
  }

  setInputChanges();
  buildNpcs();
};

export { setInputChanges, removeInputItem, switchValues, addNewInput };
