import { getCharacters } from "./ws_cf_viewcharacters.js";
import {
  checkUniqueCodes,
  clearWarnings,
} from "../../../global_scripts/global_helpers.js";

// VALIDATE AGAINST REQUIRED INPUTS
const validateCharacters = () => {
  clearWarnings();
  let proceed = true;
  const inputs = document.querySelectorAll(".charInput");
  for (const input of inputs) {
    const inputCode = input.getAttribute("switch-data-input");
    const inputData = sMSet.switchSettings.inputData.find(
      (item) => item.id === inputCode
    );

    if (inputData === undefined || inputData.required) {
      if (!input.value) {
        console.log(input, "is required");
        input.parentNode.classList.add("errorState");
        input.parentNode.parentNode.parentNode.classList.add("errorState");
        const errorBox = document.createElement("span");
        errorBox.classList.add("warningBox");
        errorBox.innerText = "This item is required";
        input.parentNode.appendChild(errorBox);
        proceed = false;
      }
    }
    if (inputCode === "shortcode") {
      const noDupes = checkUniqueCodes(
        input.value,
        [
          ...sMSet.switchSettings.npcs,
          ...sMSet.switchSettings.systemData.memberData,
        ],
        inputCode
      );
      if (!noDupes.proceed) {
        input.parentNode.classList.add("errorState");
        input.parentNode.parentNode.parentNode.classList.add("errorState");
        const errorBox = document.createElement("span");
        errorBox.classList.add("warningBox");
        errorBox.innerText = noDupes.text;
        input.parentNode.appendChild(errorBox);
        proceed = false;
      }
    }
  }
  return proceed;
};

// GET CHARACTER DATA FROM INPUTS, SAVE TO NEW ARRAY AND SAVE TO DATA OBJECT
const saveCharacters = () => {
  const charList = [];

  const chars = document.querySelectorAll(".characterEntry");
  for (const char of chars) {
    const newCharItem = {};

    const inputs = char.querySelectorAll(".charInput");
    for (const input of inputs) {
      const inputId = input.getAttribute("switch-data-input");
      const inputData = sMSet.switchSettings.inputData.filter(
        (input) => input.id === inputId
      )[0];
      if (inputData) {
        newCharItem[inputData.code] = input.value;
      } else {
        newCharItem[inputId] = input.value;
      }
      newCharItem.type = "pc";
    }
    charList.push(newCharItem);
  }
  sMSet.switchSettings.systemData.memberData = charList;
};

const deleteChar = () => {
  saveCharacters();
  const charId = window.event.target.parentNode.parentNode.getAttribute(
    "switch-data-character-id"
  );
  const char = sMSet.switchSettings.systemData.memberData.filter(
    (item) => item.shortcode === charId
  )[0];
  const sure = confirm(`Are you sure you want to remove ${char.name}?`);

  if (sure) {
    const newList = sMSet.switchSettings.systemData.memberData.filter(
      (char) => char.shortcode !== charId
    );
    sMSet.switchSettings.systemData.memberData = newList;
    getCharacters();
  }
};

const newChar = () => {
  saveCharacters();
  let order;

  if (sMSet.switchSettings.systemData.memberData) {
    order = sMSet.switchSettings.systemData.memberData.length + 1;
  } else {
    order = 1;
  }

  const newChar = {
    type: "pc",
    name: "New Character",
    shortcode: Date.now(),
    order: order,
  };
  sMSet.switchSettings.inputData.map((input) => {
    if (input.code !== "name") {
      newChar[input.code] = "";
    }
  });
  sMSet.switchSettings.systemData.memberData
    ? sMSet.switchSettings.systemData.memberData.push(newChar)
    : (sMSet.switchSettings.systemData.memberData = [newChar]);

  getCharacters();
};

export { saveCharacters, validateCharacters, newChar, deleteChar };
