import { switchSettings, testData, inputData } from "./globals_switchcode.js";
import { getItem, splitItems } from "./helper_functions.js";

// CREATE REPLACE STRING CODES
const makeReplaceString = (key, value) => {
  return `${key}-${value}-${key}`;
};

// GET CHARACTER ENTRY FROM DROPDOWN
const getDropCharacterValue = () => {
  const dropVal = document.getElementById("dropselect").value;
  const char = testData.filter((char) => char.shortcode == dropVal)[0];

  return char;
};

// SET THE INFORMATION IN THE POST BOX
const setInfo = (postBox, inputs) => {
  const dropVal = getDropCharacterValue();
  let itemString = "";
  const postText = postBox.value;

  // USE INPUTS TO SET CHARACTER
  for (const input of inputs) {
    if (input.value) {
      const item = input.value;
      const code = input.getAttribute("switch-data-code");
      const string = makeReplaceString(code, item);
      itemString += string;
    }
  }

  const replaceString = `${postText} \n[doHTML]<div class="codeHide" switch-data-box="switchItems">${itemString}</div>[/doHTML]`;
  postBox.value = replaceString;
};

// FIND AND SET VALUES
const findAndSet = (item) => {
  if (item) {
    const element = document.querySelector([
      `[switch-data-code="${item.name}"]`,
    ]);
    if (element) {
      element.value = item.item;
    }
  }
};

// SET VALUES IN INPUTS FROM DROPDOWN
const setTextValsFromSelect = () => {
  const char = getDropCharacterValue();
  const manualInputs = document.querySelectorAll(".manualInput");
  const propList = [];
  for (const item in char) {
    const object = { item: `${char[item]}`, name: `${item}` };
    propList.push(object);
  }

  for (const item of manualInputs) {
    item.value = "";
  }

  if (propList) {
    for (const item of propList) {
      findAndSet(item);
    }
  }
};

// BIND DATA BACK TO FORM FIELDS IF WE'RE EDITING
const bindBackForEdit = (postText, postBox) => {
  const startMarker = `[doHTML]<div class="codeHide" switch-data-box="switchItems">`;
  const endMarker = `</div>[/doHTML]`;
  const start = postText.indexOf(startMarker);
  const end = postText.indexOf(endMarker, start);
  const items = postText.slice(start + startMarker.length, end);
  const itemsArray = splitItems(items);
  const itemString = postText.slice(start, end + endMarker.length);
  const postTextRaw = postText.replace(itemString, "").trim();

  if (itemsArray && itemsArray.itemList) {
    for (const item of itemsArray.itemList) {
      findAndSet(item);
    }
  }

  postBox.value = postTextRaw;
};

export { setInfo, bindBackForEdit, setTextValsFromSelect };
