// This file contains advanced animation and interactive elements
// for the portfolio website

document.addEventListener("DOMContentLoaded", function () {
  // ScrollTrigger for GSAP
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Skill progress circles
  function initializeProgressCircles() {
    // Dynamically create skill circles
    const skills = [
      { name: "Frontend", value: 0.85, color: "#3b82f6" },
      { name: "Backend", value: 0.78, color: "#10b981" },
      { name: "Mobile", value: 0.83, color: "#f59e0b" },
      { name: "Game Dev", value: 0.76, color: "#ef4444" },
    ];

    const container = document.querySelector("#capsule");
    if (!container) return;

    // Add title
    const title = document.createElement("h3");
    title.className = "text-light mb-4 skills-title";
    title.innerText = "Core Competencies";
    container.appendChild(title);

    // Add grid for circles
    const circleGrid = document.createElement("div");
    circleGrid.className = "progress-grid";
    container.appendChild(circleGrid);

    // Create each skill circle
    skills.forEach((skill) => {
      const skillContainer = document.createElement("div");
      skillContainer.className = "skill-circle-container";

      const circleContainer = document.createElement("div");
      circleContainer.className = "circle-container";
      circleContainer.id = `circle-${skill.name
        .toLowerCase()
        .replace(" ", "-")}`;

      const skillName = document.createElement("p");
      skillName.className = "skill-name";
      skillName.innerText = skill.name;

      skillContainer.appendChild(circleContainer);
      skillContainer.appendChild(skillName);
      circleGrid.appendChild(skillContainer);

      // Initialize progress circle
      const circle = new ProgressBar.Circle(
        `#circle-${skill.name.toLowerCase().replace(" ", "-")}`,
        {
          color: skill.color,
          strokeWidth: 8,
          trailWidth: 8,
          trailColor: "rgba(255,255,255,0.1)",
          easing: "easeInOut",
          duration: 1500,
          text: {
            value: "0%",
            className: "progress-text",
            style: {
              color: "#fff",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "1.5rem",
              fontWeight: "600",
            },
          },
          step: function (state, circle) {
            const value = Math.round(circle.value() * 100);
            circle.setText(`${value}%`);
          },
        }
      );

      // Animate when scrolled into view
      ScrollTrigger.create({
        trigger: circleContainer,
        start: "top 80%",
        onEnter: () => {
          circle.animate(skill.value);
        },
      });
    });
  }

  // Parallax effect on header
  function initializeParallax() {
    const headerElement = document.querySelector("#header");
    if (!headerElement) return;

    window.addEventListener("scroll", function () {
      const scrollPosition = window.pageYOffset;
      headerElement.style.backgroundPositionY = scrollPosition * 0.5 + "px";
    });
  }

  // 3D hover effect on project cards
  function initialize3DHover() {
    document.querySelectorAll(".work").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleY = (x - centerX) / 15;
        const angleX = (centerY - y) / 15;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      });
    });
  }

  // Magnetic effect on buttons
  function initializeMagneticButtons() {
    const buttons = document.querySelectorAll(".btnc, .git");

    buttons.forEach((button) => {
      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const buttonX = rect.left + rect.width / 2;
        const buttonY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const deltaX = mouseX - buttonX;
        const deltaY = mouseY - buttonY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 50;

        if (distance < maxDistance) {
          const moveX = deltaX * 0.3;
          const moveY = deltaY * 0.3;

          button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0)";
      });
    });
  }

  // Text scramble effect
  function initializeTextScramble() {
    class TextScramble {
      constructor(el) {
        this.el = el;
        this.chars = "!<>-_\\/[]{}—=+*^?#________";
        this.update = this.update.bind(this);
      }

      setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];

        for (let i = 0; i < length; i++) {
          const from = oldText[i] || "";
          const to = newText[i] || "";
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }

      update() {
        let output = "";
        let complete = 0;

        for (let i = 0; i < this.queue.length; i++) {
          let { from, to, start, end, char } = this.queue[i];

          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar();
              this.queue[i].char = char;
            }
            output += `<span class="text-scramble-char">${char}</span>`;
          } else {
            output += from;
          }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }

      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    }

    const subtitleElement = document.querySelector(
      ".continuous-learner-badge span"
    );
    if (!subtitleElement) return;

    const phrases = [
      "Continuous Learner",
      "Always Improving",
      "Problem Solver",
      "Innovative Thinker",
      "Code Enthusiast",
    ];

    const fx = new TextScramble(subtitleElement);
    let counter = 0;

    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 3000);
      });
      counter = (counter + 1) % phrases.length;
    };

    // Start after 5 seconds to allow initial page animations to complete
    setTimeout(next, 5000);
  }

  // Floating elements animation
  function initializeFloatingElements() {
    const elements = document.querySelectorAll(
      ".skill-box img, .social-icons a"
    );

    elements.forEach((el, index) => {
      gsap.to(el, {
        y: index % 2 === 0 ? "10" : "-10",
        duration: 2 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }

  // Initialize all features
  initializeProgressCircles();
  initializeParallax();
  initialize3DHover();
  initializeMagneticButtons();
  initializeTextScramble();
  initializeFloatingElements();

  // Add additional CSS for new elements
  const dynamicStyles = document.createElement("style");
  dynamicStyles.textContent = `
    .progress-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
      padding: 1rem;
    }
    
    .skill-circle-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .circle-container {
      width: 120px;
      height: 120px;
      position: relative;
    }
    
    .skills-title {
      font-family: var(--font-heading);
      text-align: center;
      margin-bottom: 2rem;
      position: relative;
      display: inline-block;
    }
    
    .skills-title::after {
      content: '';
      position: absolute;
      width: 50px;
      height: 3px;
      background-color: var(--secondary-color);
      bottom: -10px;
      left: 0;
    }
    
    .skill-name {
      color: white;
      margin-top: 15px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    
    .text-scramble-char {
      display: inline-block;
      color: var(--accent-color);
    }
    
    @media only screen and (max-width: 768px) {
      .progress-grid {
        grid-template-columns: 1fr;
      }
      
      .circle-container {
        width: 100px;
        height: 100px;
      }
    }
  `;
  document.head.appendChild(dynamicStyles);
});
