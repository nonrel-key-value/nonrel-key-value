import { ApiHelper } from "./apiHelper.js";

//const baseURL = "http://18.201.41.51/"
const baseURL = "https://api.karle.co.za/";
//const baseURL = "https://lsu7lwwod8.execute-api.eu-west-1.amazonaws.com/api/";
const apiHelper = new ApiHelper(baseURL);

const main = document.querySelector("main");

let defaultPref = {
  "Color1":"rgb(255, 31, 31)",
  "Color2":"rgb(255, 51, 190)",
  "Color3":"rgb(194, 82, 255)",
  "Color4":"rgb(88, 160, 254)",
  "Color5":"rgb(68, 255, 0)",
  "Color6":"rgb(255, 240, 77)",
  "Color7":"rgb(255, 102, 0)",
  "HeaderTextColor":"rgb(0, 0, 0)",
  "ParagraphTextColor":"rgb(0, 0, 0)",
  "LinkTextColor":"rgb(0, 0,0)",
  "HeaderTextSize1":"25.3333px",
  "HeaderTextSize2":"25.3333px",
  "HeaderTextSize3":"25.3333px",
  "HeaderTextSize4":"25.3333px",
  "HeaderTextSize5":"25.3333px",
  "ParagraphTextSize":"16px",
  "LinkTextSize":"16px",
  "HeadersFont":"\"Times New Roman\"",
  "ParagraphFont":"\"Times New Roman\"",
  "LinkFont":"\"Times New Roman\""
}
const dropdown = document.getElementById("dropdown");
const selectedPreference = document.getElementById("selectedPreference");
const headingsContainer = document.getElementById("headings");

const deletePreferenceBtn = document.getElementById("deletePrefs");
const confirmDeleteDialog = document.getElementById("confirmDeleteDialog");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const addPreferenceBtn = document.getElementById("addPref");
const addPreferenceDialog = document.getElementById("addPreferenceDialog");
const cancelNewPreferenceBtn = document.getElementById(
  "cancelNewPreferenceBtn"
);
const postNewPreferenceBtn = document.getElementById("postNewPreferenceBtn");
const nextPreferenceId = document.getElementById("nextPreferenceId");
const preferenceId = document.getElementById("preferenceId");

const currentPreferenceName = document.getElementById("currentPreferenceName");

const defaultFontSize = 16;
const defaultColor = "black";

var userPreferencesObj;

const colourPicker1 = document.getElementById("inputColour1");
const colourPicker2 = document.getElementById("inputColour2");
const colourPicker3 = document.getElementById("inputColour3");
const colourPicker4 = document.getElementById("inputColour4");
const colourPicker5 = document.getElementById("inputColour5");
const colourPicker6 = document.getElementById("inputColour6");
const colourPicker7 = document.getElementById("inputColour7");

const headingFontDropdown = document.getElementById("headingFontDropdown");
const paragraphFontDropdown = document.getElementById("paragraphFontDropdown");
const linkFontDropdown = document.getElementById("linkFontDropdown");

const inputParagraphColour = document.getElementById("inputParagraphColour");

const headingSize1 = document.getElementById("headingSize1");
const headingSize2 = document.getElementById("headingSize2");
const headingSize3 = document.getElementById("headingSize3");
const headingSize4 = document.getElementById("headingSize4");
const headingSize5 = document.getElementById("headingSize5");

const header1 = document.getElementById("heading1");
const header2 = document.getElementById("heading2");
const header3 = document.getElementById("heading3");
const header4 = document.getElementById("heading4");
const header5 = document.getElementById("heading5");

const headingsColor = document.getElementById("headingsColourInput");

const inputLinkColour = document.getElementById("inputLinkColour");

const savePrefs = document.getElementById("savePrefs");

const paragraphColPicker = document.getElementById("pColourInput");
const headerColPicker = document.getElementById("headingsColourInput");
const linkColPicker = document.getElementById("lColourInput");

const paragraphArticle = document.getElementById("paragraphArticle");
const linkText = document.getElementById("linkText");

const paragraphText = document.getElementById("pText");
const paragraphText2 = document.getElementById("pText2");

const paragraphSizeInput = document.getElementById("paragraphSize");
const linkSizeInput = document.getElementById("linkSize");

var storedPref;
let prefs = [];

// const loginButton = document.getElementById("loginLink");

// var logged_in = false;

colourPicker1.addEventListener("change", changeColour);
colourPicker2.addEventListener("change", changeColour);
colourPicker3.addEventListener("change", changeColour);
colourPicker4.addEventListener("change", changeColour);
colourPicker5.addEventListener("change", changeColour);
colourPicker6.addEventListener("change", changeColour);
colourPicker7.addEventListener("change", changeColour);

headingSize1.addEventListener("change", changeSize);
headingSize2.addEventListener("change", changeSize);
headingSize3.addEventListener("change", changeSize);
headingSize4.addEventListener("change", changeSize);
headingSize5.addEventListener("change", changeSize);

preferenceId.addEventListener("change", changePreference);

inputParagraphColour.addEventListener("change", changeParagraphColour);

headingsColor.addEventListener("change", changeHeadingColour);

inputLinkColour.addEventListener("change", changeLinkColour);

savePrefs.addEventListener("click", setUserPreferences);

paragraphSizeInput.addEventListener("change", changeParagraphSize);

linkSizeInput.addEventListener("change", changeLinkSize);
//healthCheck();

dropdown.addEventListener("change", switchPreference);

async function loadStuff() {
  var userPrefs = await getUserPrefs();
  let options = [];
  prefs = [];

  userPrefs.forEach((pref) => {
    options.push(pref.profile);
    prefs.push(pref.preference);
    console.log(pref.preference);
  });

  dropdown.replaceChildren();

  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    dropdown.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  function getTokensFromUrl() {
    const hash = window.location.hash.substr(1);
    const result = hash.split("&").reduce((res, item) => {
      const parts = item.split("=");
      res[parts[0]] = parts[1];
      return res;
    }, {});

    // Clear the URL hash to prevent exposing tokens
    window.history.replaceState({}, document.title, window.location.pathname);

    return result;
  }

  // Extract tokens
  const tokens = getTokensFromUrl();
  if (tokens.id_token && tokens.access_token) {
    // Store tokens securely
    sessionStorage.setItem("id_token", tokens.id_token);
    sessionStorage.setItem("access_token", tokens.access_token);

    // You can now use these tokens for API calls
    console.log("Tokens extracted and stored securely");
  } else {
    console.error("Tokens not found in URL");
    alert("You are not logged in. Login using Google to continue.");
    window.location.href =
      "https://179530787873.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=340s2eqt65h066rs3o0bdfqocp&response_type=token&scope=email+openid&redirect_uri=https%3A%2F%2Fweb.karle.co.za";
  }

  // checkLoggedIn();

  const fonts = ["Arial", "Times New Roman", "Verdana", "Georgia", "Roboto"]; //Get from backend?

  document.body.style.fontSize = defaultFontSize;
  document.body.style.color = defaultColor;

  loadStuff();

  fonts.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    headingFontDropdown.appendChild(option);
  });
  fonts.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    paragraphFontDropdown.appendChild(option);
  });
  fonts.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText;
    option.textContent = optionText;
    linkFontDropdown.appendChild(option);
  });

  headingFontDropdown.addEventListener("change", (event) => {
    changeHeadingFont(event.target.value);
    console.log("heading font: " + event.target.value);
  });

  paragraphFontDropdown.addEventListener("change", (event) => {
    changeParagraphFont(event.target.value);
  });

  linkFontDropdown.addEventListener("change", (event) => {
    changeLinkFont(event.target.value);
  });
});

deletePreferenceBtn.onclick = () => {
  confirmDeleteDialog.style.visibility = "visible";
  main.classList.add("blur");
};

cancelDeleteBtn.onclick = () => {
  confirmDeleteDialog.style.visibility = "hidden";
  main.classList.remove("blur");
};

confirmDeleteBtn.onclick = () => {
  //BACKEND CALL TO DELETE (still need to refresh selected preference). So another get request and reselect first item in preference dropdown
  currentPreferenceName.textContent = dropdown.value;
  apiHelper.delete("Preference", dropdown.value);
  confirmDeleteDialog.style.visibility = "hidden";
  main.classList.remove("blur");

  loadStuff();
};

addPreferenceBtn.onclick = () => {
  addPreferenceDialog.style.visibility = "visible";
  main.classList.add("blur");
};

cancelNewPreferenceBtn.onclick = () => {
  addPreferenceDialog.style.visibility = "hidden";
  main.classList.remove("blur");
};

postNewPreferenceBtn.onclick = () => {
  // GET ID OF NEXT PREFERENCE

  var newPreferenceId = preferenceId.value;

  let obj = {
    profile: `Preference${newPreferenceId}`,
    defaultPref,
  };

  saveUserPref(obj);

  loadStuff();
  addPreferenceDialog.style.visibility = "hidden";
  main.classList.remove("blur");
};

async function switchPreference(event) {

    console.log("storedPref: " + storedPref);
    displayUserPreferences(prefs[dropdown.selectedIndex]);
    // Set content based on value
}

function changeHeadingFont(value) {
  headingsContainer.style.fontFamily = value;
}

function changeParagraphFont(value) {
  paragraphArticle.style.fontFamily = value;
}

function changeLinkFont(value) {
  linkText.style.fontFamily = value;
}

function changeColour(event) {
  event.target.parentNode.style.backgroundColor = event.target.value;
}

function changeParagraphColour(event) {
  event.target.parentNode.style.backgroundColor = event.target.value;
  paragraphText.style.color = event.target.value;
  paragraphText2.style.color = event.target.value;
}

function changeHeadingColour(event) {
  event.target.parentNode.style.backgroundColor = event.target.value;
  header1.style.color = event.target.value;
  header2.style.color = event.target.value;
  header3.style.color = event.target.value;
  header4.style.color = event.target.value;
  header5.style.color = event.target.value;
}

function changeLinkColour(event) {
  event.target.parentNode.style.backgroundColor = event.target.value;
  linkText.style.color = event.target.value;
}

function changeSize(event) {
  event.target.parentNode.style.fontSize = event.target.value + "pt";
}

function changePreference(event) {
  if (event.target.value > 9) {
    preferenceId.value = 9;
  } else if (event.target.value <= -1) {
    preferenceId.value = 0;
  } else {
    preferenceId.value = Number(event.target.value);
  }

  nextPreferenceId.textContent = preferenceId.value;
}

function changeParagraphSize(event) {
  for (const child of paragraphArticle.children) {
    child.style.fontSize = event.target.value + "pt";
  }
}

function changeLinkSize(event) {
  linkText.style.fontSize = event.target.value + "pt";
}

// function checkLoggedIn()
// {
//     if(logged_in)
//     {
//         loginButton.classList.add("hide");
//     }
//     else{
//         loginButton.classList.remove("hide");
//     }
// }
//setUserPreferences();
//console.log(userPreferencesObj);

async function getUserPrefs() {
  let prefs;
  try {
    const response = await apiHelper.get("Preference");

    if (response) {
      console.log(response);
      prefs = await response;
    }
  } catch (error) {
    console.error("Error performing CRUD operation:", error);
  }
  console.log(prefs);
  return prefs;
}




async function saveUserPref(userPrefObj) {
  try {
    const response = await apiHelper.post("Preference", userPrefObj);

    if (response) {
      console.log(response);
    }
  } catch (error) {
    console.error("Error performing CRUD operation:", error);
  }
}
    async function displayUserPreferences(pref)
    {
      console.log("pref: " + pref);
        try{
        colourPicker1.parentNode.style.backgroundColor = pref.Color1;
        colourPicker2.parentNode.style.backgroundColor = pref.Color2;
        colourPicker3.parentNode.style.backgroundColor = pref.Color3;
        colourPicker4.parentNode.style.backgroundColor = pref.Color4;
        colourPicker5.parentNode.style.backgroundColor = pref.Color5;
        colourPicker6.parentNode.style.backgroundColor = pref.Color6;
        colourPicker7.parentNode.style.backgroundColor = pref.Color7;

        headingsContainer.style.color = pref.HeaderTextColor;
        headerColPicker.style.backgroundColor = pref.HeaderTextColor;

        paragraphText.style.color = pref.ParagraphTextColor;
        paragraphText2.style.color = pref.ParagraphTextColor;
        paragraphColPicker.style.backgroundColor = pref.ParagraphTextColor;
        header1.style.fontSize = pref.HeaderTextSize1;
        header2.style.fontSize = pref.HeaderTextSize2;
        header3.style.fontSize = pref.HeaderTextSize3;
        header4.style.fontSize = pref.HeaderTextSize4;
        header5.style.fontSize = pref.HeaderTextSize5;

        paragraphText.style.fontSize = pref.ParagraphTextSize;
        paragraphText2.style.fontSize = pref.ParagraphTextSize;
        linkText.style.fontSize = pref.LinkTextSize,
        headingsContainer.style.fontFamily = pref.fontFamily;
        paragraphArticle.style.fontFamily = pref.ParagraphFont,
        linkText.style.fontFamily = pref.LinkFont;
        linkText.style.color = pref.LinkTextColor;
        linkColPicker.style.backgroundColor = pref.LinkTextColor;
      }catch{
        console.log("defaulting");
        let storedPref2 = defaultPref;
        colourPicker1.parentNode.style.backgroundColor = storedPref2.Color1;
        colourPicker2.parentNode.style.backgroundColor = storedPref2.Color2;
        colourPicker3.parentNode.style.backgroundColor = storedPref2.Color3;
        colourPicker4.parentNode.style.backgroundColor = storedPref2.Color4;
        colourPicker5.parentNode.style.backgroundColor = storedPref2.Color5;
        colourPicker6.parentNode.style.backgroundColor = storedPref2.Color6;
        colourPicker7.parentNode.style.backgroundColor = storedPref2.Color7;

        headingsContainer.style.color = storedPref2.HeaderTextColor;
        headerColPicker.style.backgroundColor = storedPref2.HeaderTextColor;

        paragraphText.style.color = storedPref2.ParagraphTextColor;
        paragraphText2.style.color = storedPref2.ParagraphTextColor;
        paragraphColPicker.style.backgroundColor = storedPref2.ParagraphTextColor;
        header1.style.fontSize = storedPref2.HeaderTextSize1;
        header2.style.fontSize = storedPref2.HeaderTextSize2;
        header3.style.fontSize = storedPref2.HeaderTextSize3;
        header4.style.fontSize = storedPref2.HeaderTextSize4;
        header5.style.fontSize = storedPref2.HeaderTextSize5;

        paragraphText.style.fontSize = storedPref2.ParagraphTextSize;
        paragraphText2.style.fontSize = storedPref2.ParagraphTextSize;
        linkText.style.fontSize = storedPref2.LinkTextSize,
        headingsContainer.style.fontFamily = storedPref2.fontFamily;
        paragraphArticle.style.fontFamily = storedPref2.ParagraphFont,
        linkText.style.fontFamily = storedPref2.LinkFont;
        linkText.style.color = storedPref2.LinkTextColor;
        linkColPicker.style.backgroundColor = storedPref2.LinkTextColor;
      }
    }

function setUserPreferences() {
  let userPrefs = {
    profile: dropdown.value,
    preference: {
      Color1: getComputedStyle(colourPicker1.parentNode).backgroundColor,
      Color2: getComputedStyle(colourPicker2.parentNode).backgroundColor,
      Color3: getComputedStyle(colourPicker3.parentNode).backgroundColor,
      Color4: getComputedStyle(colourPicker4.parentNode).backgroundColor,
      Color5: getComputedStyle(colourPicker5.parentNode).backgroundColor,
      Color6: getComputedStyle(colourPicker6.parentNode).backgroundColor,
      Color7: getComputedStyle(colourPicker7.parentNode).backgroundColor,
      HeaderTextColor: getComputedStyle(header1).color,
      ParagraphTextColor: getComputedStyle(paragraphText).color,
      LinkTextColor: getComputedStyle(linkText).color,
      HeaderTextSize1: getComputedStyle(header1).fontSize,
      HeaderTextSize2: getComputedStyle(header2).fontSize,
      HeaderTextSize3: getComputedStyle(header3).fontSize,
      HeaderTextSize4: getComputedStyle(header4).fontSize,
      HeaderTextSize5: getComputedStyle(header5).fontSize,
      ParagraphTextSize: getComputedStyle(paragraphText).fontSize,
      LinkTextSize: getComputedStyle(linkText).fontSize,
      HeadersFont: getComputedStyle(header1).fontFamily,
      ParagraphFont: getComputedStyle(paragraphText).fontFamily,
      LinkFont: getComputedStyle(linkText).fontFamily,
    },
  };
  userPreferencesObj = userPrefs;
  localStorage.setItem("1", JSON.stringify(userPreferencesObj));

  console.log(userPreferencesObj);
  saveUserPref(userPreferencesObj);

}
async function handleRedirect() {
  try {
    let hash = location.hash.substring(1); // Remove the '#' from the beginning
    let fragmentParams = new URLSearchParams(hash);
    let accessToken = fragmentParams.get("access_token");
    if (accessToken) {
      logged_in = true;
      sessionStorage.setItem("Token", accessToken);
      history.replaceState(null, null, window.location.href.split("#")[0]);
    }
  } catch (err) {
    console.log("Something failed: " + err);
  }
}

window.addEventListener("load", handleRedirect);

export async function auth() {
  await login();
}
