const messages = [
  "Are you sure?",
  "Really sure??",
  "Are you positive?",
  "Pookie please...",
  "Just think about it!",
  "If you say no, I will be really sad...",
  "I will be very sad...",
  "I will be very very very sad...",
  "Ok fine, I will stop asking...",
  "Just kidding, say yes please! ❤️",
];

let messageIndex = 0;

function moveNoButton() {
  const noButton = document.querySelector(".no-button");
  const randomX = Math.random() * window.innerWidth * 0.7;
  const randomY = Math.random() * window.innerHeight * 0.7;
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

function handleNoClick() {
  const noButton = document.querySelector(".no-button");
  const yesButton = document.querySelector(".yes-button");
  moveNoButton();
  document.querySelector(".no-button").textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;

  // Grow Yes button
  const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
  yesButton.style.fontSize = `${currentSize * 1.2}px`;

  // Change text color randomly
  yesButton.style.color = `rgb(${Math.random() * 255}, ${
    Math.random() * 255
  }, ${Math.random() * 255})`;
}

function handleYesClick() {
  alert("THANK YOUUUU!!! Pookieeee ❤️❤️❤️");

  // Crazy confetti
  let count = 200;
  let defaults = {
    origin: { y: 0.7 },
    spread: 360,
    ticks: 100,
    zIndex: 9999,
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });

  // Flashy Background Effect
  let flashInterval = setInterval(() => {
    document.body.style.backgroundColor = `rgb(${Math.random() * 255}, ${
      Math.random() * 255
    }, ${Math.random() * 255})`;
  }, 100);

  setTimeout(() => {
    clearInterval(flashInterval);
    document.body.style.backgroundColor = "";
  }, 2000);

  // Play Sound
  const yaySound = new Audio("yay.mp3");
  yaySound.play();

  setTimeout(() => {
    window.location.href = "yes_page.html";
  }, 2000);
}
