// MAKE CHARACTER CODE FOR WRAPPER SWITCH
const makeCode = () => {
  const destination = document.getElementById("generatedCode");
  const switchData = sMSet.switchSettings.systemData.memberData;
  const settingsCode = JSON.stringify(switchData, null, " ");

  destination.value = settingsCode;
};

export { makeCode };
