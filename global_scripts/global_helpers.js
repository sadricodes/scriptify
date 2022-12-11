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

export { makeDropdownItems };
