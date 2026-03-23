const navLinks = document.querySelectorAll(".nav-links a");
const navContainer = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const sections = document.querySelectorAll("section");
const revealElements = document.querySelectorAll(".reveal");

/* Always start from top on reload */
window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  typeName();
  window.dispatchEvent(new Event("scroll"));
});

/* Mobile menu toggle */
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navContainer.classList.toggle("show");
    menuToggle.classList.toggle("active");
  });
}

/* Close mobile menu when clicking nav link */
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");

    if (navContainer) navContainer.classList.remove("show");
    if (menuToggle) menuToggle.classList.remove("active");
  });
});

/* Active nav + reveal on scroll */
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
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
});

/* Typing effect */
const typingTarget = document.getElementById("typing-name");
const fullName = "Md Raqibul Islam Masum";
let index = 0;

function typeName() {
  if (!typingTarget) return;

  typingTarget.textContent = "";
  index = 0;

  function type() {
    if (index < fullName.length) {
      typingTarget.textContent += fullName.charAt(index);
      index++;
      setTimeout(type, 90);
    }
  }

  type();
}

/* Close mobile menu if clicked outside */
document.addEventListener("click", (e) => {
  if (!navContainer || !menuToggle) return;

  const clickedInsideMenu = navContainer.contains(e.target);
  const clickedToggle = menuToggle.contains(e.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navContainer.classList.remove("show");
    menuToggle.classList.remove("active");
  }
});