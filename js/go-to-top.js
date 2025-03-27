// Go to Top Button Functionality - Professional Version
document.addEventListener("DOMContentLoaded", function () {
  const goToTopButton = document.getElementById("goToTop");
  const progressCircle = document.querySelector(".progress-ring__circle");
  const percentageDisplay = document.querySelector(".scroll-percentage");

  if (!goToTopButton || !progressCircle) {
    console.error("Go to top button or progress circle not found");
    return;
  }

  // Calculate circle properties
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  // Set initial properties
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;

  // Color transition based on scroll percentage
  function getProgressColor(percentage) {
    // Start with blue and transition to green as user scrolls
    if (percentage < 30) {
      return "rgba(59, 130, 246, 0.8)"; // Blue at start
    } else if (percentage < 60) {
      return "rgba(37, 157, 187, 0.8)"; // Blue-green in middle
    } else if (percentage < 90) {
      return "rgba(16, 185, 129, 0.8)"; // Green near end
    } else {
      return "rgba(245, 158, 11, 0.8)"; // Orange at very end
    }
  }

  // Function to update progress circle and percentage
  function setProgress(scrollPercentage) {
    // Round to nearest integer for display
    const roundedPercentage = Math.round(scrollPercentage);

    // Update circle progress
    const offset = circumference - (scrollPercentage / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;

    // Update circle color based on progress
    progressCircle.style.stroke = getProgressColor(scrollPercentage);

    // Update percentage text if it exists
    if (percentageDisplay) {
      percentageDisplay.textContent = `${roundedPercentage}%`;
    }

    // Add a subtle pulse effect when reaching 100%
    if (roundedPercentage >= 98) {
      goToTopButton.classList.add("pulse");
    } else {
      goToTopButton.classList.remove("pulse");
    }
  }

  // Throttle function to limit how often the scroll event fires
  function throttle(callback, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  }

  // Show/hide button and update progress based on scroll position
  const handleScroll = throttle(() => {
    // Calculate scroll percentage
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    // Update progress circle and percentage
    setProgress(scrollPercentage);

    // Show/hide button based on scroll position
    if (scrollTop > 300) {
      if (!goToTopButton.classList.contains("visible")) {
        goToTopButton.classList.add("visible");
      }
    } else {
      if (goToTopButton.classList.contains("visible")) {
        goToTopButton.classList.remove("visible");
      }
    }
  }, 10); // Throttle to every 10ms for smoother performance

  window.addEventListener("scroll", handleScroll);

  // Initial call to set correct state on page load
  handleScroll();

  // Scroll to top when button is clicked with enhanced animation
  goToTopButton.addEventListener("click", () => {
    // Visual feedback on click
    goToTopButton.classList.add("clicked");

    // Smooth scroll to top with GSAP
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: 0, autoKill: false },
      ease: "power3.inOut",
      onComplete: () => {
        // Remove clicked state after animation completes
        setTimeout(() => {
          goToTopButton.classList.remove("clicked");
        }, 300);
      },
    });
  });

  // Add hover effect for desktop devices
  if (!("ontouchstart" in window)) {
    goToTopButton.addEventListener("mouseenter", () => {
      gsap.to(goToTopButton.querySelector("i"), {
        y: -3,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    goToTopButton.addEventListener("mouseleave", () => {
      gsap.to(goToTopButton.querySelector("i"), {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }
});
