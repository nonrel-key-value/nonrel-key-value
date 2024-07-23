const dropdown = document.getElementById('dropdown');
const selectedPreference = document.getElementById('selectedPreference');
const addPreferenceBtn = document.querySelector('add-preference--btn');

const defaultFontSize = 16;
const defaultColor = 'black';

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
