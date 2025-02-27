
let input = document.getElementById("input");
let buttons = document.querySelectorAll("button")
let string = "";

let btnarr = Array.from(buttons);

btnarr.forEach(button => {
    button.addEventListener("click", (e) => {
        let inp = e.target.innerHTML

        switch (inp) {
            case "=":
                string = string.replace(/×/g, "*").replace(/÷/g, "/");
                string = eval(string)
                input.value = string;
                break;
            case "⌫":
                string = string.substring(0, string.length - 1)
                input.value = string;
                break;
            case "AC":
                string = ""
                input.value = string;
                break;
            default:
                string += e.target.innerHTML;
                input.value = string;
                break;
        }
       

    })
});
