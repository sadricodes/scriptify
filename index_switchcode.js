console.log("are we loading?");

import { getPosts } from "./post_view_functions.js";

// SET SOME GLOBALS

console.log(inputCode);

const testData = [
  {
    name: "Merlwyb",
    avatar: "https://img.nickpic.host/FLUPF5.png",
    shortcode: "ade",
  },
  {
    name: "Gold Mario",
    avatar: "https://img.nickpic.host/atc3Xf.png",
    shortcode: "abd",
  },
  {
    name: "Lord Hien",
    avatar: "https://img.nickpic.host/FLUz1n.png",
    shortcode: "hie",
  },
];

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

const switchSettings = {
  sectionTitle: "Set Character Information",
  saveCharacterText: "Select A Saved Character",
  savedCharacterDefault: "-- SELECT A CHARACTER --",
  showSavedDrop: true,
  showInputEntry: true,
};

// BIND DATA BACK TO FORM FIELDS IF WE'RE EDITING
const bindBackForEdit = () => {
  const inputs = document.querySelectorAll(".clearableInput");
};

// CREATE REPLACE STRING CODES
const makeReplaceString = (key, value) => {
  return `${key}-${value}-${key}`;
};

const setInfo = (postBox, inputs) => {
  const dropVal = document.getElementById("dropselect").value;
  let itemString = "";
  const postText = postBox.value;

  // USE INPUTS IF NO SELECTION IN DROPDOWN
  if (!dropVal) {
    for (const input of inputs) {
      item = input.value;
      code = input.getAttribute("switch-data-code");
      string = makeReplaceString(item, code);
      itemString += string;
    }
  }

  // USE SELECT BOX IF THERE IS A SELECTION
  if (dropVal) {
    char = testData.filter((char) => char.shortcode == dropVal)[0];
    for (const [key, value] of Object.entries(char)) {
      string = makeReplaceString(key, value);
      itemString += string;
    }
    console.log(Object.entries(char));
  }

  const replaceString = `${postText} \n[doHTML]<div class="codeHide" switch-data-box="switchItems">${itemString}</div>[/doHTML]`;
  postBox.value = replaceString;
};

// MAKE BOXES FOR INPUTS
const makeInputBox = (input, menu) => {
  const wrapper = document.createElement("div");
  wrapper.style.cssText =
    "padding: 10px; flex-basis: 100%; display: flex; align-items: center;";

  if (!switchSettings.showInputEntry) {
    wrapper.style.cssText = "display: none;";
  }

  const title = document.createElement("span");
  title.innerText = input.name;

  const inputEl = document.createElement("input");
  inputEl.classList.add("forminput", "clearableInput");
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("id", input.id);
  inputEl.setAttribute("switch-data-code", input.code);
  inputEl.style.cssText = "margin-left: 1ch; flex-grow: 1;";
  inputEl.addEventListener("keypress", (e) => {
    menu.value = "";
  });

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

  // CREATE & APPEND DROPDOWN
  const dropWrap = document.createElement("div");
  dropWrap.style.cssText = "padding: 10px; flex-basis: 100%;";
  if (!switchSettings.showSavedDrop) {
    dropWrap.style.cssText = "display: none;";
  }
  const dropText = document.createElement("span");
  dropText.innerText = switchSettings.saveCharacterText;
  dropWrap.append(dropText);
  const dropMenu = document.createElement("select");
  dropMenu.classList.add("forminput");
  dropMenu.style.cssText = "margin-left: 1ch; flex-grow: 1";
  dropMenu.setAttribute("id", "dropselect");
  const disabledOpt = document.createElement("option");
  disabledOpt.innerText = switchSettings.savedCharacterDefault;
  disabledOpt.setAttribute("value", "");
  dropMenu.appendChild(disabledOpt);

  dropMenu.addEventListener("change", (e) => {
    const clearable = document.querySelectorAll(".clearableInput");
    for (const item of clearable) {
      item.value = "";
    }
  });

  for (var i = 0; i < testData.length; i++) {
    const optionTag = document.createElement("option");
    optionTag.setAttribute("value", testData[i].shortcode);
    optionTag.innerText = testData[i].name;

    dropMenu.appendChild(optionTag);
  }

  dropWrap.append(dropMenu);
  inputWrapper.append(dropWrap);

  // CREATE & APPEND INPUT BOXES
  for (const input of inputData) {
    const inputElement = makeInputBox(input, dropMenu);
    inputWrapper.appendChild(inputElement);
  }

  // APPEND INNER ELEMENTS TO OUTER
  outerWrapper.appendChild(inputHeader);
  outerWrapper.appendChild(inputWrapper);

  return outerWrapper;
};

// CHECK AND APPLY BOXES TO POST BOX IF APPLICABLE
if (inputCode === "00" || inputCode === "02" || inputCode === "08") {
  // FIND THE SUBMIT BUTTON AND SEE WHAT HAPPENS
  const submitButton = document.querySelector('[name="submit"]');

  // GET THE ELEMENTS WE NEED
  const postBox = document.getElementsByTagName("textarea")[0];
  const postText = postBox.value;

  const setInfoElement = placeInPostBox(postBox, postText);
  const destinationDiv = document.getElementById("enter-your-post");
  destinationDiv.after(setInfoElement);

  const inputs = document.querySelectorAll(".clearableInput");

  submitButton.addEventListener("click", (e) => {
    setInfo(postBox, inputs);
  });

  if (inputCode === "08") {
    bindBackForEdit(inputs, postText);

    console.log(inputs, postText);
  }
}

// CHECK IF WE ARE ON A TOPIC VIEW
if (getPosts().length > 0) {
  console.log("there are posts on this page!");
}

// GET SWITCH ITEMS
const getSwitchItemsText = (container) => {
  const switchItems = container.querySelector(
    '[switch-data-box="switchItems"]'
  );
  if (switchItems) {
    return switchItems.innerText;
  } else {
    return;
  }
};

// FIND ALL POST ITEMS
const postList = getPosts();
console.log("the list", postList);

// SPLIT SWITCH ITEMS OUT
const splitItems = (items, postId) => {
  if (items) {
    const postItems = {
      post: postId,
      itemList: [],
    };

    for (const input of inputData) {
      const startMarker = `${input.code}-`;
      const endMarker = `-${input.code}`;

      const start = items.indexOf(startMarker);
      const end = items.lastIndexOf(endMarker);
      const item = items.slice(start + startMarker.length, end);
      if (start > -1 && end > -1) {
        const itemObject = {
          name: input.code,
          item: item,
          type: input.type,
        };

        postItems.itemList.push(itemObject);
      }
    }
    return postItems;
  } else {
    return;
  }
};

// GET POST CONTENT AND SWITCH ITEMS FROM
for (const post of postList.entries()) {
  const postDiv = post[1].querySelector('[switch-data-item="postText"]');
  const postId = post[1].getAttribute("id");
  const switchItems = getSwitchItemsText(postDiv);
  const itemsArray = splitItems(switchItems, postId);
  console.log(itemsArray);

  if (itemsArray) {
    itemsArray.itemList.map((item) => {
      console.log(item);

      const el = post[1].querySelectorAll(`[switch-data-item="${item.name}"]`);
      console.log(el);
      for (const element of el) {
        if (item.type === "text") {
          element.innerText = item.item;
        } else if (item.type === "image") {
          element.setAttribute("src", item.item);
        }
      }
    });
  }
}
