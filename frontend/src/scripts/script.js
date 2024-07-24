import {ApiHelper } from "./apiHelper.js";

const baseURL = "https://api.karle.co.za/";
const apiHelper = new ApiHelper(baseURL);


const dropdown = document.getElementById('dropdown');
const selectedPreference = document.getElementById('selectedPreference');
const addPreferenceBtn = document.querySelector('add-preference--btn');

const defaultFontSize = 16;
const defaultColor = 'black';

const colourPicker1 = document.getElementById("inputColour1");
const colourPicker2 = document.getElementById("inputColour2");
const colourPicker3 = document.getElementById("inputColour3");
const colourPicker4 = document.getElementById("inputColour4");
const colourPicker5 = document.getElementById("inputColour5");
const colourPicker6 = document.getElementById("inputColour6");
const colourPicker7 = document.getElementById("inputColour7");

const headingSize1 = document.getElementById("headingSize1");
const headingSize2 = document.getElementById("headingSize2");
const headingSize3 = document.getElementById("headingSize3");
const headingSize4 = document.getElementById("headingSize4");
const headingSize5 = document.getElementById("headingSize5");

const paragraphArticle = document.getElementById("paragraphArticle");
const linkText = document.getElementById("linkText");

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

paragraphSizeInput.addEventListener("change",changeParagraphSize);

linkSizeInput.addEventListener("change",changeLinkSize);
healthCheck();


document.addEventListener('DOMContentLoaded', () => {
    checkLoggedIn();

    document.body.style.fontSize = defaultFontSize;
    document.body.style.color = defaultColor;

    const options = ['Preference1', 'Preference2', 'Preference3']; //Get from backend

    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        dropdown.appendChild(option);
    });

    switchPreference(dropdown.value);

    // dropdown.addEventListener('change', (event) => {
    //     switchPreference(event.target.value);
    // });

});

 addPreferenceBtn.onclick = () => {
     // Backend call to add preference
     console.log('clicked');
 }

function switchPreference(value) {
    console.log("preference switched to: " + value);
    // Set content based on value
    // selectedPreference.textContent = `Selected preference is: ${value}`;
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