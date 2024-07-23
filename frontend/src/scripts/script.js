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

colourPicker1.addEventListener("change",changeColour);
colourPicker2.addEventListener("change",changeColour);
colourPicker3.addEventListener("change",changeColour);
colourPicker4.addEventListener("change",changeColour);
colourPicker5.addEventListener("change",changeColour);
colourPicker6.addEventListener("change",changeColour);
colourPicker7.addEventListener("change",changeColour);


document.addEventListener('DOMContentLoaded', () => {
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

    dropdown.addEventListener('change', (event) => {
        switchPreference(event.target.value);
    });

});

addPreferenceBtn.onclick = () => {
    // Backend call to add preference
    console.log('clicked');
}

function switchPreference(value) {
    // Set content based on value
    selectedPreference.textContent = `Selected preference is: ${value}`;
}

function changeColour(event)
{
    console.log(event);
    console.log(event.target.value);
    event.target.parentNode.style.backgroundColor = event.target.value;
}
