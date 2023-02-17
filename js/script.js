
// time, Date, Greeting

// window.onload = function () {
//     window.setInterval(function showTime() {
//         const date = new Date()
//         const hours = date.getHours()
//         const minutes = date.getMinutes()
//         const seconds = date.getSeconds()
//         const clock = hours + ":" + minutes + ":" + seconds;
//         time.textContent = clock;
//     }
//     );
// };

const dateCalendar = document.querySelector('.date');

function showDate() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString('en-Br', options);
    dateCalendar.textContent = currentDate;
}

const greeting = document.querySelector('.greeting');

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 6 && hours < 12) {
        return 'morning';
    } else if (hours >= 12 && hours < 18) {
        return 'afternoon';
    } else if (hours >= 18 && hours < 24) {
        return 'evening';
    } else if (hours >= 0 && hours < 6) {
        return 'night';
    }
}

const timeOfDay = getTimeOfDay()

function showGreeting() {
    const greetingText = `Good ${timeOfDay}`
    greeting.textContent = greetingText;
}


const time = document.querySelector('.time');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate()
    showGreeting()
    setTimeout(showTime, 1000);
}
showTime();

//Name

const inputName = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', inputName.value)
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        inputName.value = localStorage.getItem('name')
    }
}
window.addEventListener('load', getLocalStorage);




