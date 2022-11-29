import {
  setTextValsFromSelect,
  bindBackForEdit,
} from "./post_screen_functions.js";
import { setInfo } from "./post_screen_functions.js";

// CLEAR BUTTON FUNCTION
const clearAll = () => {
  const clearable = document.querySelectorAll(".clearableInput");
  for (const item of clearable) {
    item.value = "";
  }
};

// MAKE BOXES FOR INPUTS
const makeInputBox = (input) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("pformright");
  wrapper.style.cssText =
    "padding: 10px; flex-basis: 100%; display: flex; align-items: center;";

  if (!switchSettings.showInputEntry) {
    wrapper.style.cssText = "display: none;";
  }

  const title = document.createElement("span");
  title.innerText = input.name;

  const inputEl = document.createElement("input");
  inputEl.classList.add("forminput", "clearableInput", "manualInput");
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("id", input.id);
  inputEl.setAttribute("switch-data-code", input.code);
  inputEl.style.cssText = "margin-left: 1ch; flex-grow: 1;";

  wrapper.appendChild(title);
  wrapper.appendChild(inputEl);

  return wrapper;
};

// PROGRAMATICALLY CREATE INPUTS
const placeInPostBox = () => {
  // CREATE CONTAINING DIV
  const outerWrapper = document.createElement("tr");
  const inputWrapper = document.createElement("td");
  inputWrapper.style.cssText = "display: flex; flex-wrap: wrap;";
  inputWrapper.setAttribute("colspan", "2");

  // CREATE THE HEADER
  const inputHeader = document.createElement("td");
  inputHeader.classList.add("pformstrip");
  inputHeader.setAttribute("colspan", "2");
  inputHeader.innerText = switchSettings.sectionTitle;

  // CHECK NPC PERMISSIONS
  const checkNpcPerm = (npc) => {
    if (npc.allowAll) {
      // exclude members or groups
      if (npc.overrideMembers.includes(switchSettings.currentUser)) {
        return false;
      }
      if (npc.exceptMembers.includes(switchSettings.currentUser)) {
        return false;
      }
      if (npc.exceptGroups.includes(switchSettings.currentUserGroup)) {
        return false;
      }
      return true;
    } else if (!npc.allowAll) {
      // include members or groups
      if (npc.overrideMembers.includes(switchSettings.currentUser)) {
        return true;
      }
      if (npc.exceptMembers.includes(switchSettings.currentUser)) {
        return true;
      }
      if (npc.exceptGroups.includes(switchSettings.currentUserGroup)) {
        return true;
      }
      return false;
    }
  };

  // CREATE OPTION TAGS
  const makeAppendOption = (chars) => {
    // DO SOMETHING
    for (var i = 0; i < chars.length; i++) {
      if (chars[i].type == "npc") {
        if (!checkNpcPerm(chars[i])) {
          continue;
        }
      }

      const optionTag = document.createElement("option");
      optionTag.setAttribute("value", chars[i].shortcode);
      optionTag.innerText = chars[i].name;

      dropMenu.appendChild(optionTag);
    }
  };

  // CREATE & APPEND DROPDOWN
  const dropWrap = document.createElement("div");
  dropWrap.classList.add("pformright");
  dropWrap.style.cssText = "padding: 10px; flex-basis: 100%;";
  if (!switchSettings.showSavedDrop) {
    dropWrap.style.cssText = "display: none;";
  }
  const dropText = document.createElement("span");
  dropText.innerText = switchSettings.saveCharacterText;
  dropWrap.append(dropText);
  const dropMenu = document.createElement("select");
  dropMenu.classList.add("forminput", "clearableInput");
  dropMenu.style.cssText = "margin-left: 1ch; flex-grow: 1";
  dropMenu.setAttribute("id", "dropselect");
  const disabledOpt = document.createElement("option");
  disabledOpt.innerText = switchSettings.savedCharacterDefault;
  disabledOpt.setAttribute("value", "");
  dropMenu.appendChild(disabledOpt);

  dropMenu.addEventListener("change", (e) => {
    setTextValsFromSelect();
  });

  if (switchSettings.allowUserChars && switchSettings.customFieldVariable) {
    const yourCharHeader = document.createElement("option");
    yourCharHeader.innerText = "Select from Your Characters";
    yourCharHeader.setAttribute("disabled", true);
    dropMenu.appendChild(yourCharHeader);
    makeAppendOption(switchSettings.customFieldVariable);
  }

  if (switchSettings.npcChars && npcs.length > 0) {
    const npcHeader = document.createElement("option");
    npcHeader.innerText = "Select from global NPCS";
    npcHeader.setAttribute("disabled", true);

    dropMenu.appendChild(npcHeader);
    makeAppendOption(npcs);
  }

  dropWrap.append(dropMenu);
  inputWrapper.append(dropWrap);

  // CREATE & APPEND INPUT BOXES
  for (const input of inputData) {
    const inputElement = makeInputBox(input);
    inputWrapper.appendChild(inputElement);
  }

  // CREATE BUTTON TO CLEAR INPUTS

  const clearButtonWrap = document.createElement("td");
  clearButtonWrap.classList.add("pformright");
  clearButtonWrap.style.cssText =
    "display: flex; flex-wrap: wrap; align-items: center; justify-content: center; padding: 10px;";
  clearButtonWrap.setAttribute("colspan", "2");
  const clearButton = document.createElement("button");
  clearButton.innerText = "Clear Selections";
  clearButton.classList.add("forminput");
  clearButton.addEventListener("click", (e) => {
    e.preventDefault();
    clearAll();
  });
  clearButtonWrap.appendChild(clearButton);

  // APPEND INNER ELEMENTS TO OUTER
  outerWrapper.appendChild(inputHeader);
  outerWrapper.appendChild(inputWrapper);
  outerWrapper.appendChild(clearButtonWrap);

  return outerWrapper;
};

const setElementsForPostScreen = () => {
  // FIND THE SUBMIT BUTTON AND SEE WHAT HAPPENS
  const submitButton = document.querySelector('[name="submit"]');

  // GET THE ELEMENTS WE NEED
  const postBox = document.getElementsByTagName("textarea")[0];
  const postText = postBox.value;

  const setInfoElement = placeInPostBox();
  const destinationDiv = document.getElementById("enter-your-post");
  destinationDiv.after(setInfoElement);

  const inputs = document.querySelectorAll(".manualInput");

  submitButton.addEventListener("click", (e) => {
    //e.preventDefault();
    setInfo(postBox, inputs);
  });

  if (inputCode === "08") {
    bindBackForEdit(postText, postBox);
  }
};

export { makeInputBox, placeInPostBox, setElementsForPostScreen };
