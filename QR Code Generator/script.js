console.log("Code start");

const text = document.querySelector("#url");
const sizes = document.querySelector("#sizes");
const gen = document.querySelector("#gen");
const down = document.querySelector("#down");
const qrimg = document.querySelector(".qr");
const cont = document.querySelector(".container")
let size = sizes.value; // Default size from dropdown

function generateQrcode() {
    qrimg.innerHTML = ""; // Clear previous QR code

    let qr = new QRCode(qrimg, {
        text: text.value.trim(), // Remove extra spaces
        width: parseInt(size), // Convert size to number
        height: parseInt(size),
        colorDark: "#000000",
        colorLight: "#ffffff",
    });

    // Ensure img is captured after QR is generated
    setTimeout(() => {
        let img = qrimg.querySelector("img");
        if (img) {
            imgsrc = img.src;
        }
    }, 500); // Small delay to ensure QR code image is rendered
}

function IsEmptyText() {
    if (text.value.trim().length > 0) {
        generateQrcode();
    } else {
        alert("Please Enter some text or URL");
    }
}

gen.addEventListener("click", (e) => {
    e.preventDefault();
    IsEmptyText();
});

sizes.addEventListener("change", (e) => {
    size = e.target.value;
    IsEmptyText();
});

down.addEventListener("click", () => {
    let img = qrimg.querySelector("img"); // Fetch the image dynamically
    if (img) {
        down.setAttribute("href", img.src);
        down.setAttribute("download", "qrcode.png");
    } else {
        alert("Generate QR before downloading");
    }
});
