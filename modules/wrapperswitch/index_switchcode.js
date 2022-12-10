import { getPosts } from "./post_view_functions.js";
import { setElementsForPostScreen } from "./post_screen_modify.js";
import { doSwitch } from "./post_view_functions.js";

// SET SOME GLOBALS

const testCode = () => {
  console.log(inputCode);
};

const checkPerms = () => {
  const groupCan = switchSettings.groupsCanUse.includes(
    switchSettings.currentUserGroup
  );
  const groupCanNot = switchSettings.groupsCanNotUse.includes(
    switchSettings.currentUserGroup
  );
  const memberCan = switchSettings.memberCanUse.includes(
    switchSettings.currentUser
  );
  const memberCanNot = switchSettings.memberCanNotUse.includes(
    switchSettings.currentUser
  );

  if (memberCanNot) {
    return false;
  } else if (memberCan) {
    return true;
  } else if (groupCan) {
    return true;
  } else if (groupCanNot) {
    return false;
  }
};

// CHECK AND APPLY BOXES TO POST BOX IF APPLICABLE
if (checkPerms()) {
  if (inputCode === "00" || inputCode === "02" || inputCode === "08") {
    setElementsForPostScreen();
  }
}

// CHECK IF WE ARE ON A TOPIC VIEW
if (getPosts().length > 0) {
  doSwitch();
}

export { checkPerms, testCode };
