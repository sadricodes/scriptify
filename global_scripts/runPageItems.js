import { runWrapperSwitch } from "../modules/wrapperswitch/index_switchcode.js";
import {
  getPosts,
  doSwitch,
} from "../modules/wrapperswitch/post_view_functions.js";

const runScript = () => {
  console.log("gotta know what page we're on first");

  runWrapperSwitch();

  // CHECK IF WE ARE ON A TOPIC VIEW
  if (getPosts().length > 0) {
    doSwitch();
  }
};

export { runScript };
