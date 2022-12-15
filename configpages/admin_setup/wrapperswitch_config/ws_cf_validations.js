import {
  checkUniqueCodes,
  clearWarnings,
} from "../../../global_scripts/global_helpers.js";

// CHECK ALL NPC FIELD FORMS ARE COMPLETED
const validateNpcFields = () => {
  clearWarnings();
  const inputData = sMSet.switchSettings.inputData;
  const inputs = document.querySelectorAll(".npcEntryInput");
  const requiredFields = inputData.filter((item) => item.required === true);
  let proceed = true;
  for (const input of inputs) {
    const item = input.getAttribute("switch-data-input");
    const required = requiredFields.find((field) => field.id === item);
    if (!!required && !input.value) {
      const errorBox = document.createElement("div");
      errorBox.innerText = `This item is required`;
      errorBox.classList.add("warningBox");
      input.parentNode.appendChild(errorBox);
      input.parentNode.parentNode.parentNode.classList.add("errorState");
      proceed = false;
    }

    if (item === "shortcode") {
      //console.log(item, input, input.value);
      const noDupes = checkUniqueCodes(
        input.value,
        sMSet.switchSettings.npcs,
        item
      );
      if (!noDupes.proceed) {
        proceed = false;
        const errorBox = document.createElement("div");
        errorBox.innerText = `${input.value} is being used for more than one npc`;
        errorBox.classList.add("warningBox");
        input.parentNode.appendChild(errorBox);
        input.parentNode.parentNode.parentNode.classList.add("errorState");
        proceed = false;
      }
    }
  }

  if (proceed && validateNpcPermissions(sMSet.switchSettings.npcs)) {
    return true;
  } else {
    return false;
  }
};

// CHECK ALL INPUT FORM FIELDS ARE COMPLETED
const validateInputFields = () => {
  clearWarnings();
  const inputFields = document.querySelectorAll(
    "#inputData input, #inputData select"
  );
  const requiredItems = ["name", "id", "code", "type", "required"];
  let proceed = true;

  for (const field of inputFields) {
    const fieldType = field.getAttribute("name");

    if (requiredItems.includes(fieldType) && !field.value) {
      const warning = document.createElement("div");
      warning.innerText = `${fieldType} is required`;
      warning.classList.add("warningBox");
      field.parentNode.appendChild(warning);
      field.parentNode.parentNode.parentNode.classList.add("errorState");
      proceed = false;
    }

    if (fieldType === "code" || fieldType === "id") {
      const noDupes = checkUniqueCodes(
        field.value,
        sMSet.switchSettings.inputData,
        fieldType
      );
      if (!noDupes.proceed) {
        const warning = document.createElement("div");
        warning.innerText = `${field.value} is being used more than once`;
        warning.classList.add("warningBox");
        field.parentNode.appendChild(warning);
        field.parentNode.parentNode.parentNode.classList.add("errorState");
        proceed = false;
      }
    }
  }

  return proceed;
};

// CHECK SAME MEMBER AND GROUPS ARE NOT INLCUDED AND EXCLUDED FOR ACCESS
const validateGeneralPermissions = () => {
  clearWarnings();
  const groupWrap =
    document.getElementById("groupsCanUse").parentNode.parentNode.parentNode;
  const membWrap =
    document.getElementById("memberCanUse").parentNode.parentNode.parentNode;

  let membersOk = false;
  let groupsOk = false;

  sMSet.switchSettings.permissions.groupsCanUse.map((no) => {
    if (sMSet.switchSettings.permissions.groupsCanNotUse.includes(no)) {
      groupsOk = false;
      groupWrap.classList.add("errorState");
      const newWarning = document.createElement("div");
      newWarning.classList.add("warningBox");
      newWarning.innerText = `Group ${no} is in both exclude and include lists`;
      groupWrap.appendChild(newWarning);
    } else {
      groupsOk = true;
    }
  });

  sMSet.switchSettings.permissions.memberCanUse.map((no) => {
    if (sMSet.switchSettings.permissions.memberCanNotUse.includes(no)) {
      membersOk = false;
      membWrap.classList.add("errorState");
      const newWarning = document.createElement("div");
      newWarning.classList.add("warningBox");
      newWarning.innerText = `Member ${no} is in both exclude and include lists`;
      membWrap.appendChild(newWarning);
    } else {
      membersOk = true;
    }
  });
  const proceed = groupsOk && membersOk;
  return proceed;
};

// CHECK SAME MEMBERS ARE NOT INCLUDED AND EXCLUDED FOR NPCS
const validateNpcPermissions = (npcs) => {
  let proceed = true;
  for (const npc of npcs) {
    npc.overrideMembers.map((member) => {
      const clash = npc.exceptMembers.includes(member);

      if (clash) {
        proceed = false;
        const npcBox = document.querySelectorAll(
          `[switch-data-npc-id="${npc.shortcode}"]`
        )[0];
        const warning = document.createElement("div");
        warning.classList.add("warningBox");
        warning.innerText = `Member ${member} is mentioned in member permissions AND member override`;
        npcBox.appendChild(warning);
        npcBox.classList.add("errorState");
      }
    });
  }
  return proceed;
};

export {
  validateNpcPermissions,
  validateGeneralPermissions,
  validateInputFields,
  validateNpcFields,
  clearWarnings,
};
