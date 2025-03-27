document.addEventListener("DOMContentLoaded", function () {
  // Get all "Get in touch" buttons
  const contactButtons = document.querySelectorAll(
    '.contact-button, .git a[href="#contact"]'
  );

  // Add click event listener to each button
  contactButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior

      // Get the contact section
      const contactSection = document.getElementById("contact");
      if (!contactSection) return;

      // Get navbar height for offset calculations
      const navbar = document.querySelector(".navbar");
      const navbarHeight = navbar ? navbar.offsetHeight : 100;

      // Refresh AOS animations
      refreshAOSAnimations(contactSection);

      // Add a small visual feedback when clicked
      button.classList.add("clicked");
      setTimeout(() => {
        button.classList.remove("clicked");
      }, 500);

      // First, allow any animations or content to load by waiting a brief moment
      setTimeout(() => {
        // Get the updated position of the element after animations might have affected layout
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - navbarHeight - 20;

        // Scroll to the contact section with animation using GSAP
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
              const finalPosition = contactSection.getBoundingClientRect().top;
              if (Math.abs(finalPosition - navbarHeight - 20) > 5) {
                // If position is still off by more than 5px, do a final adjustment
                window.scrollBy({
                  top: finalPosition - navbarHeight - 20,
                  behavior: "smooth",
                });
              }

              // Add professional highlight effect to contact section
              contactSection.classList.add("section-highlight");

              // Subtle reveal animation for form elements
              const formElements = contactSection.querySelectorAll(
                "input, textarea, button, .social-icons a"
              );
              gsap.fromTo(
                formElements,
                { opacity: 0.7, y: 10 },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.1,
                  duration: 0.5,
                  ease: "power2.out",
                }
              );

              // Subtle scale animation for section title
              const sectionTitle = contactSection.querySelector(".sub-title");
              if (sectionTitle) {
                gsap.fromTo(
                  sectionTitle,
                  { scale: 0.98, opacity: 0.9 },
                  { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.2)" }
                );
              }

              // Remove the highlight class after it completes
              setTimeout(() => {
                contactSection.classList.remove("section-highlight");
              }, 1500);
            }, 100);
          },
        });
      }, 50); // Short delay to let the page update first
    });
  });

  // Function to refresh AOS animations
  function refreshAOSAnimations(contactSection) {
    if (!contactSection) return;

    // Get all elements with AOS animations in the contact section
    const animatedElements = contactSection.querySelectorAll("[data-aos]");

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
});
