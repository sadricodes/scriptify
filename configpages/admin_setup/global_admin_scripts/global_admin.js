import { getNpcValues } from "../wrapperswitch_config/ws_cf_npcs.js";
import { getTextValue } from "../wrapperswitch_config/ws_cf_baseSettings.js";
import { setInputChanges } from "../wrapperswitch_config/ws_cf_inputs.js";

// GET INFORMATION AND REDRAW PAGE
const reDraw = () => {
  getNpcValues();
  getTextValue();
  setInputChanges();
};

// COPY CODE TO THE CLIPBOARD
const copyCode = () => {
  const code = document.getElementById("generatedCode").value;
  const errorbox = document.getElementById("generateInfo");

  if (code.length > 0) {
    const copyContent = async () => {
      try {
        await navigator.clipboard.writeText(code);
        const info = document.createElement("span");
        info.innerText = "Successfully Copied to Clip Board!";
        info.classList.add("warningBox", "warnSuccess");
        errorbox.appendChild(info);
      } catch (err) {
        const info = document.createElement("span");
        info.innerText = "Could not copy to clipboard";
        info.classList.add("warningBox");
        errorbox.appendChild(info);
      }
    };
    copyContent();
  } else {
    // do nothing
  }
};

// WRITE CODE TO THE TEXTAREA
const writeCode = () => {
  // GET VALUES FROM TEXT SETTING INPUTS
  reDraw();
  // write the json code here
  const destination = document.getElementById("generatedCode");
  const settingsCode = JSON.stringify(switchSettings, null, " ");
  const inputCode = JSON.stringify(inputData, null, " ");
  const npcCode = JSON.stringify(npcs, null, " ");
  const codeWrap = document.createElement("script");
  const code = `<script> \n\n const switchSettings = ${settingsCode} \n \n 
    switchSettings.currentUser = parseInt(switchSettings.currentUserVariable);\n
    switchSettings.currentUserGroup = parseInt(switchSettings.currentUserGroupVariable);\n  
    switchSettings.memberData = eval(<!-- |field_${switchSettings.customFieldVariable}| -->);\n\n
    let inputData = ${inputCode} \n\n 
    let npcs = ${npcCode} \n\n</script>`;
  codeWrap.innerText = code;
  destination.value = code;
};

export { copyCode, writeCode, reDraw };
