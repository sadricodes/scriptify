// MAKE DROPDOWN ITEMS HELPER FUNCTION
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

const checkUniqueCodes = (item, array, code) => {
  const foundItems = array.filter((char) => item == char[code]);
  if (foundItems.length > 1) {
    return { proceed: false, text: `${item} is being used more than once` };
  } else {
    return { proceed: true };
  }
};

const saveUserData = (module, data) => {
  const existingData = JSON.parse(localStorage.getItem("sMSet"));
  if (existingData !== null) {
    // Item exists in local storage
    existingData.sadriCodesModules[module] = data;
    localStorage.setItem("sMSet", JSON.stringify(existingData));
  } else {
    // item does not exist in local storage
    const newData = {
      sadriCodesModules: {
        [module]: data,
      },
    };
    localStorage.setItem("sMSet", JSON.stringify(newData));
  }
};

const getUserData = () => {
  // Get user data here
};

export {
  makeDropdownItems,
  clearWarnings,
  checkUniqueCodes,
  saveUserData,
  getUserData,
};
