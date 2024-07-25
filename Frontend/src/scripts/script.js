import { ApiHelper } from "./apiHelper.js";

//const baseURL = "http://18.201.41.51/"
const baseURL = "https://api.karle.co.za/";
//const baseURL = "https://lsu7lwwod8.execute-api.eu-west-1.amazonaws.com/api/";
const apiHelper = new ApiHelper(baseURL);

const main = document.querySelector("main");

let defaultPref = {
  "color1":"rgb(255, 31, 31)",
  "color2":"rgb(255, 51, 190)",
  "color3":"rgb(194, 82, 255)",
  "color4":"rgb(88, 160, 254)",
  "color5":"rgb(68, 255, 0)",
  "color6":"rgb(255, 240, 77)",
  "color7":"rgb(255, 102, 0)",
  "headerTextColor":"rgb(0, 0, 0)",
  "paragraphTextColor":"rgb(0, 0, 0)",
  "linkTextColor":"rgb(0, 0,0)",
  "headerTextSize1":"25.3333px",
  "headerTextSize2":"25.3333px",
  "headerTextSize3":"25.3333px",
  "headerTextSize4":"25.3333px",
  "headerTextSize5":"25.3333px",
  "paragraphTextSize":"16px",
  "linkTextSize":"16px",
  "headersFont":"Arial",
  "paragraphFont":"Arial",
  "linkFont":"Arial"
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
    if(pref.preference == null)
    {
      prefs.push(defaultPref);
    }
    else
    {
      prefs.push(pref.preference);
    }
    
  });

  displayUserPreferences(prefs[0]);

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
    alert("You are not logged in. Login using Google to continue.");
    window.location.href =
      "https://179530787873.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=340s2eqt65h066rs3o0bdfqocp&response_type=token&scope=email+openid&redirect_uri=https%3A%2F%2Fweb.karle.co.za";
  }

  // checkLoggedIn();

  const fonts = ["Arial", "Times New Roman", "Verdana", "Georgia", "Roboto","Pacifico"]; //Get from backend?

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

async function switchPreference() {

  let userPrefs = await getUserPrefs();
  prefs = [];

  userPrefs.forEach((pref) => {
    if(pref.preference == null)
    {
      prefs.push(defaultPref);
    }
    else{
      prefs.push(pref.preference);
    }
  });
    
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


async function getUserPrefs() {
  let prefs;
  try {
    const response = await apiHelper.get("Preference");

    if (response) {
      prefs = await response;
    }
  } catch (error) {
    console.error("Error performing CRUD operation:", error);
  }
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
        try{
        colourPicker1.parentNode.style.backgroundColor = pref.color1;
        colourPicker2.parentNode.style.backgroundColor = pref.color2;
        colourPicker3.parentNode.style.backgroundColor = pref.color3;
        colourPicker4.parentNode.style.backgroundColor = pref.color4;
        colourPicker5.parentNode.style.backgroundColor = pref.color5;
        colourPicker6.parentNode.style.backgroundColor = pref.color6;
        colourPicker7.parentNode.style.backgroundColor = pref.color7;
        }catch{
          console.log("colors failing");
        }

        try{
        headingsContainer.style.color = pref.headerTextColor;
        headerColPicker.style.backgroundColor = pref.headerTextColor;
        }catch{
          console.log("headings failing");
        }

        try{
        paragraphText.style.color = pref.paragraphTextColor;
        paragraphText2.style.color = pref.ParagraphTextColor;
        paragraphColPicker.style.backgroundColor = pref.paragraphTextColor;
        }catch{
          console.log("paragraph stuff fails");
        }

        try{
        header1.style.fontSize = pref.headerTextSize1;
        header2.style.fontSize = pref.headerTextSize2;
        header3.style.fontSize = pref.headerTextSize3;
        header4.style.fontSize = pref.headerTextSize4;
        header5.style.fontSize = pref.headerTextSize5;
        }catch{
          console.log("heading size fails");
        }

        try{
        paragraphText.style.fontSize = pref.paragraphTextSize;
        paragraphText2.style.fontSize = pref.paragraphTextSize;
        linkText.style.fontSize = pref.linkTextSize,
        headingsContainer.style.fontFamily = pref.headersFont;
        headingFontDropdown.value = pref.headersFont;
        paragraphArticle.style.fontFamily = pref.paragraphFont,
        paragraphFontDropdown.value = pref.paragraphFont;
        linkText.style.fontFamily = pref.linkFont;
        linkFontDropdown.value = pref.linkFont;
        linkText.style.color = pref.linkTextColor;
        linkColPicker.style.backgroundColor = pref.linkTextColor;
      }catch{
        console.log("other stuff fails");
      }
      
    }

function setUserPreferences() {
  let uPrefs = {
    profile: dropdown.value,
    preference: {
      color1: getComputedStyle(colourPicker1.parentNode).backgroundColor,
      color2: getComputedStyle(colourPicker2.parentNode).backgroundColor,
      color3: getComputedStyle(colourPicker3.parentNode).backgroundColor,
      color4: getComputedStyle(colourPicker4.parentNode).backgroundColor,
      color5: getComputedStyle(colourPicker5.parentNode).backgroundColor,
      color6: getComputedStyle(colourPicker6.parentNode).backgroundColor,
      color7: getComputedStyle(colourPicker7.parentNode).backgroundColor,
      headerTextColor: getComputedStyle(header1).color,
      paragraphTextColor: getComputedStyle(paragraphText).color,
      linkTextColor: getComputedStyle(linkText).color,
      headerTextSize1: getComputedStyle(header1).fontSize,
      headerTextSize2: getComputedStyle(header2).fontSize,
      headerTextSize3: getComputedStyle(header3).fontSize,
      headerTextSize4: getComputedStyle(header4).fontSize,
      headerTextSize5: getComputedStyle(header5).fontSize,
      paragraphTextSize: getComputedStyle(paragraphText).fontSize,
      linkTextSize: getComputedStyle(linkText).fontSize,
      headersFont: getComputedStyle(header1).fontFamily,
      paragraphFont: getComputedStyle(paragraphText).fontFamily,
      linkFont: getComputedStyle(linkText).fontFamily,
    },
  };
  saveUserPref(uPrefs);
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
