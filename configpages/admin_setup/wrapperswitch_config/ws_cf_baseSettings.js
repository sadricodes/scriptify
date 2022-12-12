import { checkIfThereIsData } from "./ws_cf_buildPage.js";

const switchSettings = sadriModuleSettings.switchSettings;

// CHANGE VALUES ON CHECKBOX TOGGLE
const setSetting = () => {
  console.log(switchSettings);
  const settingName = window.event.target.getAttribute("id");
  switchSettings.settings[settingName] = window.event.target.checked;
};

// REMOVE GROUP PERMISSION ITEM
const removeGroupItem = (e) => {
  const item = parseInt(e.target.innerText);
  const property = e.target.parentNode.getAttribute("id");
  if (confirm(`Are you sure you want to remove ${item} from this list?`)) {
    const newArray = switchSettings.permissions[property].filter(
      (no) => no !== item
    );
    switchSettings.permissions[property] = newArray;
    checkIfThereIsData();
  }
};

// ADD GROUP PERMISSION ITEM
const addToList = (valueId, propName) => {
  const input = document.getElementById(valueId);
  const value = parseInt(input.value);
  if (switchSettings.permissions[propName].includes(value)) {
    // DO NOTHING
  } else {
    switchSettings.permissions[propName].push(value);
  }
  input.value = "";

  checkIfThereIsData();
};

// GET VALUE OF TEXT INPUTS AND CHANGE
const getTextValue = () => {
  const inputs = document.querySelectorAll(".switchtextinput");
  for (const input of inputs) {
    const data = input.value;
    const id = input.getAttribute("id");
    switchSettings.languageStrings[id] = data;
  }
};

export { setSetting, removeGroupItem, addToList, getTextValue };
