const messages = [
  "Come on, you know you want to!",
  "Don't be shy, just say yes!",
  "You know it's the right choice 😉",
  "Is this your way of playing hard to get?",
  "What’s the harm in saying yes? ❤️",
  "Oh, you’re gonna make me beg, huh?",
  "You’ll regret saying no 😏",
  "Just say yes, and I’ll be your Valentine forever 😘",
  "Are you saying no, or just teasing me? 😜",
  "I know you like me, so just say yes already 😍",
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
  const yesButton = document.querySelector(".yes-button");
  moveNoButton();
  document.querySelector(".no-button").textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;

  const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
  yesButton.style.fontSize = `${currentSize * 1.2}px`;

  yesButton.style.color = `rgb(${Math.random() * 255}, ${
    Math.random() * 255
  }, ${Math.random() * 255})`;
}

function handleYesClick() {
  alert("THANK YOUUUU!!! Pookieeee ❤️❤️❤️");

  let count = 200;
  let defaults = {
    origin: { y: 0.7 },
    spread: 360,
    ticks: 100,
    zIndex: 9999,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });

  let flashInterval = setInterval(() => {
    document.body.style.backgroundColor = `rgb(${Math.random() * 255}, ${
      Math.random() * 255
    }, ${Math.random() * 255})`;
  }, 100);

  setTimeout(() => {
    clearInterval(flashInterval);
    document.body.style.backgroundColor = "";
  }, 2000);

  const yaySound = new Audio("yay.mp3");
  yaySound.play();

  setTimeout(() => {
    window.location.href = "yes_page.html";
  }, 2000);
}
