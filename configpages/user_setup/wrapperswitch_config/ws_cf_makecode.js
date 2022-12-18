// CLEAR CODE
const clearCode = () => {
  const destination = document.getElementById("generatedCode");
  destination.value = "";
};

// SEE IF CODE EXISTS IN STORAGE
const getExistingDataFromStorage = () => {
  const savedData = JSON.parse(localStorage.getItem("sMSet"));
  if (savedData) {
    const switchData = savedData.sadriCodesModules.userCharacters;
    const existingButton = document.getElementById("getCharCode");

    if (switchData.length > 0 && !existingButton) {
      const buttonDestination = document.querySelector(
        "#characterCode div.buttonTabLine"
      );
      console.log(buttonDestination);
      const newButton = document.createElement("button");
      newButton.innerText = "Retrieve from Storage";
      newButton.setAttribute("id", "getCharCode");
      newButton.classList.add("actionButton");
      newButton.addEventListener("click", () => {
        const destination = document.getElementById("generatedCode");
        const switchData = sMSet.switchSettings.systemData.memberData;
        const settingsCode = JSON.stringify(switchData, null, " ");
        destination.value = settingsCode;
      });
      buttonDestination?.prepend(newButton);
    }
  }
};

// MAKE CHARACTER CODE FOR WRAPPER SWITCH
const makeCode = () => {
  const destination = document.getElementById("generatedCode");
  const switchData = sMSet.switchSettings.systemData.memberData;
  const settingsCode = JSON.stringify(switchData, null, " ");

  destination.value = settingsCode;
};

export { makeCode, getExistingDataFromStorage, clearCode };
