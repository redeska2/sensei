// Gmail Validation

function isValidEmail(email)
{
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
}
const emailInput = document.querySelector("#emailInput");
const form = document.querySelector(".form_gmail");

form.addEventListener("submit", function (event)
{
    event.preventDefault();

    const email = emailInput.value;

    if (isValidEmail(email)) {
        alert("Email принят: валидный Gmail-адрес.");
    } else {
        alert("Email не принят: недопустимый Gmail-адрес.");
    }
});

const small = document.querySelector(".small");

let posX = 0;
let posY = 0;
let chek = false;
let chekup = false;

const move = () => {
  if (posX <= 440 && chek === false) {
    posX += 10;
    small.style.left = `${posX}px`;
    setTimeout(move, 40);
  } else if (posX >= 440 && posY <= 440) {
    posY += 10;
    small.style.top = `${posY}px`;
    setTimeout(move, 40);
  } else if (posX > 0 && posY >= 440) {
    chek = true;
    posX -= 10;
    small.style.left = `${posX}px`;
    setTimeout(move, 40);
  } else if (chekup === false && posY > 0) {
    if (posY === 10) chek = false;
    posY -= 10;
    small.style.top = `${posY}px`;
    setTimeout(move, 40);
  }
};

move();
// секундомер
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('ml-seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let startTime;
let elapsedTime = 0;
let timerInterval;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function displayTime() {
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  minutesDisplay.style.color = getRandomColor();
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
  secondsDisplay.style.color = getRandomColor();
  millisecondsDisplay.textContent = String(milliseconds).padStart(2, '0');
  millisecondsDisplay.style.color = getRandomColor();
}

startButton.addEventListener('click', function() {
  if (!startTime) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function() {
      elapsedTime = Date.now() - startTime;
      displayTime();
    }, 10);
  }
});

stopButton.addEventListener('click', function() {
  if (startTime) {
    clearInterval(timerInterval);
    startTime = null;
  }
});

resetButton.addEventListener('click', function() {
  clearInterval(timerInterval);
  startTime = null;
  elapsedTime = 0;
  displayTime();
});

// обменник
document.addEventListener('DOMContentLoaded', () => {
  const inputAmounts = document.querySelectorAll('.css');
  let currencyRates;

  // Загрузка курсов обмена из JSON файла через XHR
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './/home_works.json');
  xhr.onload = () => { 
    if (xhr.status === 200) {
      currencyRates = JSON.parse(xhr.responseText);
      // Теперь, когда данные из файла успешно загружены, мы можем начать слушать события ввода
      inputAmounts.forEach((input) => {
        input.addEventListener('input', () => {
          handleCurrencyConversion(input);
        });
      });
    } else {
      console.error('Ошибка загрузки JSON файла:', xhr.status);
    }
  };
  xhr.onerror = () => {
    console.error('Ошибка загрузки JSON файла');
  };
  xhr.send();

  function handleCurrencyConversion(fromInput) {
    const amount = parseFloat(fromInput.value);
    if (isNaN(amount)) {
      resetOtherInputs(fromInput);
      return;
    }

    const baseCurrency = fromInput.dataset.target;
    inputAmounts.forEach((input) => {
      if (input !== fromInput) {
        const targetCurrency = input.dataset.target;
        const convertedAmount = amount * currencyRates[targetCurrency] / currencyRates[baseCurrency];
        input.value = convertedAmount.toFixed(2);
      }
    });
  }

  function resetOtherInputs(excludedInput) {
    inputAmounts.forEach((input) => {
      if (input !== excludedInput) {
        input.value = '';
      }
    });
  }
});
