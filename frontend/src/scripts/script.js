import {ApiHelper } from "./apiHelper.js";

const baseURL = "https://api.karle.co.za/";
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

const savePrefs = document.getElementById("savePrefs");



const paragraphArticle = document.getElementById("paragraphArticle");
const linkText = document.getElementById("linkText");

const paragraphText = document.getElementById("pText");

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

savePrefs.addEventListener("click", setUserPreferences);

paragraphSizeInput.addEventListener("change",changeParagraphSize);

linkSizeInput.addEventListener("change",changeLinkSize);
//healthCheck();

function what()
{
    console.log("the fuck");
}

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

    switchPreference(dropdown.value);

    // dropdown.addEventListener('change', (event) => {
    //     switchPreference(event.target.value);
    // });

    changeHeadingFont(headingFontDropdown.value);
    changeParagraphFont(paragraphFontDropdown.value);
    changeLinkFont(linkFontDropdown.value);

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
    //BACKEND CALL TO DELETE (refresh selected preference)
    confirmDeleteDialog.style.visibility = 'hidden';
    main.classList.remove('blur');
}

 addPreferenceBtn.onclick = () => {
    // GET ID OF NEXT PREFERENCE
    nextPreferenceId.textContent = '5';
    addPreferenceDialog.style.visibility = 'visible';
    main.classList.add('blur');
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
        console.log(userPreferencesObj);
    }