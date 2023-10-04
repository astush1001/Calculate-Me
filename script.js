let calculationString = "";
let calculationHistory = []; // To store the calculation history
const maxHistoryItems = 8;


 //dark theme functionality:
        var icon=document.getElementById("icon");
        icon.onclick=function(){
            document.body.classList.toggle("dark-theme");
            if(document.body.classList.contains("dark-theme")){
                icon.src="images/sun.png";
            }
            else {icon.src="images/moon.png";}
        }


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
    historyList.innerHTML = " "; // Clear the existing list

    calculationHistory.forEach((calculation) => {
        const listItem = document.createElement('li');
        listItem.textContent = calculation;
        historyList.appendChild(listItem);
    });
}

function clearHistory() {
    localStorage.removeItem('calculationHistory')
    document.getElementById('history-list').innerHTML = "";// Clear the existing history
}

let buttons = document.querySelectorAll('.button');
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            let input = document.querySelector('.input')
            calculationString = input.value;
            try{
                let result = eval(calculationString);

                calculationHistory.push(`${calculationString} = ${result}`);
                calculationString = result.toString();

                updateInputAndHistory();
            }
            catch(e){
                input.value="";
                input.classList.add('shake'); // Add shake animation class
                setTimeout(() => {
                    input.classList.remove('shake'); // Remove shake animation class after animation
                }, 500);
            }


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

let input = document.getElementsByClassName('input')[0];
input.addEventListener('keydown', function(e) {
    if(!isValid(e.key)) {
        input.classList.add('shake'); // Add shake animation class
        setTimeout(() => {
            input.classList.remove('shake'); // Remove shake animation class after animation
        }, 500);
      e.preventDefault();
    }
  });
  
  function isValid(key) {
    return !isNaN(parseFloat(key)) || ['+', '-', '*', '/', '=', 'Enter', 'Backspace','.'].includes(key);
    }
