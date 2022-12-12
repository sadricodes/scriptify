// MAKE INPUTS FOR USER CHARACTER LIST
const makeCharInputs = (input, char) => {
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("itemLine");
  const inputTitle = document.createElement("span");
  inputTitle.classList.add("fieldtitle");
  inputTitle.innerText = input.name;
  inputWrapper.appendChild(inputTitle);
  let inputBox;
  if (input.id === "order") {
    inputBox = document.createElement("select");
    for (
      let i = 0;
      i < sMSet.switchSettings.systemData.memberData.length;
      i++
    ) {
      const newOption = document.createElement("option");
      newOption.innerText = i + 1;
      newOption.value = i + 1;
      inputBox.appendChild(newOption);
    }
  } else {
    inputBox = document.createElement("input");
  }
  inputBox.classList.add("fullwidthinput", "charInput");
  inputBox.setAttribute("switch-data-input", input.id);
  inputBox.value = char[input.code];
  inputWrapper.appendChild(inputBox);
  return inputWrapper;
};

// MAKE CHARACTER WRAPPER FOR CHARACTER LIST
const makeCharItem = (char) => {
  const defaultItems = [
    { id: "shortcode", code: "shortcode", name: "shortcode" },
    { id: "order", code: "order", name: "order" },
    { id: "type", code: "type", name: "character type" },
  ];

  const charDiv = document.createElement("div");
  charDiv.setAttribute("switch-data-character-id", char.shortcode);
  charDiv.classList.add("characterEntry");
  const charHeader = document.createElement("div");
  charHeader.classList.add("settingSectionHeader");
  charHeader.innerText = char.name;
  charDiv.appendChild(charHeader);
  const inputsSection = document.createElement("div");
  inputsSection.classList.add("npcInputBox", "showNpcDiv");
  for (const input of sMSet.switchSettings.inputData) {
    const entry = makeCharInputs(input, char);
    inputsSection.appendChild(entry);
  }

  for (const item of defaultItems) {
    if (item.id === "type") {
    } else {
      const entry = makeCharInputs(item, char);
      inputsSection.appendChild(entry);
    }
  }
  charDiv.appendChild(inputsSection);
  return charDiv;
};

// GET ALL USER CHARACTERS AND APPEND TO DESTINATION
const getCharacters = () => {
  const memberChars = sMSet.switchSettings.systemData.memberData.sort(
    (a, b) => a.order - b.order
  );
  const destination = document.getElementById("userCharList");
  destination.innerHTML = "";

  for (const char of memberChars) {
    const item = makeCharItem(char);
    destination.appendChild(item);
  }
};

export { getCharacters };
