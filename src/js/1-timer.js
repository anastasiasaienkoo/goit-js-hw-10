import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";

import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";

const datapicker = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const daysEL = document.querySelector('[data-days]');
const hoursEL = document.querySelector('[data-hours]');
const minutesEL = document.querySelector('[data-minutes]');
const secondsEL = document.querySelector('[data-seconds]');


let userSelectedDate = null;
let timerInterval = null;
button.disabled = true;


const options = {
    enableTime: true, //Включает выбор времени
    time_24hr: true, //При включении отображает выбор времени в 24-часовом режиме без выбора AM/PM.
    defaultDate: new Date(
    ), //Устанавливает начальную выбранную дату(ы). Если вы используете mode: "multiple"календарь диапазона, укажите Arrayобъекты Dateили массив строк дат, которые следуют за вашим dateFormat. В противном случае вы можете предоставить один объект Date или строку даты.
    minuteIncrement: 1, //Регулирует шаг ввода часов (включая прокрутку)
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0].getTime();
        const currentData = new Date().getTime();
      console.log(selectedDates[0]);
    
      if(userSelectedDate < currentData) {
        iziToast.show({
            message: 'Please choose a date in the future',
            iconUrl: 'https://symbl-world.akamaized.net/i/webp/c1/d9d88630432cf61ad335df98ce37d6.webp',
            messageSize: '16',
            messageColor: 'white',
            backgroundColor: '#EF4040',
            position: 'topRight',
            width: '302',
            color: 'white',
        });
        button.disabled = true;
    } else {
        button.disabled = false;
      }
    },
};


flatpickr(datapicker, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function updatesNum({ days, hours, minutes, seconds }) {
    daysEL.textContent = String(days).padStart(2, '0');
    hoursEL.textContent = String(hours).padStart(2, '0');
    minutesEL.textContent = String(minutes).padStart(2, '0');
    secondsEL.textContent = String(seconds).padStart(2, '0');
}


button.addEventListener('click', (event) => {
    button.disabled = true;
    datapicker.disabled = true;

    timerInterval = setInterval(() =>{
        
        const currentData = new Date().getTime();
        const timeout = userSelectedDate - currentData;
        updatesNum(convertMs(timeout));
    
        if(timeout <= 0) {
            clearInterval(timerInterval);
            daysEL.textContent = '00';
            hoursEL.textContent = '00';
            minutesEL.textContent = '00';
            secondsEL.textContent = '00';
            return;
        }
    }, 1000);
      
})


