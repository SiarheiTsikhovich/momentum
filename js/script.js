
// time, Date, Greeting

const dateCalendar = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const time = document.querySelector('.time');

function showDate() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString('en-Br', options);
    dateCalendar.textContent = currentDate;
}


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



function showGreeting() {
    const greetingText = `Good ${getTimeOfDay()}`
    greeting.textContent = greetingText;
}


//Name

const inputName = document.querySelector('.name');

function setLocalStorageName() {
    localStorage.setItem('name', inputName.value)
}
window.addEventListener('beforeunload', setLocalStorageName);

function getLocalStorageName() {
    if (localStorage.getItem('name')) {
        inputName.value = localStorage.getItem('name')
    }
}
window.addEventListener('load', getLocalStorageName);

//Slider


const body = document.body;
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let randomNum = getRandomNum()


function getRandomNum() {
    min = Math.ceil(1);
    max = Math.floor(20);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function setBg() {
    const timeOfDay = getTimeOfDay();
    const bgNum = String(randomNum).padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/SiarheiTsikhovich/momentum-images/master/images/${timeOfDay}/${bgNum}.webp`;
    img.addEventListener('load', () => {
        body.style.backgroundImage = `url(https://raw.githubusercontent.com/SiarheiTsikhovich/momentum-images/master/images/${timeOfDay}/${bgNum}.webp)`;
    })
}
setBg();


function getSlideNext() {
    if (randomNum <= 19) {
        randomNum++;
    } else {
        randomNum = 1;
    }
    setBg();
}


function getSlidePrev() {
    if (randomNum > 1) {
        randomNum--;
    } else {
        randomNum = 20;
    }
    setBg();
}


slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setBg();
    setTimeout(showTime, 1000);
}
showTime();

//Weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');


async function getWeather() {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=4f507497abe32c4725805a4e97ff125c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok) {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${data.wind.speed}m/s`
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
    }
    else {
        alert('city not found');
    }
}


function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
        city.blur();
    }
};
// document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);



function setLocalStorageCity() {
    localStorage.setItem('city', city.value)
}
window.addEventListener('beforeunload', setLocalStorageCity);


function getLocalStorageCity() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city')
    } else { city.value = 'Minsk' }
    getWeather(city.value)
}
window.addEventListener('load', getLocalStorageCity);


