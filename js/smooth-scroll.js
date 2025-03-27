document.addEventListener("DOMContentLoaded", function () {
  // Get all navigation links (both in navbar and footer)
  const navLinks = document.querySelectorAll(
    ".navbar-nav .nav-link, .footer-section a.footer-link"
  );

  // Add click event listener to each navigation link
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Get the href attribute
      const targetId = this.getAttribute("href");

      // Only proceed if it's a section link (starts with #)
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault(); // Prevent default anchor behavior

        // Get the target section
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        // Get navbar height for offset calculations
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 100;

        // Refresh AOS animations
        refreshAOSAnimations(targetSection);

        // Add a small visual feedback when clicked
        link.classList.add("clicked");
        setTimeout(() => {
          link.classList.remove("clicked");
        }, 500);

        // First, allow any animations or content to load by waiting a brief moment
        setTimeout(() => {
          // Get the updated position of the element after animations might have affected layout
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - navbarHeight - 20;

          // Scroll to the section with animation using GSAP
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: offsetPosition,
              autoKill: false, // Prevents interference from other scroll events
            },
            ease: "power2.inOut",
            onUpdate: function () {
              // Force AOS to recalculate
              if (typeof AOS !== "undefined") {
                AOS.refresh();
              }
            },
            onComplete: function () {
              // After scrolling is complete, make final adjustment if needed
              setTimeout(() => {
                const finalPosition = targetSection.getBoundingClientRect().top;
                if (Math.abs(finalPosition - navbarHeight - 20) > 5) {
                  // If position is still off by more than 5px, do a final adjustment
                  window.scrollBy({
                    top: finalPosition - navbarHeight - 20,
                    behavior: "smooth",
                  });
                }

                // Add professional highlight effect to the section
                targetSection.classList.add("section-highlight");

                // Animate section title if present
                const sectionTitle = targetSection.querySelector(".sub-title");
                if (sectionTitle) {
                  gsap.fromTo(
                    sectionTitle,
                    { scale: 0.98, opacity: 0.9 },
                    {
                      scale: 1,
                      opacity: 1,
                      duration: 0.7,
                      ease: "back.out(1.2)",
                    }
                  );
                }

                // Remove the highlight class after it completes
                setTimeout(() => {
                  targetSection.classList.remove("section-highlight");
                }, 1500);
              }, 100);
            },
          });
        }, 50); // Short delay to let the page update first
      }
    });
  });

  // Function to refresh AOS animations
  function refreshAOSAnimations(section) {
    if (!section) return;

    // Get all elements with AOS animations in the section
    const animatedElements = section.querySelectorAll("[data-aos]");

    // Remove AOS classes and then re-add them
    animatedElements.forEach((element) => {
      // Store original animation for restoration
      const originalAnimation = element.getAttribute("data-aos");

      // Remove AOS animation classes
      element.classList.remove("aos-animate");

      // Force a reflow to ensure the class removal takes effect
      void element.offsetWidth;

      // Re-add the animation classes after a brief delay
      setTimeout(() => {
        element.classList.add("aos-animate");
      }, 50);
    });

    // Make sure AOS is completely refreshed
    if (typeof AOS !== "undefined") {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }

  // Add clicked style to nav links
  document.querySelectorAll(".nav-link, .footer-link").forEach((link) => {
    link.addEventListener("click", function () {
      this.classList.add("clicked");
      setTimeout(() => {
        this.classList.remove("clicked");
      }, 300);
    });
  });
});
