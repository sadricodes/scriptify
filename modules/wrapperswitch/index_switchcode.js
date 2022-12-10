import { setElementsForPostScreen } from "./post_screen_modify.js";
import { checkPerms } from "../../global_scripts/permissions.js";

const runWrapperSwitch = () => {
  console.log("code is functioning");
  const accessAllowed = checkPerms(switchSettings);

  console.log(accessAllowed);

  // CHECK AND APPLY BOXES TO POST BOX IF APPLICABLE
  if (accessAllowed) {
    if (inputCode === "00" || inputCode === "02" || inputCode === "08") {
      setElementsForPostScreen();
    }
  }
};

export { runWrapperSwitch };
