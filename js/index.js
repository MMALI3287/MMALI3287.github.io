let tablinks = document.getElementsByClassName("tab-links");
let tabcontents = document.getElementsByClassName("tab-contents");

// Tab switching functionality
function opentab(tabname) {
  for (let tablink of tablinks) tablink.classList.remove("active-link");
  for (let tabcontent of tabcontents) tabcontent.classList.remove("active-tab");
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// Mobile menu control
let sidemenu = document.getElementById("sidemenu");
function openmenu() {
  sidemenu.style.right = "0";
}
function closemenu() {
  sidemenu.style.right = "-200px";
}

// Contact form submission
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

// Initialize AOS with custom settings
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: false,
  });

  // Skill percentage animation
  const percentages = document.querySelectorAll(".skill-percentage");
  percentages.forEach((element) => {
    let startValue = 0;
    const endValue = parseInt(element.textContent);
    const duration = 2000;
    const startTime = new Date().getTime();

    const animateCount = () => {
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const value = Math.floor(progress * endValue);

      element.textContent = value + "%";

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    animateCount();
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });
});
