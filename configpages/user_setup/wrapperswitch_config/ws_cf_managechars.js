const validateCharacters = () => {
  console.log("validating bby");
};

const saveCharacters = () => {
  const charList = [];

  const chars = document.querySelectorAll(".characterEntry");
  for (const char of chars) {
    const charrie = sMSet.switchSettings.systemData.memberData.filter(
      (item) => item.shortcode === char.getAttribute("switch-data-character-id")
    )[0];
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

export { saveCharacters, validateCharacters };
