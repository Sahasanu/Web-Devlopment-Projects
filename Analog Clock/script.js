let hr = document.querySelector("#hour")
let min = document.querySelector("#min")
let sec = document.querySelector("#sec");



setInterval(()=> {
    let date = new Date();

    // getting the hours minutes and seconds
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    let hrotation = (30 * h) + (m * 1 / 2);
    let mrotation = 6 * m;
    let srotation = 6 * s;

    hr.style.transform = `rotate(${hrotation}deg)`;
    min.style.transform = `rotate(${mrotation}deg)`;
    sec.style.transform = `rotate(${srotation}deg)`;

}, 1000);