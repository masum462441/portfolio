const navLinks = document.querySelectorAll(".nav-links a");
const navContainer = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const sections = document.querySelectorAll("section[id]");
const revealElements = document.querySelectorAll(".reveal");
const navbar = document.getElementById("navbar");
const typingTarget = document.getElementById("typing-name");
const watchDemoBtn = document.getElementById("watchDemoBtn");
const appDemoVideo = document.getElementById("appDemoVideo");

const fullName = "Md Raqibul Islam Masum";
let typingIndex = 0;
let typingTimeout = null;

/*
  Reload / refresh korle browser normally last scroll position
  ba #skills / #contact hash remember kore.
  Ei setting seta off kore.
*/
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {
  forceStartFromTop();
});

window.addEventListener("load", () => {
  forceStartFromTop();
  startTypingEffect();
  handleScrollEffects();
});

window.addEventListener("pageshow", () => {
  forceStartFromTop();
  handleScrollEffects();
});

window.addEventListener("scroll", handleScrollEffects);

function forceStartFromTop() {
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname);
  }

  window.scrollTo(0, 0);
}

if (menuToggle && navContainer) {
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
    closeMobileMenu();
  });
});

function handleScrollEffects() {
  handleNavbarStyle();
  handleActiveNavLink();
  handleRevealAnimation();
}

function handleNavbarStyle() {
  if (!navbar) return;

  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function handleActiveNavLink() {
  let currentSection = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

function handleRevealAnimation() {
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

  function typeName() {
    if (typingIndex < fullName.length) {
      typingTarget.textContent += fullName.charAt(typingIndex);
      typingIndex++;
      typingTimeout = setTimeout(typeName, 85);
    }
  }

  typeName();
}

if (watchDemoBtn && appDemoVideo) {
  watchDemoBtn.addEventListener("click", function (event) {
    event.preventDefault();

    appDemoVideo.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    setTimeout(() => {
      const playPromise = appDemoVideo.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          appDemoVideo.setAttribute("controls", "controls");
        });
      }
    }, 500);
  });
}

document.addEventListener("click", (event) => {
  if (!navContainer || !menuToggle) return;

  const clickedInsideMenu = navContainer.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

function closeMobileMenu() {
  if (!navContainer || !menuToggle) return;

  navContainer.classList.remove("show");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
}