const testData = [
    {
        name: "Adele DeVylissea",
        avatar: "linkforanavatar",
        shortcode: "ade"
    },
    {
        name: "Alan Burdett",
        avatar: "linkforanavatarforAlan",
        shortcode: "abd"
    }
];

const setInfo = () => {
    const postBox = document.getElementsByTagName("textarea")[0];
    const postText = postBox.value;

    let name = "";
    let av = "";

    const charName = document.getElementById("characterName").value;
    const charAv = document.getElementById("characterAv").value;
    const dropVal = document.getElementById("dropselect").value;

    if (charName && charAv) {
        name = charName;
        av = charAv;
    } else if (dropVal) {
        char = testData.filter((char) => char.shortcode == dropVal)[0];
        name = char.name;
        av = char.avatar;
    }

    const replaceString = `${postText} \n[doHTML]<div class="codeHide">&&${name}&& ++${av}++</div>[/doHTML]`;

    postBox.value = replaceString;
};

const createInputs = () => {
    // CREATE CONTAINING DIV

    const outerWrapper = document.createElement("tr");

    const inputWrapper = document.createElement("td");
    inputWrapper.style.display = "flex";
    inputWrapper.style.flexWrap = "wrap";
    inputWrapper.setAttribute("colspan", "2");

    const inputHeader = document.createElement("td");
    inputHeader.classList.add("pformstrip");
    inputHeader.setAttribute("colspan", "2");
    inputHeader.innerText = "Set character information";

    // CREATE CHARACTER NAME INPUT
    const charNameWrap = document.createElement("div");
    charNameWrap.style.padding = "10px";
    charNameWrap.style.flexBasis = "100%";
    charNameWrap.style.display = "flex";
    charNameWrap.style.alignItems = "center";
    const charNameText = document.createElement("span");
    charNameText.innerText = "Character Name";
    const charNameInput = document.createElement("input");
    charNameInput.style.marginLeft = "1ch";
    charNameInput.style.flexGrow = "1";
    charNameInput.setAttribute("type", "text");
    charNameInput.setAttribute("id", "characterName");
    charNameInput.classList.add("forminput", "pformright");
    charNameWrap.append(charNameText);
    charNameWrap.append(charNameInput);
    inputWrapper.append(charNameWrap);

    // CREATE AVATAR LINK INPUT
    const charAvWrap = document.createElement("div");
    charAvWrap.style.padding = "10px";
    charAvWrap.style.flexBasis = "100%";
    charAvWrap.style.display = "flex";
    charAvWrap.style.alignItems = "center";
    const charAvText = document.createElement("span");
    charAvText.innerText = "Character Avatar Link";
    const charAvInput = document.createElement("input");
    charAvInput.classList.add("forminput");
    charAvInput.setAttribute("type", "text");
    charAvInput.setAttribute("id", "characterAv");
    charAvInput.style.marginLeft = "1ch";
    charAvInput.style.flexGrow = "1";
    charAvWrap.append(charAvText);
    charAvWrap.append(charAvInput);
    inputWrapper.append(charAvWrap);

    // CREATE DROPDOWN BOX AND OPTION
    const dropWrap = document.createElement("div");
    dropWrap.style.padding = "10px";
    dropWrap.style.flexBasis = "100%";
    const dropText = document.createElement("span");
    dropText.innerText = "Or select a saved character:";
    dropWrap.append(dropText);
    const dropMenu = document.createElement("select");
    dropMenu.classList.add("forminput");
    dropMenu.style.marginLeft = "1ch";
    dropMenu.style.flexGrow = "1";
    dropMenu.setAttribute("id", "dropselect");
    const disabledOpt = document.createElement("option");
    disabledOpt.innerText = "Select a Saved Character";
    disabledOpt.setAttribute("value", "");
    dropMenu.appendChild(disabledOpt);

    for (var i = 0; i < testData.length; i++) {
        const optionTag = document.createElement("option");
        optionTag.setAttribute("value", testData[i].shortcode);
        optionTag.innerText = testData[i].name;

        dropMenu.appendChild(optionTag);
    }
    dropWrap.append(dropMenu);
    inputWrapper.append(dropWrap);

    // MAKE SURE INPUTS CLEAR IF SOMETHING ELSE IS SELECTED
    dropMenu.addEventListener("change", (e) => {
        charAvInput.value = "";
        charNameInput.value = "";
    });

    charAvInput.addEventListener("keypress", (e) => {
        dropMenu.value = "";
    });

    charNameInput.addEventListener("keypress", (e) => {
        dropMenu.value = "";
    });

    // CREATE DIV BUTTON
    const setInfoButton = document.createElement("span");
    setInfoButton.classList.add("forminput");
    setInfoButton.style.margin = "10px auto";
    setInfoButton.innerText = "Set Information";
    setInfoButton.addEventListener("click", setInfo);

    inputWrapper.append(setInfoButton);

    outerWrapper.append(inputHeader);
    outerWrapper.append(inputWrapper);

    return outerWrapper;
};

// MAKE THE ELEMENTS AND PLACE THEM
const placeInputs = () => {
    const wrapper = createInputs();

    const destinationDiv = document.getElementById("enter-your-post");

    destinationDiv.after(wrapper);
};

placeInputs();
