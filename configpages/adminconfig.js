// DEFINE SETTINGS HERE

const settingsFromSite = false;
const inputDataFromSite = false;

const switchSettings = {
  sectionTitle: "Set Character Information",
  saveCharacterText: "Select A Saved Character",
  savedCharacterDefault: "-- SELECT A CHARACTER --",
  selectYourCharsText: "Select from Your Characters",
  selectNpcCharsText: "Select from Global NPCs",
  clearSelectButton: "Clear Selections",
  showSavedDrop: true,
  showInputEntry: true,
  //   customFieldVariable: <!-- |field_114| -->,
  //   currentUser: <!-- |id| -->,
  //   currentUserGroup: <!-- |g_id| -->,
  allowUserChars: true,
  npcChars: true,
  groupsCanUse: [4],
  groupsCanNotUse: [14],
  memberCanUse: [1, 3],
  memberCanNotUse: [12, 9],
  typeOptions: ["text", "image"],
};

// DEFINE INPUT DATA HERE
let inputData = [
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
];

// DEFINE GLOBAL NPCS HERE
let npcs = [
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
  },
];

const baseSettings = switchSettings;

const removeGroupItem = (e) => {
  const item = parseInt(e.target.innerText);
  const property = e.target.parentNode.getAttribute("id");
  if (confirm(`Are you sure you want to remove ${item} from this list?`)) {
    const newArray = baseSettings[property].filter((no) => no !== item);
    baseSettings[property] = newArray;
    checkIfThereIsData();
  }
};

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

const addNpcItem = (id, npc, property) => {
  const input = document.getElementById(id);
  const value = parseInt(input.value);

  const char = npcs.filter((npcList) => npcList.shortcode === npc)[0];
  char[property].push(value);

  checkIfThereIsData();
};

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

const addToList = (valueId, propName) => {
  input = document.getElementById(valueId);
  const value = parseInt(input.value);
  if (baseSettings[propName].includes(value)) {
    // DO NOTHING
  } else {
    baseSettings[propName].push(value);
  }
  input.value = "";

  checkIfThereIsData();
};

const setFieldValues = (entry) => {
  const target = document.getElementById(entry);
  const data = baseSettings[entry];

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

const removeInputItem = (removeMe, myName) => {
  const makeSure = confirm(`Are you sure you want to remove ${myName}?`);

  if (makeSure) {
    const filteredArray = inputData.filter((item) => item.id !== removeMe);
    inputData = filteredArray;
    checkIfThereIsData();
  } else {
    return;
  }
};

const addNewInput = () => {
  reDraw();
  const newItem = {
    name: "New Field",
    id: "",
    code: "",
    type: "text",
    order: inputData.length + 1,
    required: "",
  };
  inputData.push(newItem);
  checkIfThereIsData();
};

const clearWarnings = () => {
  const allErrorBoxes = document.querySelectorAll(".warningBox");
  const allErrorDivs = document.querySelectorAll(".errorState");
  for (const box of allErrorBoxes) {
    box.innerHTML = "";
  }
  for (const div of allErrorDivs) {
    div.classList.remove("errorState");
  }
};

const validateNpcPermissions = () => {
  let proceed = true;
  for (const npc of npcs) {
    npc.overrideMembers.map((member) => {
      const clash = npc.exceptMembers.includes(member);

      if (clash) {
        proceed = false;
        const npcBox = document.querySelectorAll(
          `[switch-data-npc-id="${npc.shortcode}"]`
        )[0];
        const warning = document.createElement("div");
        warning.classList.add("warningBox");
        warning.innerText = `Member ${member} is mentioned in member permissions AND member override`;
        npcBox.appendChild(warning);
        npcBox.classList.add("errorState");
      }
    });
  }
  return proceed;
};

const setSetting = () => {
  const settingName = window.event.target.getAttribute("id");
  switchSettings[settingName] = window.event.target.checked;
};

const validateGeneralPermissions = () => {
  clearWarnings();
  const groupWrap =
    document.getElementById("groupsCanUse").parentNode.parentNode.parentNode;
  const membWrap =
    document.getElementById("memberCanUse").parentNode.parentNode.parentNode;

  let membersOk = false;
  let groupsOk = false;

  switchSettings.groupsCanUse.map((no) => {
    if (switchSettings.groupsCanNotUse.includes(no)) {
      groupsOk = false;
      groupWrap.classList.add("errorState");
      const newWarning = document.createElement("div");
      newWarning.classList.add("warningBox");
      newWarning.innerText = `Group ${no} is in both exclude and include lists`;
      groupWrap.appendChild(newWarning);
    } else {
      groupsOk = true;
    }
  });

  switchSettings.memberCanUse.map((no) => {
    if (switchSettings.memberCanNotUse.includes(no)) {
      membersOk = false;
      membWrap.classList.add("errorState");
      const newWarning = document.createElement("div");
      newWarning.classList.add("warningBox");
      newWarning.innerText = `Member ${no} is in both exclude and include lists`;
      membWrap.appendChild(newWarning);
    } else {
      membersOk = true;
    }
  });
  const proceed = groupsOk && membersOk;
  return proceed;
};

const copyCode = () => {
  const code = document.getElementById("generatedCode").value;
  const errorbox = document.getElementById("generateInfo");

  if (code.length > 0) {
    const copyContent = async () => {
      try {
        await navigator.clipboard.writeText(code);
        const info = document.createElement("span");
        info.innerText = "Successfully Copied to Clip Board!";
        info.classList.add("warningBox", "warnSuccess");
        errorbox.appendChild(info);
      } catch (err) {
        const info = document.createElement("span");
        info.innerText = "Could not copy to clipboard";
        info.classList.add("warningBox");
        errorbox.appendChild(info);
      }
    };
    copyContent();
  } else {
    // do nothing
  }
};

const validateNpcFields = () => {
  clearWarnings();
  const inputs = document.querySelectorAll(".npcEntryInput");
  const requiredFields = inputData.filter((item) => item.required === true);
  let proceed = true;
  for (const input of inputs) {
    const item = input.getAttribute("switch-data-input");
    const required = requiredFields.find((field) => field.id === item);
    if (!!required && !input.value) {
      const errorBox = document.createElement("div");
      errorBox.innerText = `This item is required`;
      errorBox.classList.add("warningBox");
      input.parentNode.appendChild(errorBox);
      input.parentNode.parentNode.parentNode.classList.add("errorState");
      proceed = false;
    }
  }
  const doThis = proceed && validateNpcPermissions();

  return doThis;
};

const validateInputFields = () => {
  clearWarnings();
  const inputFields = document.querySelectorAll(
    "#inputData input, #inputData select"
  );
  const requiredItems = ["name", "id", "code", "type", "required"];
  let proceed = true;

  for (const field of inputFields) {
    const fieldType = field.getAttribute("name");

    if (requiredItems.includes(fieldType) && !field.value) {
      const warning = document.createElement("div");
      warning.innerText = `${fieldType} is required`;
      warning.classList.add("warningBox");
      field.parentNode.appendChild(warning);
      field.parentNode.parentNode.parentNode.classList.add("errorState");
      proceed = false;
    }
  }

  return proceed;
};

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

const switchValues = (e, item) => {
  const changed = e.target.value;

  const inputElement = inputData.find(
    (input) => input.id === e.target.parentNode.parentNode.getAttribute("id")
  );

  if (inputElement) {
    if (inputElement.code === "name" && item === "code") {
      e.target.value = inputElement.code;
      return;
    }

    if (item === "id") {
      inputData.map((element) => {
        if (element.id === inputElement.id) {
          element.id = changed;
        }
      });
    }

    if (item === "code") {
      const newList = [];
      for (let npc of npcs) {
        const newChar = { ...npc, [changed]: npc[inputElement.code] };
        delete newChar[inputElement.code];
        newList.push(newChar);
      }
      npcs = newList;
    }
  }

  setInputChanges();
  buildNpcs();
};

const makeInputDataBoxes = (entry) => {
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

      for (const option in switchSettings.typeOptions) {
        const makeOption = document.createElement("option");
        makeOption.innerText = switchSettings.typeOptions[option];
        makeOption.setAttribute("value", switchSettings.typeOptions[option]);
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
  inputData = inputArray;
};

const makeDropdownItems = (defaultText, items, container) => {
  const firstOption = document.createElement("option");
  firstOption.setAttribute("value", "");
  firstOption.innerText = defaultText;
  firstOption.setAttribute("disabled", true);
  container.appendChild(firstOption);

  for (const item in items) {
    const nextOption = document.createElement("option");
    nextOption.innerText = items[item].text;
    nextOption.value = items[item].value;
    container.appendChild(nextOption);
  }
};

const makeNpcWrapperItem = (name, content, type, items, id) => {
  const itemWrapper = document.createElement("div");
  itemWrapper.classList.add("itemLine");
  const itemText = document.createElement("span");
  itemText.classList.add("fieldTitle");
  itemText.innerText = name;
  let itemInput;

  if (type === "text") {
    itemInput = document.createElement("input");
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

const toggleNpc = (e) => {
  const char =
    e.target.parentNode.parentNode.getAttribute("switch-data-npc-id");

  const toggleState = e.target.innerText;

  if (e.target.innerText === "Show") {
    e.target.innerText = "Hide";
  } else if (e.target.innerText === "Hide") {
    e.target.innerText = "Show";
  }

  const targetDivs =
    e.target.parentNode.parentNode.querySelectorAll(".npcInputBox");
  for (const div of targetDivs) {
    if (toggleState === "Show") {
      div.classList.add("showNpcDiv");
      div.classList.remove("hideNpcDiv");
    } else if (toggleState === "Hide") {
      div.classList.remove("showNpcDiv");
      div.classList.add("hideNpcDiv");
    }
  }
};

const populateNpcs = (npc) => {
  const sortedInputs = inputData.sort((a, b) => a.order - b.order);
  const npcItem = document.createElement("div");
  npcItem.classList.add("settingSectionLine", "sectionNpcEntry");
  npcItem.setAttribute("switch-data-npc-id", npc.shortcode);
  const npcHeader = document.createElement("div");
  npcHeader.classList.add("settingSectionHeader");
  const toggleButton = document.createElement("button");
  toggleButton.classList.add("actionButton");
  toggleButton.innerText = "Show";
  toggleButton.addEventListener("click", (e) => toggleNpc(e));
  npcHeader.innerText = npc.name;
  npcHeader.appendChild(toggleButton);
  npcItem.appendChild(npcHeader);

  const npcDetails = document.createElement("div");
  npcDetails.classList.add("npcInputBox", "hideNpcDiv");
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
  npcPermissions.classList.add("npcInputBox", "hideNpcDiv");
  const exBoxesWrap = document.createElement("div");
  exBoxesWrap.classList.add("exBoxWrap");
  for (const property in npc) {
    if (inputData.find((item) => item.code === property)) {
      continue;
    } else {
      if (property === "shortcode") {
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
          npcs,
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

  return npcItem;
};

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

  npcs.push(newNpc);
  checkIfThereIsData();
};

const buildNpcs = () => {
  if (npcs.length > 0 && inputData) {
    const npcDestination = document.getElementById("npcEntries");
    npcDestination.innerHTML = "";
    const npcBox = document.createElement("div");
    const sortedNpcs = npcs.sort((a, b) => a.order - b.order);
    for (const npc in sortedNpcs) {
      const npcBlock = populateNpcs(sortedNpcs[npc]);
      npcBox.appendChild(npcBlock);
    }
    const containingDiv = document.createElement("div");
    containingDiv.classList.add("buttonrow");
    const newNpcButton = document.createElement("button");
    newNpcButton.classList.add("actionButton");
    newNpcButton.innerText = "Add New NPC";
    newNpcButton.addEventListener("click", () => addNewNpc());
    containingDiv.appendChild(newNpcButton);

    npcDestination.appendChild(npcBox);
    npcDestination.appendChild(containingDiv);
  }
};

const checkIfThereIsData = () => {
  if (switchSettings) {
    for (const entry in baseSettings) {
      setFieldValues(entry);
    }
  } else {
    alert("Switch Settings has not been defined");
  }

  if (inputData) {
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
};

const getTextValue = () => {
  const inputs = document.querySelectorAll(".switchtextinput");
  for (const input of inputs) {
    const data = input.value;
    const id = input.getAttribute("id");
    switchSettings[id] = data;
  }
};

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
      const code = inputData.filter((item) => item.id === ident)[0];

      if (code) {
        npc[code.code] = value;
      }
    }
    npcList.push(npc);
  }
  npcs = npcList;
};

const reDraw = () => {
  getNpcValues();
  getTextValue();
  setInputChanges();
};

const writeCode = () => {
  // GET VALUES FROM TEXT SETTING INPUTS
  reDraw();
  // write the json code here
  const destination = document.getElementById("generatedCode");
  const settingsCode = JSON.stringify(baseSettings, null, " ");
  const inputCode = JSON.stringify(inputData, null, " ");
  const npcCode = JSON.stringify(npcs, null, " ");
  const codeWrap = document.createElement("script");
  const code = `const switchSettings = ${settingsCode} \n \n let inputData = ${inputCode} \n\n let npcs = ${npcCode}`;
  codeWrap.innerText = code;
  destination.value = code;
};

const loadSection = () => {
  const event = window.event;
  const section = event.target.getAttribute("originTab");
  const allButtons = document.querySelectorAll(".buttonTabLine .actionButton");
  const allSections = document.querySelectorAll("section");
  const origin = document
    .querySelectorAll(".activeTab")[0]
    .getAttribute("originTab");

  // CONDITIONALLY RESET DATA IF REQUIRED
  if (origin === "inputData") {
    const goOn = validateInputFields();
    if (goOn) {
      setInputChanges();
      checkIfThereIsData();
    } else {
      return;
    }
  } else if (origin === "basicSettings") {
    const proceed = validateGeneralPermissions();
    if (proceed) {
      getTextValue();
      checkIfThereIsData();
    } else {
      return;
    }
  } else if (origin === "languageData") {
    getTextValue();
    checkIfThereIsData();
  } else if (origin === "npcCharsSetUp") {
    const proceed = validateNpcFields();
    if (proceed) {
      getNpcValues();
      checkIfThereIsData();
    } else {
      return;
    }
  } else if (origin === "codeResult") {
    const textBox = document.getElementById("generatedCode");
    textBox.value = "";
  }

  // SET ACTIVE TAB COLOUR
  for (const button of allButtons) {
    button.classList.remove("activeTab");
  }
  event.target.classList.add("activeTab");

  // SET HIDE AND SHOW SECTIONS
  for (const sectionItem of allSections) {
    const ident = sectionItem.getAttribute("id");
    if (sectionItem.getAttribute("id") === section) {
      sectionItem.classList.remove("hideSection");
      sectionItem.classList.add("showSection");
    } else {
      sectionItem.classList.remove("showSection");
      sectionItem.classList.add("hideSection");
    }
  }
};

document.onload = checkIfThereIsData();
