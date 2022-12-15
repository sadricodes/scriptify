import { removeGroupItem, getTextValue } from "./ws_cf_baseSettings.js";
import {
  removeNpcItem,
  addNewNpc,
  addNpcItem,
  getNpcValues,
  deleteNpc,
} from "./ws_cf_npcs.js";
import { makeDropdownItems } from "../../../global_scripts/global_helpers.js";
import { switchValues, setInputChanges } from "./ws_cf_inputs.js";
import {
  validateGeneralPermissions,
  validateNpcFields,
  validateInputFields,
} from "./ws_cf_validations.js";

// MAKE BOX FOR GROUP PERMISSIONS
const makeGroupBox = (value, source) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("groupBox");
  wrapper.innerText = value;
  wrapper.addEventListener("click", (e) => {
    if (source === "system") {
      removeGroupItem(e);
    }
    if (source == "npcPerms") {
      removeNpcItem(e);
    }
  });
  return wrapper;
};

// MAKE EXCLUSION BOXES FOR NPC PERMISSIONS
const makeExclusionBoxes = (property, titleYes, titleNo, npc) => {
  const exWrapper = document.createElement("div");
  exWrapper.classList.add("permPermissive", "settingSectionLine", "itemEx");
  const exHeader1 = document.createElement("div");
  exHeader1.innerText = titleYes;
  exHeader1.classList.add("settingSectionHeader", "permissionTrue");
  exWrapper.appendChild(exHeader1);
  const exHeader2 = document.createElement("div");
  exHeader2.innerText = titleNo;
  exHeader2.classList.add("settingSectionHeader", "permissionFalse");
  exWrapper.appendChild(exHeader2);

  const exBoxList = document.createElement("div");
  exBoxList.setAttribute("switch-data-npc", npc.shortcode);
  exBoxList.setAttribute("switch-data-extype", property);
  exBoxList.classList.add("groupBoxWrapper");

  for (const item of npc[property]) {
    const box = makeGroupBox(item, "npcPerms");
    exBoxList.appendChild(box);
  }

  const exInput = document.createElement("input");
  exInput.setAttribute("id", `${npc.shortcode}-${property}`);
  const addButton = document.createElement("button");
  addButton.innerText = "Add";
  addButton.classList.add("actionButton");

  addButton.addEventListener("click", (e) =>
    addNpcItem(`${npc.shortcode}-${property}`, npc.shortcode, property)
  );

  exWrapper.appendChild(exBoxList);
  exWrapper.appendChild(exInput);
  exWrapper.appendChild(addButton);

  return exWrapper;
};

// TOGGLE FUNCTION FOR NPC ITEMS
const toggleNpc = (e) => {
  const charId =
    e.target.parentNode.parentNode.getAttribute("switch-data-npc-id");

  const char = sMSet.switchSettings.npcs.find((ch) => ch.shortcode === charId);

  const toggleState = e.target.innerText;
  char.toggleOpen = char.toggleOpen ? false : true;

  if (e.target.innerText === "Edit") {
    e.target.innerText = "Hide";
  } else if (e.target.innerText === "Hide") {
    e.target.innerText = "Edit";
  }

  const targetDivs =
    e.target.parentNode.parentNode.querySelectorAll(".npcInputBox");
  for (const div of targetDivs) {
    if (toggleState === "Edit") {
      div.classList.add("showNpcDiv");
      div.classList.remove("hideNpcDiv");
    } else if (toggleState === "Hide") {
      div.classList.remove("showNpcDiv");
      div.classList.add("hideNpcDiv");
    }
  }
};

// MAKE NPC WRAPPER ITEM
const makeNpcWrapperItem = (name, content, type, items, id) => {
  const itemWrapper = document.createElement("div");
  itemWrapper.classList.add("itemLine");
  const itemText = document.createElement("span");
  itemText.classList.add("fieldTitle");
  itemText.innerText = name;
  let itemInput;

  if (type === "text") {
    itemInput = document.createElement("input");
  } else if (type === "textarea") {
    itemInput = document.createElement("textarea");
  } else if (type === "select") {
    itemInput = document.createElement("select");

    if (id === "order") {
      const itemList = items.map((item, index) => {
        return { text: index + 1, value: index + 1 };
      });
      makeDropdownItems("-- NPC ORDER --", itemList, itemInput);
    }

    if (id === "allowAll") {
      makeDropdownItems("--SELECT PERMISSION TYPE--", items, itemInput);
      itemInput.setAttribute("targetDiv", `thisthing-${id}`);
      itemInput.addEventListener("change", (e) => {
        const target = e.target.parentNode.parentNode;
        const value = eval(e.target.value);
        const divs = target.querySelectorAll(".permPermissive, .permExclusive");
        for (const div of divs) {
          if (value) {
            div.classList.add("permPermissive");
            div.classList.remove("permExclusive");
          } else if (!value) {
            div.classList.add("permExclusive");
            div.classList.remove("permPermissive");
          }
        }
      });
    }
  }

  itemInput.setAttribute("switch-data-input", id);
  itemInput.classList.add("fullwidthinput", "npcEntryInput");
  itemInput.value = content ? content : "";

  itemWrapper.appendChild(itemText);
  itemWrapper.appendChild(itemInput);
  return itemWrapper;
};

// MAKE NPC LIST ITEM
const populateNpcs = (npc) => {
  const inputData = sMSet.switchSettings.inputData;
  const sortedInputs = inputData.sort((a, b) => a.order - b.order);
  const npcItem = document.createElement("div");
  npcItem.classList.add("settingSectionLine", "sectionNpcEntry");
  npcItem.setAttribute("switch-data-npc-id", npc.shortcode);
  const npcHeader = document.createElement("div");
  npcHeader.classList.add("settingSectionHeader");
  const toggleButton = document.createElement("button");
  toggleButton.classList.add("actionButton");
  toggleButton.innerText = npc.toggleOpen ? "Hide" : "Edit";
  toggleButton.addEventListener("click", (e) => toggleNpc(e));
  npcHeader.innerText = npc.name;
  npcHeader.appendChild(toggleButton);
  npcItem.appendChild(npcHeader);
  const npcBottom = document.createElement("div");
  const npcDelete = document.createElement("button");
  npcDelete.innerText = `Delete ${npc.name}`;
  npcDelete.classList.add("warningButton");
  npcDelete.addEventListener("click", deleteNpc);
  const npcDesc = document.createElement("span");
  npcDesc.innerText = npc.desc;
  npcDesc.classList.add("npcDescription");
  npcBottom.appendChild(npcDesc);
  npcBottom.appendChild(npcDelete);
  npcBottom.classList.add("outputs");

  const npcDetails = document.createElement("div");
  npc.toggleOpen
    ? npcDetails.classList.add("npcInputBox", "showNpcDiv")
    : npcDetails.classList.add("npcInputBox", "hideNpcDiv");

  for (const item in sortedInputs) {
    const code = sortedInputs[item].code;
    const itemWrapper = makeNpcWrapperItem(
      sortedInputs[item].name,
      npc[code],
      "text",
      "",
      sortedInputs[item].id
    );
    npcDetails.appendChild(itemWrapper);
  }

  const npcPermissions = document.createElement("div");
  npc.toggleOpen
    ? npcPermissions.classList.add("npcInputBox", "showNpcDiv")
    : npcPermissions.classList.add("npcInputBox", "hideNpcDiv");
  const exBoxesWrap = document.createElement("div");
  exBoxesWrap.classList.add("exBoxWrap");
  for (const property in npc) {
    if (inputData.find((item) => item.code === property)) {
      continue;
    } else {
      if (property === "desc") {
        const itemWrapper = makeNpcWrapperItem(
          property,
          npc[property],
          "textarea",
          "",
          property
        );
        npcDetails.appendChild(itemWrapper);
      } else if (property === "shortcode") {
        const itemWrapper = makeNpcWrapperItem(
          property,
          npc[property],
          "text",
          "",
          property
        );
        npcDetails.appendChild(itemWrapper);
      } else if (property === "order") {
        const itemWrapper = makeNpcWrapperItem(
          property,
          npc[property],
          "select",
          sMSet.switchSettings.npcs,
          property
        );
        npcDetails.appendChild(itemWrapper);
      } else if (property === "allowAll") {
        const appendMe = makeNpcWrapperItem(
          "Permission Type",
          npc[property],
          "select",
          [
            { value: true, text: "Allow All Members" },
            { value: false, text: "Exclude All Members" },
          ],
          property
        );

        npcPermissions.appendChild(appendMe);
      } else if (property === "exceptGroups") {
        const exBox = makeExclusionBoxes(
          property,
          "Groups CAN Use",
          "Groups CAN NOT Use",
          npc
        );
        exBoxesWrap.appendChild(exBox);
      } else if (property === "exceptMembers") {
        const exBox = makeExclusionBoxes(
          property,
          "Members CAN Use",
          "Members CAN NOT Use",
          npc
        );
        exBoxesWrap.appendChild(exBox);
      } else if (property === "overrideMembers") {
        const exBox = makeExclusionBoxes(
          property,
          "Members CAN NEVER Use",
          "Members CAN ALWAYS Use",
          npc
        );
        exBoxesWrap.appendChild(exBox);
      } else {
        //do nothing
      }
    }
  }
  npcPermissions.appendChild(exBoxesWrap);
  npcItem.appendChild(npcDetails);
  npcItem.appendChild(npcPermissions);
  npcItem.appendChild(npcBottom);

  return npcItem;
};

// BUILD LIST OF NPCS
const buildNpcs = () => {
  if (
    sMSet.switchSettings.npcs.length > 0 &&
    sMSet.switchSettings.inputData.length > 0
  ) {
    const npcDestination = document.getElementById("npcEntries");
    npcDestination.innerHTML = "";
    const npcBox = document.createElement("div");
    const sortedNpcs = sMSet.switchSettings.npcs.sort(
      (a, b) => a.order - b.order
    );
    for (const npc in sortedNpcs) {
      const npcBlock = populateNpcs(sortedNpcs[npc]);
      npcBox.appendChild(npcBlock);
    }
    const containingDiv = document.createElement("div");
    containingDiv.classList.add("buttonrow");
    const newNpcButton = document.createElement("button");
    newNpcButton.classList.add("actionButton");
    newNpcButton.innerText = "Add New NPC";
    newNpcButton.addEventListener("click", () =>
      addNewNpc(sMSet.switchSettings.npcs)
    );
    containingDiv.appendChild(newNpcButton);

    npcDestination.appendChild(npcBox);
    npcDestination.appendChild(containingDiv);
  }
};

// TOGGLE INPUT LIST ITEM DISPLAY
const toggleElement = () => {
  const event = window.event;
  const targetDiv = event.target.getAttribute("targetDiv");
  const allDivs = document.querySelectorAll("#inputEntryBox .inputBox");

  for (const div of allDivs) {
    if (div.getAttribute("id") === targetDiv) {
      event.target.innerText === "Hide"
        ? ((event.target.innerText = "Show"),
          div.classList.add("hideSection"),
          div.classList.remove("showSection"))
        : ((event.target.innerText = "Hide"),
          div.classList.remove("hideSection"),
          div.classList.add("showSection"));
    }
  }
};

// MAKE INPUT DATA BOXES
const makeInputDataBoxes = (entry) => {
  const inputData = sMSet.switchSettings.inputData;
  const inputWrapper = document.createElement("div");
  const inputWrapperHeader = document.createElement("div");
  inputWrapperHeader.classList.add("settingSectionHeader");
  inputWrapperHeader.innerText = `${inputData[entry].name}`;
  const toggleButton = document.createElement("button");
  toggleButton.classList.add("actionButton");
  toggleButton.innerText = "Show";
  toggleButton.addEventListener("click", toggleElement);
  toggleButton.setAttribute("targetDiv", inputData[entry].id);
  inputWrapperHeader.appendChild(toggleButton);
  inputWrapper.appendChild(inputWrapperHeader);
  inputWrapper.classList.add("settingSectionLine");
  const nameBox = document.createElement("div");
  nameBox.classList.add("inputBox", "hideSection");
  nameBox.setAttribute("id", inputData[entry].id);
  let input;
  for (const item in inputData[entry]) {
    if (item === "type") {
      input = document.createElement("select");
      const defaultOpt = document.createElement("option");
      defaultOpt.innerText = "-- SELECT A TYPE --";
      defaultOpt.setAttribute("value", "");
      input.appendChild(defaultOpt);

      for (const option in sMSet.switchSettings.settings.typeOptions) {
        const makeOption = document.createElement("option");
        makeOption.innerText =
          sMSet.switchSettings.settings.typeOptions[option];
        makeOption.setAttribute(
          "value",
          sMSet.switchSettings.settings.typeOptions[option]
        );
        input.appendChild(makeOption);
      }
    } else if (item === "order") {
      input = document.createElement("select");
      for (var i = 1; i < inputData.length + 1; i++) {
        const makeOption = document.createElement("option");
        makeOption.setAttribute("value", i);
        makeOption.innerText = i;
        input.appendChild(makeOption);
      }
    } else if (item === "required") {
      input = document.createElement("select");
      makeDropdownItems(
        "-- SELECT REQUIRED STATUS --",
        [
          {
            value: true,
            text: "True",
          },
          { value: false, text: "False" },
        ],
        input
      );
    } else {
      input = document.createElement("input");
    }

    if (item === "code" || item === "id") {
      input.addEventListener("blur", (e) => switchValues(e, item));
    }

    input.classList.add("fullwidthinput");
    const itemWrap = document.createElement("div");
    itemWrap.classList.add("itemLine");
    const text = document.createElement("span");
    text.classList.add("fieldTitle");
    text.innerText = `Field ${item}`;
    input.setAttribute("name", item);
    input.value = inputData[entry][item];
    itemWrap.appendChild(text);
    itemWrap.appendChild(input);

    nameBox.appendChild(itemWrap);
  }

  const bottomLine = document.createElement("div");
  bottomLine.classList.add("outputs");
  const switchCode = document.createElement("pre");
  switchCode.innerText = `switch-data-item="${inputData[entry].id}"`;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("warningButton");
  deleteButton.setAttribute(
    "onclick",
    `removeInputItem("${inputData[entry].id}", "${inputData[entry].name}")`
  );
  deleteButton.innerText = `Delete ${inputData[entry].name}`;

  bottomLine.appendChild(switchCode);
  bottomLine.appendChild(deleteButton);

  inputWrapper.appendChild(nameBox);
  inputWrapper.appendChild(bottomLine);

  return inputWrapper;
};

const setFieldValues = (entry, source) => {
  const target = document.getElementById(entry);
  const data = sMSet.switchSettings[source][entry];

  if (target) {
    if (target.nodeName === "DIV") {
      if (Array.isArray(data)) {
        if (data.length > 0) {
          target.innerHTML = "";
        }
        if (data.length === 0) {
          target.innerHTML = "There's nothing added here yet";
        }
        for (const item of data) {
          if (
            entry === "groupsCanUse" ||
            entry === "groupsCanNotUse" ||
            entry === "memberCanUse" ||
            entry === "memberCanNotUse"
          ) {
            const box = makeGroupBox(item, "system");
            target.appendChild(box);
          }
        }
      }
    }

    if (target.nodeName === "INPUT") {
      target.value = data;

      if (target.type === "checkbox") {
        target.checked = data;
      }
    }
  }
};

// CHECK IF DATA EXISTS AND DISPLAY IT
const checkIfThereIsData = () => {
  // SEE IF THE SWITCH SYSTEM IS ENABLED
  const menuDiv = document.querySelector('[data-module-name="switch"]');
  if (sMSet.switchSettings.currentlyEnabled) {
    menuDiv.classList.remove("hideSection");
    if (sMSet.switchSettings.settings) {
      for (const entry in sMSet.switchSettings) {
        for (const section in sMSet.switchSettings[entry]) {
          setFieldValues(section, entry);
        }
      }
    } else {
      alert("Switch Settings has not been defined");
    }

    if (sMSet.switchSettings.inputData) {
      const inputData = sMSet.switchSettings.inputData;
      const wrapper = document.createElement("div");
      const destination = document.getElementById("inputEntryBox");
      destination.innerHTML = "";

      const sortedInputs = inputData.sort((a, b) => a.order - b.order);

      for (const entry in sortedInputs) {
        const box = makeInputDataBoxes(entry);
        wrapper.appendChild(box);
      }
      const buttonRow = document.createElement("div");
      buttonRow.classList.add("buttonrow");
      const addNew = document.createElement("button");
      addNew.setAttribute("onclick", "addNewInput()");
      addNew.innerText = "Add New Input";
      addNew.classList.add("actionButton");
      buttonRow.appendChild(addNew);
      wrapper.appendChild(buttonRow);
      destination.appendChild(wrapper);
    } else {
      alert("Input data has not been defined");
    }

    buildNpcs();
  } else {
    // SOMETHING IF SWITCH NOT ENABLED HERE
    menuDiv.classList.add("hideSection");
  }
};

const validateSwitchOnChange = (origin) => {
  // CONDITIONALLY RESET DATA IF REQUIRED
  if (origin === "inputData") {
    const goOn = validateInputFields();
    if (goOn) {
      setInputChanges();
      checkIfThereIsData();
      return true;
    } else {
      return false;
    }
  } else if (origin === "basicSettings") {
    const proceed = validateGeneralPermissions(sMSet.switchSettings);
    if (proceed) {
      getTextValue();
      checkIfThereIsData();
      return true;
    } else {
      return false;
    }
  } else if (origin === "languageData") {
    getTextValue();
    checkIfThereIsData();
    return true;
  } else if (origin === "npcCharsSetUp") {
    getNpcValues();
    const proceed = validateNpcFields(inputData, sMSet.switchSettings.npcs);
    if (proceed) {
      checkIfThereIsData();
      return true;
    } else {
      return false;
    }
  } else if (origin === "codeResult") {
    const textBox = document.getElementById("generatedCode");
    textBox.value = "";
  }
};

// LOAD REQUESTED TAB
const loadSection = () => {
  const event = window.event;
  const section = event.target.getAttribute("originTab");
  const allButtons = document.querySelectorAll(
    ".moduleSettingMenu .actionButton"
  );
  const allSections = document.querySelectorAll("section.settingPanel");
  const origin = document
    .querySelectorAll(".activeTab")[0]
    .getAttribute("originTab");
  const moduleName = document
    .querySelectorAll(".activeTab")[0]
    .parentNode.getAttribute("data-module-name");
  const moduleTo = event.target.parentNode.getAttribute("data-module-name");

  let proceed = true;

  if (moduleName === "switch") {
    proceed = validateSwitchOnChange(origin);
  }

  if (proceed) {
    // SET ACTIVE TAB COLOUR
    for (const button of allButtons) {
      button.classList.remove("activeTab");
    }
    event.target.classList.add("activeTab");

    // SET HIDE AND SHOW SECTIONS
    for (const sectionItem of allSections) {
      if (sectionItem.getAttribute("id") === section) {
        sectionItem.classList.remove("hideSection");
        sectionItem.classList.add("showSection");
      } else {
        sectionItem.classList.remove("showSection");
        sectionItem.classList.add("hideSection");
      }
      if (
        sectionItem.parentNode.getAttribute("data-module-name") === moduleTo
      ) {
        sectionItem.parentNode.classList.add("showSection");
        sectionItem.parentNode.classList.remove("hideSection");
      } else {
        sectionItem.parentNode.classList.remove("showSection");
        sectionItem.parentNode.classList.add("hideSection");
      }
    }
  }
};

export {
  makeGroupBox,
  buildNpcs,
  makeInputDataBoxes,
  setFieldValues,
  checkIfThereIsData,
  loadSection,
};
