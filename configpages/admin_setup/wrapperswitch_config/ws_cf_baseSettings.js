import { checkIfThereIsData } from "./ws_cf_buildPage.js";

// CHANGE VALUES ON CHECKBOX TOGGLE
const setSetting = () => {
  const settingName = window.event.target.getAttribute("id");
  switchSettings[settingName] = window.event.target.checked;
};

// REMOVE GROUP PERMISSION ITEM
const removeGroupItem = (e) => {
  const item = parseInt(e.target.innerText);
  const property = e.target.parentNode.getAttribute("id");
  if (confirm(`Are you sure you want to remove ${item} from this list?`)) {
    const newArray = switchSettings[property].filter((no) => no !== item);
    switchSettings[property] = newArray;
    checkIfThereIsData();
  }
};

// ADD GROUP PERMISSION ITEM
const addToList = (valueId, propName) => {
  const input = document.getElementById(valueId);
  const value = parseInt(input.value);
  if (switchSettings[propName].includes(value)) {
    // DO NOTHING
  } else {
    switchSettings[propName].push(value);
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
    switchSettings[id] = data;
  }
};

export { setSetting, removeGroupItem, addToList, getTextValue };
