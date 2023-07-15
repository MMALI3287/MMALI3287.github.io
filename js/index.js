let tablinks = document.getElementsByClassName("tab-links");
let tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname) {
  for (let tablink of tablinks) tablink.classList.remove("active-link");
  for (let tabcontent of tabcontents) tabcontent.classList.remove("active-tab");
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

let sidemenu = document.getElementById("sidemenu");
function openmenu() {
  sidemenu.style.right = "0";
}
function closemenu() {
  sidemenu.style.right = "-200px";
}

const scriptURL =
  "https://script.google.com/macros/s/AKfycbweIFA406kLCn8JOrIW-5p-dtJ7j9e8FbQg1LLUW5Mk5p9cZg4kpXwc1kParYo2nA4j/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML =
        "Message sent successfully. Thank you for contacting me. I will get back to you soon.";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});