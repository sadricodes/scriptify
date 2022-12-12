// SET FUNCTIONS FOR USE IN MULTIPLE SCREENS

// GET START MARKER
const getItem = (startMarker, endMarker, string, input) => {
  const start = string.indexOf(startMarker);
  const end = string.indexOf(endMarker, start);
  const item = string.slice(start + startMarker.length, end);

  if (start > -1 && end > -1) {
    const itemObject = {
      name: input.code,
      item: item,
      type: input.type,
    };
    return itemObject;
  } else {
    return;
  }
};

// SPLIT SWITCH ITEMS OUT
const splitItems = (items) => {
  if (items) {
    const postItems = {
      itemList: [],
    };

    for (const input of sMSet.switchSettings.inputData) {
      const startMarker = `${input.code}-`;
      const endMarker = `-${input.code}`;

      const item = getItem(startMarker, endMarker, items, input);

      postItems.itemList.push(item);
    }
    return postItems;
  } else {
    return;
  }
};

export { splitItems, getItem };
