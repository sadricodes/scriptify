import { splitItems } from "./helper_functions.js";
import { switchSettings, testData, inputData } from "./globals_switchcode.js";

// GET ALL POST ITEMS
const getPosts = () => {
  console.log("got to here");
  const postElements = document.querySelectorAll('[switch-data-item = "post"]');
  return postElements;
};

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

// GET POST CONTENT AND SWITCH ITEMS FROM
const doSwitch = () => {
  // FIND ALL POST ITEMS
  const postList = getPosts();

  for (const post of postList.entries()) {
    const postDiv = post[1].querySelector('[switch-data-item="postText"]');
    const postId = post[1].getAttribute("id");
    const switchItems = getSwitchItemsText(postDiv);
    const itemsArray = splitItems(switchItems, postId);

    if (itemsArray) {
      itemsArray.itemList.map((item) => {
        if (item != undefined) {
          if (item.item.length > 1) {
            const el = post[1].querySelectorAll(
              `[switch-data-item="${item.name}"]`
            );

            for (const element of el) {
              if (item.type === "text") {
                element.innerText = item.item;
              } else if (item.type === "image") {
                element.setAttribute("src", item.item);
              }
            }
          }
        }
      });
    }
  }
  const codeBoxes = document.querySelectorAll(".codeHide");
  for (const box of codeBoxes) {
    box.style.cssText = "display: none;";
  }
};

export { getPosts, doSwitch };
