import {
  checkIfThereIsData,
  loadSection,
} from "./wrapperswitch_config/ws_cf_buildPage.js";

import {
  setSetting,
  addToList,
} from "./wrapperswitch_config/ws_cf_baseSettings.js";

import { copyCode, writeCode } from "./global_admin_scripts/global_admin.js";

import {
  removeInputItem,
  addNewInput,
} from "./wrapperswitch_config/ws_cf_inputs.js";

window.loadSection = loadSection;
window.writeCode = writeCode;
window.addNewInput = addNewInput;
window.setSetting = setSetting;
window.addToList = addToList;
window.removeInputItem = removeInputItem;
window.copyCode = copyCode;
window.writeCode = writeCode;
window.addNewInput = addNewInput;

// LOAD INFORMATION
document.onload = checkIfThereIsData();
