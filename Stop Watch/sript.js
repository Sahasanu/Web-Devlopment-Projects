//Geting elements by querySelector and storing it in variable
let reset = document.querySelector("#reset");
let stop = document.querySelector("#stop");
let start = document.querySelector("#start");
let display = document.querySelector(".display");

// Declaring default values 
let msec = 0;
let sec = 0;
let min = 0;
let timerId = null;

//function to start timerr 
function startTimer() {
    msec++;

    if (msec === 100) {
        msec = 0;
        sec++;
    }

    if (sec === 60) {
        sec = 0;
        min++;
    }

    //formating the msec,sec,min .Only two digit
    let minString = String(min).padStart(2, '0');
    let secString = String(sec).padStart(2, '0');
    let msecString = String(msec).padStart(2, '0');

    // displying the current time of timer
    display.innerHTML = `${minString} : ${secString} : ${msecString}`;
}

//adding event listner and related function
start.addEventListener("click", function () {
    if (timerId === null) {
        timerId = setInterval(startTimer, 10);


    }
});

stop.addEventListener("click", () => {
    clearInterval(timerId);
    timerId = null;
});

reset.addEventListener("click", () => {
    clearInterval(timerId);
    timerId = null;
    display.innerHTML = `00 : 00 : 00`;
    min = sec = msec = 0;
});
