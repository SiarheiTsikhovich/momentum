//Global variables
'use strict';
import playList from './playList.js';

const body = document.body;

//date, time, greeting variables
const dateCalendar = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const time = document.querySelector('.time');

//name, slider variables
const inputName = document.querySelector('.name');
const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')
let randomNum = getRandomNum(1, 20)

//weather variables
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');

//quote variables
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteBtn = document.querySelector('.change-quote');

//player variables
const playPrevBtn = document.querySelector('.play-prev');
const playStopBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
let playNum = 0;
let isPlay = false;



// time, Date, Greeting



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



function getRandomNum(min, max) {
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



//Quotes



async function getQuotes() {
    const randomIndex = getRandomNum(1, 20)
    const quotes = '../data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = data[randomIndex].text;
    author.textContent = data[randomIndex].author;
}
getQuotes();


quoteBtn.addEventListener('click', getQuotes);



//Audioplayer



const audio = new Audio();


function addPlayTrack() {
    let nameTrack = "";
    for (let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        nameTrack = playList[i].title;
        li.textContent = nameTrack;
        li.classList.add('play-item');
        playListContainer.append(li);
    }
}
addPlayTrack();


const allLi = document.querySelectorAll('.play-item')
const playTrackNow = Array.from(allLi);


function playAudio() {
    audio.src = playList[playNum].src
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    for (let i = 0; i <= playTrackNow.length - 1; i++) {
        if (i == playNum) {
            playTrackNow[i].classList.add('item-active');
        } else {
            playTrackNow[i].classList.remove('item-active');
        }
    }
}


function pauseAudio() {
    audio.pause();
    isPlay = false;
}


function audioPlay() {
    if (!isPlay) {
        playAudio()
    } else {
        pauseAudio()
    }
}


function toggleBtn() {
    if (isPlay) {
        playStopBtn.classList.add('pause');
    } else {
        playStopBtn.classList.remove('pause');
    }
}


function playNext() {
    if (playNum < (playList.length - 1)) {
        playNum++
    } else {
        playNum = 0;
    }
    playStopBtn.classList.add('pause');
    playAudio()
}


function playPrev() {
    if (playNum > 0) {
        playNum--
    } else {
        playNum = 3;
    }
    playAudio()
    playStopBtn.classList.add('pause');
}


playStopBtn.addEventListener('click', audioPlay);
playStopBtn.addEventListener('click', toggleBtn);
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);
audio.addEventListener('ended', playNext);

