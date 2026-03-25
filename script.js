document.addEventListener("DOMContentLoaded", function () {
  const typingText = document.getElementById("typingText");
  const fullName = "Md Raqibul Islam Masum";
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;

    if (!isDeleting) {
      typingText.textContent = fullName.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === fullName.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1800);
        return;
      }
    } else {
      typingText.textContent = fullName.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
      }
    }

    const speed = isDeleting ? 55 : 95;
    setTimeout(typeEffect, speed);
  }

  typeEffect();

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
      menuToggle.classList.toggle("active");
    });

    navItems.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
      });
    });
  }

  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector('.nav-links a[href*="' + sectionId + '"]');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach((item) => item.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  }

  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const visiblePoint = 100;

      if (elementTop < windowHeight - visiblePoint) {
        element.classList.add("active");
      }
    });
  }

  const scrollTopBtn = document.getElementById("scrollTop");

  function toggleScrollTopButton() {
    if (!scrollTopBtn) return;

    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  window.addEventListener("scroll", function () {
    updateActiveNav();
    revealOnScroll();
    toggleScrollTopButton();
  });

  updateActiveNav();
  revealOnScroll();
  toggleScrollTopButton();
});
