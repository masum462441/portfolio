const navLinks = document.querySelectorAll(".nav-links a");
const navContainer = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const sections = document.querySelectorAll("section[id]");
const revealElements = document.querySelectorAll(".reveal");
const navbar = document.getElementById("navbar");
const typingTarget = document.getElementById("typing-name");

const fullName = "Md Raqibul Islam Masum";
let typingIndex = 0;
let typingTimeout = null;

window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  window.scrollTo(0, 0);
  startTypingEffect();
  handleScrollEffects();
});

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navContainer.classList.toggle("show");
    menuToggle.classList.toggle("active");

    const expanded = menuToggle.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");

    if (navContainer) {
      navContainer.classList.remove("show");
    }

    if (menuToggle) {
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

window.addEventListener("scroll", handleScrollEffects);

function handleScrollEffects() {
  if (navbar) {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });

  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active-reveal");
    }
  });
}

function startTypingEffect() {
  if (!typingTarget) return;

  clearTimeout(typingTimeout);
  typingTarget.textContent = "";
  typingIndex = 0;

  function type() {
    if (typingIndex < fullName.length) {
      typingTarget.textContent += fullName.charAt(typingIndex);
      typingIndex++;
      typingTimeout = setTimeout(type, 85);
    }
  }

  type();
}

document.addEventListener("click", (event) => {
  if (!navContainer || !menuToggle) return;

  const clickedInsideMenu = navContainer.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navContainer.classList.remove("show");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});
