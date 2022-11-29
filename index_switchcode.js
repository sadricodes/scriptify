import { switchSettings, testData, inputData } from "./globals_switchcode.js";
import { getPosts } from "./post_view_functions.js";
import { placeInPostBox } from "./post_screen_modify.js";
import { setInfo, bindBackForEdit } from "./post_screen_functions.js";
import { doSwitch } from "./post_view_functions.js";

// SET SOME GLOBALS

console.log(inputCode);

// CHECK AND APPLY BOXES TO POST BOX IF APPLICABLE
if (inputCode === "00" || inputCode === "02" || inputCode === "08") {
  // FIND THE SUBMIT BUTTON AND SEE WHAT HAPPENS
  const submitButton = document.querySelector('[name="submit"]');

  // GET THE ELEMENTS WE NEED
  const postBox = document.getElementsByTagName("textarea")[0];
  const postText = postBox.value;

  const setInfoElement = placeInPostBox();
  const destinationDiv = document.getElementById("enter-your-post");
  destinationDiv.after(setInfoElement);

  const inputs = document.querySelectorAll(".manualInput");

  submitButton.addEventListener("click", (e) => {
    //e.preventDefault();
    setInfo(postBox, inputs);
  });

  if (inputCode === "08") {
    bindBackForEdit(postText, postBox);

    console.log(inputs, postText);
  }
}

// CHECK IF WE ARE ON A TOPIC VIEW
if (getPosts().length > 0) {
  console.log("there are posts on this page!");
  doSwitch(switchSettings, inputData, testData);
}
