import { runWrapperSwitch } from "../modules/wrapperswitch/index_switchcode.js";
import {
  getPosts,
  doSwitch,
} from "../modules/wrapperswitch/post_view_functions.js";

const runScript = () => {
  // CHECK IF WRAPPER SWITCH IS ENABLED
  if (sMSet.switchSettings.currentlyEnabled) {
    runWrapperSwitch();

    // CHECK IF WE ARE ON A TOPIC VIEW
    if (getPosts().length > 0) {
      doSwitch();
    }
  }
};

export { runScript };
