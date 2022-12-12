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
      inputCode === "00" ||
      inputCode === "02" ||
      inputCode === "08" ||
      inputCode === "03"
    ) {
      setElementsForPostScreen();
    }
    if (inputCode === "02" || inputCode === "08" || inputCode === "03") {
      postReviewSwitch();
    }
  }
};

export { runWrapperSwitch };
