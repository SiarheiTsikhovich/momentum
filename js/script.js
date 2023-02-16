
// Clocks

const time = document.querySelector('.time');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
}
showTime();

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


