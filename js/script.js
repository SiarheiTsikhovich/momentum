// time and Date

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

const time = document.querySelector('.time');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate()
}
showTime();




