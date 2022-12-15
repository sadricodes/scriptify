import { makeCode } from "../wrapperswitch_config/ws_cf_makecode.js";
import {
  newChar,
  saveCharacters,
  validateCharacters,
} from "../wrapperswitch_config/ws_cf_managechars.js";
import { getCharacters } from "../wrapperswitch_config/ws_cf_viewcharacters.js";

const loadSection = () => {
  const pageTo = window.event.target.getAttribute("originTab");
  const moduleTo = event.target.parentNode.getAttribute("data-module-name");

  const sections = document.querySelectorAll(
    "#userConfig section.settingPanel"
  );
  const allButtons = document.querySelectorAll(
    "#userConfig .adminMenuWrap button"
  );

  const pageFrom = document
    .querySelector(".activeTab")
    .getAttribute("originTab");

  if (pageFrom === "userCharacters") {
    // save user character info
    saveCharacters();
    // run user character validations
    if (!validateCharacters()) {
      return;
    }
    console.log("moving from chars");
  }

  for (const button of allButtons) {
    button.classList.remove("activeTab");
  }

  window.event.target.classList.add("activeTab");

  // VALIDATE DEPENDING ON WHERE WE'VE COME FROM

  // SET HIDE AND SHOW SECTIONS
  for (const sectionItem of sections) {
    if (sectionItem.getAttribute("id") === pageTo) {
      sectionItem.classList.remove("hideSection");
      sectionItem.classList.add("showSection");
    } else {
      sectionItem.classList.remove("showSection");
      sectionItem.classList.add("hideSection");
    }
    if (sectionItem.parentNode.getAttribute("data-module-name") === moduleTo) {
      sectionItem.parentNode.classList.add("showSection");
      sectionItem.parentNode.classList.remove("hideSection");
    } else {
      sectionItem.parentNode.classList.remove("showSection");
      sectionItem.parentNode.classList.add("hideSection");
    }
  }

  getCharacters();
};

window.loadSection = loadSection;
window.makeCode = makeCode;
window.newChar = newChar;
