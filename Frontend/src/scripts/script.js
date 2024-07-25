import {ApiHelper } from "./apiHelper.js";

const baseURL = "https://api.karle.co.za/";
const apiHelper = new ApiHelper(baseURL);


const dropdown = document.getElementById('dropdown');
const selectedPreference = document.getElementById('selectedPreference');
//const addPreferenceBtn = document.querySelector('add-preference--btn');
const headingsContainer = document.getElementById('headings');

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

const fontDropdown = document.getElementById("fontDropdown");

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

const loginButton = document.getElementById("loginLink");

var logged_in = false;



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

inputParagraphColour.addEventListener("change",changeParagraphColour);

headingsColor.addEventListener("change", changeHeadingColour);

inputLinkColour.addEventListener("change",changeLinkColour);

savePrefs.addEventListener("click", setUserPreferences);

paragraphSizeInput.addEventListener("change",changeParagraphSize);

linkSizeInput.addEventListener("change",changeLinkSize);
//healthCheck();

dropdown.addEventListener("change",switchPreference);


document.addEventListener('DOMContentLoaded', () => {
    checkLoggedIn();

    document.body.style.fontSize = defaultFontSize;
    document.body.style.color = defaultColor;

    const options = ['Preference1', 'Preference2', 'Preference3']; //Get from backend
    const fonts = ['Arial', 'Times New Roman', 'Verdana', 'Georgia', 'Roboto'] //Get from backend?
    
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        dropdown.appendChild(option);
    });

    fonts.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        fontDropdown.appendChild(option);
    });

    switchPreference(dropdown.value);

    // dropdown.addEventListener('change', (event) => {
    //     switchPreference(event.target.value);
    // });

    changeFont(fontDropdown.value);

    fontDropdown.addEventListener('change', (event) => {
        changeFont(event.target.value);
    });

});

//  addPreferenceBtn.onclick = () => {
//      // Backend call to add preference
//      console.log('clicked');
//  }

function switchPreference(value) {
    console.log("preference switched to: " + value);
    displayUserPreferences();
    // Set content based on value
    // selectedPreference.textContent = `Selected preference is: ${value}`;
}

function changeFont(value) {
    headings.style.fontFamily = value;
    header1.style.fontFamily = value;
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

function checkLoggedIn()
{
    if(logged_in)
    {
        loginButton.classList.add("hide");
    }
    else{
        loginButton.classList.remove("hide");
    }
}
setUserPreferences();
console.log(userPreferencesObj);

async function healthCheck() {
      try {
        const response = await apiHelper.get();
          
        if (response) {
          console.log(response);
        }
      } catch (error) {
        console.error('Error performing CRUD operation:', error);
      }
    }


    function displayUserPreferences()
    {
        let storedPref = JSON.parse(localStorage.getItem("1"));
        colourPicker1.parentNode.style.backgroundColor = storedPref.Color1;
        colourPicker2.parentNode.style.backgroundColor = storedPref.Color2;
        colourPicker3.parentNode.style.backgroundColor = storedPref.Color3;
        colourPicker4.parentNode.style.backgroundColor = storedPref.Color4;
        colourPicker5.parentNode.style.backgroundColor = storedPref.Color5;
        colourPicker6.parentNode.style.backgroundColor = storedPref.Color6;
        colourPicker7.parentNode.style.backgroundColor = storedPref.Color7;

        header1.style.color = storedPref.HeaderTextColor;
        header2.style.color = storedPref.HeaderTextColor;
        header3.style.color = storedPref.HeaderTextColor;
        header4.style.color = storedPref.HeaderTextColor;
        header5.style.color = storedPref.HeaderTextColor;
        headerColPicker.style.backgroundColor = storedPref.HeaderTextColor;

        paragraphText.style.color = storedPref.ParagraphTextColor;
        paragraphText2.style.color = storedPref.ParagraphTextColor;
        paragraphColPicker.style.backgroundColor = storedPref.ParagraphTextColor;
        header1.style.fontSize = storedPref.HeaderTextSize1;
        header2.style.fontSize = storedPref.HeaderTextSize2;
        header3.style.fontSize = storedPref.HeaderTextSize3;
        header4.style.fontSize = storedPref.HeaderTextSize4;
        header5.style.fontSize = storedPref.HeaderTextSize5;

        paragraphText.style.fontSize = storedPref.ParagraphTextSize,
        paragraphText2.style.fontSize = storedPref.ParagraphTextSize,
        linkText.style.fontSize = storedPref.LinkTextSize,
        header1.style.fontFamily = storedPref.HeadersFont,
        paragraphText.style.fontFamily = storedPref.ParagraphFont,
        paragraphText2.style.fontFamily = storedPref.ParagraphFont,
        linkText.style.fontFamily = storedPref.LinkFont;
        linkText.style.color = storedPref.LinkTextColor;
        linkColPicker.style.backgroundColor = storedPref.LinkTextColor;

    }

    function setUserPreferences()
    {
        let userPrefs = {
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
        userPreferencesObj = userPrefs;
        localStorage.setItem("1", JSON.stringify(userPreferencesObj));

        console.log(userPreferencesObj);
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