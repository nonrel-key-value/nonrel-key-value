import {ApiHelper } from "./apiHelper.js";

//const baseURL = "http://18.201.41.51/"
const baseURL = "https://api.karle.co.za/";
//const baseURL = "https://lsu7lwwod8.execute-api.eu-west-1.amazonaws.com/api/";
const apiHelper = new ApiHelper(baseURL);

const main = document.querySelector('main');

const dropdown = document.getElementById('dropdown');
const selectedPreference = document.getElementById('selectedPreference');
const headingsContainer = document.getElementById('headings');

const deletePreferenceBtn = document.getElementById('deletePrefs')
const confirmDeleteDialog = document.getElementById('confirmDeleteDialog');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const addPreferenceBtn = document.getElementById('addPref');
const addPreferenceDialog = document.getElementById('addPreferenceDialog');
const cancelNewPreferenceBtn = document.getElementById('cancelNewPreferenceBtn');
const postNewPreferenceBtn = document.getElementById('postNewPreferenceBtn');
const nextPreferenceId = document.getElementById('nextPreferenceId');
const preferenceId = document.getElementById('preferenceId');

const currentPreferenceName = document.getElementById('currentPreferenceName');

const defaultFontSize = 16;
const defaultColor = 'black';

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

// const loginButton = document.getElementById("loginLink");

// var logged_in = false;



colourPicker1.addEventListener("change",changeColour);
colourPicker2.addEventListener("change",changeColour);
colourPicker3.addEventListener("change",changeColour);
colourPicker4.addEventListener("change",changeColour);
colourPicker5.addEventListener("change",changeColour);
colourPicker6.addEventListener("change",changeColour);
colourPicker7.addEventListener("change",changeColour);

headingSize1.addEventListener("change",changeSize);
headingSize2.addEventListener("change",changeSize);
headingSize3.addEventListener("change",changeSize);
headingSize4.addEventListener("change",changeSize);
headingSize5.addEventListener("change",changeSize);

preferenceId.addEventListener("change",changePreference);

inputParagraphColour.addEventListener("change",changeParagraphColour);

headingsColor.addEventListener("change", changeHeadingColour);

inputLinkColour.addEventListener("change",changeLinkColour);

savePrefs.addEventListener("click", setUserPreferences);

paragraphSizeInput.addEventListener("change",changeParagraphSize);

linkSizeInput.addEventListener("change",changeLinkSize);
//healthCheck();

dropdown.addEventListener("change",switchPreference);

async function loadStuff(){
  var userPrefs = await getUserPrefs();
  console.log("HERE:" + userPrefs);
  let options = [];
  userPrefs.forEach(pref=>{
    options.push(pref.profile);
  })
  
  options.forEach(optionText => {
      const option = document.createElement('option');
      option.value = optionText;
      option.textContent = optionText;
      dropdown.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', async () => {

    function getTokensFromUrl() {
        const hash = window.location.hash.substr(1);
        const result = hash.split('&').reduce((res, item) => {
          const parts = item.split('=');
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
        sessionStorage.setItem('id_token', tokens.id_token);
        sessionStorage.setItem('access_token', tokens.access_token);
    
        // You can now use these tokens for API calls
        console.log('Tokens extracted and stored securely');
      } else {
        console.error('Tokens not found in URL');
        alert('You are not logged in. Login using Google to continue.')
        window.location.href = 'https://179530787873.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=340s2eqt65h066rs3o0bdfqocp&response_type=token&scope=email+openid&redirect_uri=https%3A%2F%2Fweb.karle.co.za';
      }


    // checkLoggedIn();

    const fonts = ['Arial', 'Times New Roman', 'Verdana', 'Georgia', 'Roboto'] //Get from backend?
    
  document.body.style.fontSize = defaultFontSize;
  document.body.style.color = defaultColor;

      loadStuff();

    fonts.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        headingFontDropdown.appendChild(option);
    });
    fonts.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        paragraphFontDropdown.appendChild(option);
    });
    fonts.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        linkFontDropdown.appendChild(option);
    });

    // switchPreference(dropdown.value);

    // changeHeadingFont(headingFontDropdown.value);
    // changeParagraphFont(paragraphFontDropdown.value);
    // changeLinkFont(linkFontDropdown.value);

    headingFontDropdown.addEventListener('change', (event) => {
        changeHeadingFont(event.target.value);
    });

    paragraphFontDropdown.addEventListener('change', (event) => {
        changeParagraphFont(event.target.value);
    });

    linkFontDropdown.addEventListener('change', (event) => {
        changeLinkFont(event.target.value);
    });
});

deletePreferenceBtn.onclick = () => {
    confirmDeleteDialog.style.visibility = 'visible';
    main.classList.add('blur');
}

cancelDeleteBtn.onclick = () => {
    confirmDeleteDialog.style.visibility = 'hidden';
    main.classList.remove('blur');
}

confirmDeleteBtn.onclick = () => {
    //BACKEND CALL TO DELETE (still need to refresh selected preference). So another get request and reselect first item in preference dropdown
    currentPreferenceName.textContent = dropdown.value;
    apiHelper.delete('Preference', dropdown.value);
    confirmDeleteDialog.style.visibility = 'hidden';
    main.classList.remove('blur');

    loadStuff();

}

 addPreferenceBtn.onclick = () => {
    // GET ID OF NEXT PREFERENCE

    var newPreferenceId = preferenceId.value;
    console.log(newPreferenceId);
    console.log(nextPreferenceId.textContent);

    let obj = {
      "profile": `Preference${newPreferenceId}`,
      "preference": {
        "color1": "rgba(255, 192, 203, 0.094)",
        "color2": "rgba(255, 192, 203, 0.094)",
        "color3": "rgba(255, 192, 203, 0.094)",
        "color4": "rgba(255, 192, 203, 0.094)",
        "color5": "rgba(255, 192, 203, 0.094)",
        "color6": "rgba(255, 192, 203, 0.094)",
        "color7": "rgba(255, 192, 203, 0.094)",
        "headerTextColor": "rgb(0, 0, 0)",
        "headerTextSize1": "16px",
        "headerTextSize2": "16px",
        "headerTextSize3": "16px",
        "headerTextSize4": "16px",
        "headerTextSize5": "16px",
        "headersFont": "Poppins, sans-serif",
        "linkFont": "Poppins, sans-serif",
        "linkTextColor": "rgb(0, 0, 0)",
        "linkTextSize": "16px",
        "paragraphFont": "Poppins, sans-serif",
        "paragraphTextColor": "rgb(0, 0, 0)",
        "paragraphTextSize": "16px"
      }
    }
    
    // Backend call with Default Values (still need to refresh). Another GET request
    saveUserPref(obj);

    addPreferenceDialog.style.visibility = 'visible';
    main.classList.add('blur');

    loadStuff();
 }

 cancelNewPreferenceBtn.onclick = () => {
    addPreferenceDialog.style.visibility = 'hidden';
    main.classList.remove('blur');
}

postNewPreferenceBtn.onclick = () => {
    //BACKEND CALL TO ADD PREFERENCE
    addPreferenceDialog.style.visibility = 'hidden';
    main.classList.remove('blur');
}

function switchPreference(value) {
    console.log("preference switched to: " + value);
    displayUserPreferences();
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

function changeColour(event)
{
    event.target.parentNode.style.backgroundColor = event.target.value;
}

function changeParagraphColour(event)
{
    event.target.parentNode.style.backgroundColor = event.target.value;
    paragraphText.style.color = event.target.value;
    paragraphText2.style.color = event.target.value;
}

function changeHeadingColour(event)
{
    event.target.parentNode.style.backgroundColor = event.target.value;
    header1.style.color = event.target.value;
    header2.style.color = event.target.value;
    header3.style.color = event.target.value;
    header4.style.color = event.target.value;
    header5.style.color = event.target.value;
}

function changeLinkColour(event)
{
    event.target.parentNode.style.backgroundColor = event.target.value;
    linkText.style.color = event.target.value;
}

function changeSize(event)
{
    event.target.parentNode.style.fontSize = (event.target.value) + "pt";
}


function changePreference(event)
{
    if (event.target.value > 9) {
        preferenceId.value = 9;
    } else if (event.target.value <= -1) {
        preferenceId.value = 0;
    } else {
        preferenceId.value = Number(event.target.value);
    }

    nextPreferenceId.textContent = preferenceId.value;
}

function changeParagraphSize(event)
{
    for (const child of paragraphArticle.children) {
        child.style.fontSize = (event.target.value) + "pt";
      }
}

function changeLinkSize(event)
{
    linkText.style.fontSize = (event.target.value) + "pt";
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
        const response = await apiHelper.get('Preference');
          
        if (response) {
          console.log(response);
          prefs = await response;
        }
      } catch (error) {
        console.error('Error performing CRUD operation:', error);
      }
      return prefs;
    }


    async function saveUserPref(userPrefObj) {
        try {
          const response = await apiHelper.post('Preference',userPrefObj);
            
          if (response) {
            console.log(response);
          }
        } catch (error) {
          console.error('Error performing CRUD operation:', error);
        }
      }


    function displayUserPreferences()
    {
        let storedPref = (JSON.parse(localStorage.getItem("1"))).preference;
        try{
        colourPicker1.parentNode.style.backgroundColor = storedPref.Color1;
        colourPicker2.parentNode.style.backgroundColor = storedPref.Color2;
        colourPicker3.parentNode.style.backgroundColor = storedPref.Color3;
        colourPicker4.parentNode.style.backgroundColor = storedPref.Color4;
        colourPicker5.parentNode.style.backgroundColor = storedPref.Color5;
        colourPicker6.parentNode.style.backgroundColor = storedPref.Color6;
        colourPicker7.parentNode.style.backgroundColor = storedPref.Color7;

        headingsContainer.style.color = storedPref.HeaderTextColor;
        headerColPicker.style.backgroundColor = storedPref.HeaderTextColor;

        paragraphText.style.color = storedPref.ParagraphTextColor;
        paragraphText2.style.color = storedPref.ParagraphTextColor;
        paragraphColPicker.style.backgroundColor = storedPref.ParagraphTextColor;
        header1.style.fontSize = storedPref.HeaderTextSize1;
        header2.style.fontSize = storedPref.HeaderTextSize2;
        header3.style.fontSize = storedPref.HeaderTextSize3;
        header4.style.fontSize = storedPref.HeaderTextSize4;
        header5.style.fontSize = storedPref.HeaderTextSize5;

        paragraphText.style.fontSize = storedPref.ParagraphTextSize;
        paragraphText2.style.fontSize = storedPref.ParagraphTextSize;
        linkText.style.fontSize = storedPref.LinkTextSize,
        headingsContainer.style.fontFamily = storedPref.fontFamily;
        paragraphArticle.style.fontFamily = storedPref.ParagraphFont,
        linkText.style.fontFamily = storedPref.LinkFont;
        linkText.style.color = storedPref.LinkTextColor;
        linkColPicker.style.backgroundColor = storedPref.LinkTextColor;
      }catch{
        console.log("defaults");
      }

    }

    function setUserPreferences()
    {
        let userPrefs ={
          profile: "preference",
          preference: {
            Color1 : getComputedStyle(colourPicker1.parentNode).backgroundColor,
            Color2 : getComputedStyle(colourPicker2.parentNode).backgroundColor,
            Color3 : getComputedStyle(colourPicker3.parentNode).backgroundColor,
            Color4 : getComputedStyle(colourPicker4.parentNode).backgroundColor,
            Color5 : getComputedStyle(colourPicker5.parentNode).backgroundColor,
            Color6 : getComputedStyle(colourPicker6.parentNode).backgroundColor,
            Color7 : getComputedStyle(colourPicker7.parentNode).backgroundColor,
            HeaderTextColor : getComputedStyle(header1).color,
            ParagraphTextColor : getComputedStyle(paragraphText).color,
            LinkTextColor : getComputedStyle(linkText).color,
            HeaderTextSize1 : getComputedStyle(header1).fontSize,
            HeaderTextSize2 : getComputedStyle(header2).fontSize,
            HeaderTextSize3 : getComputedStyle(header3).fontSize,
            HeaderTextSize4 : getComputedStyle(header4).fontSize,
            HeaderTextSize5 : getComputedStyle(header5).fontSize,
            ParagraphTextSize : getComputedStyle(paragraphText).fontSize,
            LinkTextSize : getComputedStyle(linkText).fontSize,
            HeadersFont : getComputedStyle(header1).fontFamily,
            ParagraphFont : getComputedStyle(paragraphText).fontFamily,
            LinkFont : getComputedStyle(linkText).fontFamily
        }
      }
        userPreferencesObj = userPrefs;
        localStorage.setItem("1", JSON.stringify(userPreferencesObj));

        console.log(userPreferencesObj);
        saveUserPref(userPreferencesObj);
    }
    async function handleRedirect() {
        try{
        let hash = location.hash.substring(1); // Remove the '#' from the beginning
        let fragmentParams = new URLSearchParams(hash);
        let accessToken = fragmentParams.get("access_token");
        if(accessToken){
            logged_in = true;
          sessionStorage.setItem("Token", accessToken);
          history.replaceState(null, null, window.location.href.split("#")[0]);
        }
        }
        catch(err){
        console.log("Something failed: " + err);
        }
      }
      
      window.addEventListener("load", handleRedirect);
      
      export async function auth() {
        await login();
      }