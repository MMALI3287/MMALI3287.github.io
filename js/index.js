// Tab switching functionality
function opentab(tabname) {
  const tablinks = document.getElementsByClassName("tab-links");
  const tabcontents = document.getElementsByClassName("tab-contents");

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

  // Add loading state to button
  const submitBtn = form.querySelector("button[type='submit']");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML =
        "Message sent successfully. Thank you for contacting me. I will get back to you soon.";
      setTimeout(function () {
        msg.innerHTML = "";
      }, 5000);
      form.reset();

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    })
    .catch((error) => {
      console.error("Error!", error.message);
      msg.innerHTML = "Oops! Something went wrong. Please try again.";
      msg.style.color = "#ef4444";

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
});

// Preloader
document.addEventListener("DOMContentLoaded", function () {
  // Create preloader element
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.innerHTML = `
    <div class="preloader-content">
      <div class="loader"></div>
      <div class="typing-text">Loading Portfolio...</div>
    </div>
  `;
  document.body.appendChild(preloader);

  // Hide preloader after page loads
  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.style.opacity = "0";
      setTimeout(function () {
        preloader.style.display = "none";
      }, 500);
    }, 500);
  });

  // Initialize AOS with custom settings
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: false,
  });

  // Custom cursor with Kursor.js
  new kursor({
    type: 1,
    color: "#3b82f6",
  });

  // Initialize Locomotive Scroll for smooth scrolling
  const scroll = new LocomotiveScroll({
    el: document.querySelector("body"),
    smooth: true,
    smartphone: { smooth: false },
    tablet: { smooth: false },
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // GSAP animations for header elements
  gsap.from(".header-text", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    delay: 0.5,
  });

  gsap.from(".subheader", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    delay: 0.8,
  });

  gsap.from(".sub", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    delay: 1.1,
  });

  gsap.from(".continuous-learner-badge", {
    duration: 1,
    scale: 0.5,
    opacity: 0,
    ease: "back.out(1.7)",
    delay: 1.4,
  });

  // Skill percentage animation
  const percentages = document.querySelectorAll(".skill-percentage");
  percentages.forEach((element) => {
    let startValue = 0;
    const endValue = parseInt(element.textContent);
    const duration = 2000;

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
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
      },
    });
  });

  // Progress bar animations for skills
  document.querySelectorAll(".skill-box").forEach((box, index) => {
    ScrollTrigger.create({
      trigger: box,
      start: "top 80%",
      onEnter: () => {
        gsap.to(box, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
        });
      },
    });
  });

  // Service cards animation
  gsap.utils.toArray(".service-card").forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      onEnter: () => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: "back.out(1.7)",
        });
      },
    });
  });

  // Project cards staggered animation
  gsap.utils.toArray(".work").forEach((work, i) => {
    ScrollTrigger.create({
      trigger: work,
      start: "top 85%",
      onEnter: () => {
        gsap.to(work, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.15,
          ease: "power2.out",
        });
      },
    });
  });

  // Improved smooth scrolling for anchor links
  document.addEventListener("DOMContentLoaded", function () {
    // Get navbar height for offset calculations
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 100;

    // Add smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Calculate position accounting for navbar
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - navbarHeight - 20;

          // Smooth scroll to target
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // If using GSAP, uncomment this and comment the window.scrollTo above
          /*
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: navbarHeight + 20
            },
            ease: "power3.inOut"
          });
          */
        }
      });
    });
  });

  // Fade in animation for elements as they appear in viewport
  const fadeElements = document.querySelectorAll(".fade-in");
  const scaleElements = document.querySelectorAll(".scale-in");
  const slideLeftElements = document.querySelectorAll(".slide-in-left");
  const slideRightElements = document.querySelectorAll(".slide-in-right");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((el) => observer.observe(el));
  scaleElements.forEach((el) => observer.observe(el));
  slideLeftElements.forEach((el) => observer.observe(el));
  slideRightElements.forEach((el) => observer.observe(el));

  // Add typing effect to subheader
  const text = document.querySelector(".subheader p");
  if (text) {
    const originalText = text.innerText;
    text.innerHTML = "";

    gsap.delayedCall(1.5, () => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < originalText.length) {
          text.innerHTML += originalText.charAt(i);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 100);
    });
  }
});
