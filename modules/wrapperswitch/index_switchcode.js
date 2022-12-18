import {
  setElementsForPostScreen,
  postReviewSwitch,
} from "./post_screen_modify.js";
import { checkPerms } from "../../global_scripts/permissions.js";

const runWrapperSwitch = () => {
  const accessAllowed = checkPerms(sMSet.switchSettings.permissions);

  // CHECK AND APPLY BOXES TO POST BOX IF APPLICABLE
  if (accessAllowed) {
    if (
      sMSet.systemData.inputCode === "00" ||
      sMSet.systemData.inputCode === "02" ||
      sMSet.systemData.inputCode === "08" ||
      sMSet.systemData.inputCode === "03"
    ) {
      setElementsForPostScreen();
    }
    if (
      sMSet.systemData.inputCode === "02" ||
      sMSet.systemData.inputCode === "08" ||
      sMSet.systemData.inputCode === "03"
    ) {
      postReviewSwitch();
    }
  }
};

export { runWrapperSwitch };
