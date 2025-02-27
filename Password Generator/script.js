console.log("Code start");

let small = "abcdefghijklmnopqrstuvwxyz";
let capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "1234567890";
let special = "!#$%&*+,-./:;<=>?@[]^_"; // Fixed syntax error

let slider = document.getElementById("plength");
const passDisplay = document.querySelector(".psln");
let pass = document.querySelector(".pass");
passDisplay.innerHTML = slider.value;

// Update password length display on slider change
slider.addEventListener("input", () => {
    passDisplay.innerHTML = slider.value;
});

// Select all checkboxes correctly
let checkboxElements = document.querySelectorAll('.tickbox input[type="checkbox"]');
let chkBxColn = {};

// Ensure each checkbox is properly stored in the object
checkboxElements.forEach(cb => {
    chkBxColn[cb.id] = cb;
});



let button = document.querySelector(".genbtn");
button.addEventListener("click", () => {
    pass.innerHTML = GeneratePassword();
});

function GeneratePassword() {
    let Genpass = "";
    let allchar = "";

    if (chkBxColn.small && chkBxColn.small.checked) allchar += small;
    if (chkBxColn.capital && chkBxColn.capital.checked) allchar += capital;
    if (chkBxColn.numbers && chkBxColn.numbers.checked) allchar += numbers;
    if (chkBxColn.special && chkBxColn.special.checked) allchar += special;

    if (allchar.length === 0) {
        let error = alert('Please select at least one character type!');

        return error;
    }

    for (let i = 0; i < slider.value; i++) {
        let randomIndex = Math.floor(Math.random() * allchar.length);
        Genpass += allchar.charAt(randomIndex);
    }
    copyicon.src = "copy.png"

    return Genpass;
}
let copyicon = document.querySelector("#copy");
console.log(copyicon);



copyicon.addEventListener("click", () => {

    if (pass.innerHTML != "" || pass.innerHTML.length <= 1) {
        navigator.clipboard.writeText(pass.innerHTML);
        copyicon.src = "check.png"
        setTimeout(() => {
            copyicon.src = ""
        }, 3000)
    }



})
