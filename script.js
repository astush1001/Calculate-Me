let calculationString = "";
let calculationHistory = []; // To store the calculation history

// Function to update the input field and store history
function updateInputAndHistory() {
    document.querySelector('input').value = calculationString;
    localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
    updateHistoryList(); // Update the history list
}

// Load calculation history from local storage if it exists
const savedCalculationHistory = localStorage.getItem('calculationHistory');
if (savedCalculationHistory) {
    calculationHistory = JSON.parse(savedCalculationHistory);
    updateHistoryList(); // Update the history list when the page loads
}
function updateHistoryList() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ""; // Clear the existing list

    calculationHistory.forEach((calculation) => {
        const listItem = document.createElement('li');
        listItem.textContent = calculation;
        historyList.appendChild(listItem);
    });
}

let buttons = document.querySelectorAll('.button');
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {

            let result = eval(calculationString);

            calculationHistory.push(`${calculationString} = ${result}`);
            calculationString = result.toString();

            updateInputAndHistory();
        } else if (e.target.innerHTML == 'C') {
            calculationString = "";
            updateInputAndHistory();
        } else if (e.target.innerHTML == 'Bksp') {
            calculationString = calculationString.slice(0, calculationString.length - 1);
            updateInputAndHistory();
        } else {
            calculationString += e.target.innerHTML;
            updateInputAndHistory();
        }
    });
});