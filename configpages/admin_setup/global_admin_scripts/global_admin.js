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
  const settingsCode = JSON.stringify(sMSet, null, " ");
  const codeWrap = document.createElement("script");
  const code = `
<script>
  
const sMSet = ${settingsCode}

sMSet.switchSettings.systemData.currentUser = parseInt(sMSet.switchSettings.systemData.currentUserVariable);
sMSet.switchSettings.systemData.currentUserGroup = parseInt(sMSet.switchSettings.systemData.currentUserGroupVariable); 
sMSet.switchSettings.systemData.memberData = eval(<!-- |field_${sMSet.switchSettings.settings.customFieldVariable}| -->);
    
</script>`;
  codeWrap.innerText = code;
  destination.value = code;
};

export { copyCode, writeCode, reDraw };
