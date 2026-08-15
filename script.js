"use strict";

/* =========================================================
   MASUM TECHNICAL SUPPORT BANGLADESH
   FINAL PREMIUM PORTFOLIO SCRIPT
   HISABFLOW 2.0 DEMO MODAL
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

  fullName:
    "Md Raqibul Islam Masum",

  whatsappNumber:
    "8801820806464",

  typingSpeed:
    52,

  introDuration:
    1650,

  introExitDuration:
    520,

  navOffset:
    125

};


/* =========================================================
   ELEMENT REFERENCES
========================================================= */

const body =
  document.body;


const navbar =
  document.getElementById(
    "navbar"
  );


const navLinksContainer =
  document.getElementById(
    "navLinks"
  );


const navLinks =
  document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );


const menuToggle =
  document.getElementById(
    "menuToggle"
  );


const menuClose =
  document.getElementById(
    "menuClose"
  );


const navOverlay =
  document.getElementById(
    "navOverlay"
  );


const themeToggle =
  document.getElementById(
    "themeToggle"
  );


const typingTarget =
  document.getElementById(
    "typing-name"
  );


const sections =
  document.querySelectorAll(
    "section[id]"
  );


const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const tabButtons =
  document.querySelectorAll(
    ".tab-btn"
  );


const tabPanels =
  document.querySelectorAll(
    ".tab-panel"
  );


const contactForm =
  document.getElementById(
    "contactForm"
  );


const backToTop =
  document.getElementById(
    "backToTop"
  );


const currentYear =
  document.getElementById(
    "currentYear"
  );


const themeColorMeta =
  document.querySelector(
    'meta[name="theme-color"]'
  );


/* =========================================================
   HISABFLOW ELEMENTS
========================================================= */

const watchHisabFlowDemo =
  document.getElementById(
    "watchHisabFlowDemo"
  );


const hisabflowDemoModal =
  document.getElementById(
    "hisabflowDemoModal"
  );


const closeHisabFlowDemo =
  document.getElementById(
    "closeHisabFlowDemo"
  );


const hisabflowDemoVideo =
  document.getElementById(
    "hisabflowDemoVideo"
  );


const hisabflowCloseTargets =
  document.querySelectorAll(
    "[data-hisabflow-close]"
  );


let lastFocusedElement =
  null;


/* =========================================================
   SCROLL RESTORATION
========================================================= */

if (
  "scrollRestoration" in history
) {

  history.scrollRestoration =
    "manual";

}


/* =========================================================
   INITIALIZE
========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializePortfolio
  );

} else {

  initializePortfolio();

}


/* =========================================================
   MAIN INITIALIZER
========================================================= */

function initializePortfolio() {

  forceHomeOnLoad();

  setupTheme();

  setupMobileMenu();

  setupSmoothNavigation();

  setupRevealAnimation();

  setupTabs();

  setupContactForm();

  setupBackToTop();

  setupCounters();

  setupImagePerformance();

  setupExternalLinkSecurity();

  setupScrollEffects();

  setupHisabFlowDemo();

  updateCurrentYear();

  startUniqueIntro();

}


/* =========================================================
   FORCE HOME / TOP ON PAGE LOAD
========================================================= */

function forceHomeOnLoad() {

  try {

    if (
      window.location.hash
    ) {

      history.replaceState(
        null,
        "",
        window.location.pathname +
        window.location.search
      );

    }

  } catch (error) {

    console.warn(
      "Could not remove URL hash."
    );

  }


  window.scrollTo({

    top: 0,

    left: 0,

    behavior: "auto"

  });


  requestAnimationFrame(
    () => {

      window.scrollTo({

        top: 0,

        left: 0,

        behavior: "auto"

      });

    }
  );

}


/* =========================================================
   UNIQUE PORTFOLIO INTRO
   SHOWS ON EVERY PAGE LOAD
========================================================= */

function startUniqueIntro() {

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    reduceMotion
  ) {

    startTypingEffect();

    document
      .getElementById("home")
      ?.classList.add(
        "active-reveal"
      );

    return;

  }


  createIntroStyles();


  const oldIntro =
    document.getElementById(
      "masumUniqueIntro"
    );


  if (
    oldIntro
  ) {

    oldIntro.remove();

  }


  const intro =
    document.createElement(
      "div"
    );


  intro.id =
    "masumUniqueIntro";


  intro.className =
    "masum-entry-screen";


  intro.innerHTML = `

    <div class="entry-background-shape shape-a"></div>

    <div class="entry-background-shape shape-b"></div>

    <div class="entry-grid"></div>


    <div class="entry-container">


      <div class="entry-logo-area">

        <div class="entry-logo-ring ring-one"></div>

        <div class="entry-logo-ring ring-two"></div>

        <div class="entry-logo">
          M
        </div>

        <span class="entry-online-dot"></span>

      </div>


      <div class="entry-welcome">
        WELCOME TO
      </div>


      <h1 class="entry-brand">

        <span>
          MASUM
        </span>

        <strong>
          TECH
        </strong>

      </h1>


      <div class="entry-divider">

        <span></span>

      </div>


      <p class="entry-business-name">
        Masum Technical Support Bangladesh
      </p>


      <p class="entry-tagline">
        Apps • Websites • Business Solutions • Technical Support
      </p>


      <div class="entry-ready">

        <span class="entry-ready-dot"></span>

        Portfolio Ready

      </div>


      <div class="entry-progress">

        <span></span>

      </div>


    </div>

  `;


  body.appendChild(
    intro
  );


  body.classList.add(
    "intro-active"
  );


  /*
    Two-frame delay ensures
    browser renders the initial
    animation state correctly.
  */

  requestAnimationFrame(
    () => {

      requestAnimationFrame(
        () => {

          intro.classList.add(
            "entry-show"
          );

        }
      );

    }
  );


  /*
    Exit intro after configured time.
  */

  setTimeout(
    () => {

      intro.classList.add(
        "entry-exit"
      );


      setTimeout(
        () => {

          body.classList.remove(
            "intro-active"
          );


          intro.remove();


          startTypingEffect();


          document
            .getElementById("home")
            ?.classList.add(
              "active-reveal"
            );


        },

        CONFIG.introExitDuration

      );

    },

    CONFIG.introDuration

  );

}


/* =========================================================
   UNIQUE INTRO STYLES
   INJECTED ONLY ONCE
========================================================= */

function createIntroStyles() {

  if (
    document.getElementById(
      "masumUniqueIntroStyles"
    )
  ) {

    return;

  }


  const style =
    document.createElement(
      "style"
    );


  style.id =
    "masumUniqueIntroStyles";


  style.textContent = `

    body.intro-active {

      overflow:
        hidden !important;

    }


    /* ==========================================
       INTRO SCREEN
    ========================================== */

    .masum-entry-screen {

      position:
        fixed;

      inset:
        0;

      z-index:
        999999;

      display:
        flex;

      align-items:
        center;

      justify-content:
        center;

      padding:
        24px;

      overflow:
        hidden;

      background:
        radial-gradient(
          circle at 18% 16%,
          rgba(47,109,246,0.15),
          transparent 28%
        ),
        radial-gradient(
          circle at 82% 82%,
          rgba(22,185,129,0.13),
          transparent 30%
        ),
        linear-gradient(
          145deg,
          #f9fbff,
          #f3f7ff
        );

      opacity:
        0;

      visibility:
        hidden;

      transition:
        opacity 0.35s ease,
        visibility 0.35s ease,
        transform 0.5s ease;

    }


    body.dark-theme
    .masum-entry-screen {

      background:
        radial-gradient(
          circle at 18% 16%,
          rgba(100,143,255,0.18),
          transparent 28%
        ),
        radial-gradient(
          circle at 82% 82%,
          rgba(55,212,156,0.12),
          transparent 30%
        ),
        linear-gradient(
          145deg,
          #0b111b,
          #101827
        );

    }


    .masum-entry-screen.entry-show {

      opacity:
        1;

      visibility:
        visible;

    }


    .masum-entry-screen.entry-exit {

      opacity:
        0;

      visibility:
        hidden;

      transform:
        scale(1.035);

    }


    /* ==========================================
       GRID BACKGROUND
    ========================================== */

    .entry-grid {

      position:
        absolute;

      inset:
        0;

      opacity:
        0.38;

      pointer-events:
        none;

      background-image:

        linear-gradient(
          rgba(47,109,246,0.045) 1px,
          transparent 1px
        ),

        linear-gradient(
          90deg,
          rgba(47,109,246,0.045) 1px,
          transparent 1px
        );

      background-size:
        42px 42px;

      mask-image:
        radial-gradient(
          circle,
          black 15%,
          transparent 72%
        );

      -webkit-mask-image:
        radial-gradient(
          circle,
          black 15%,
          transparent 72%
        );

    }


    body.dark-theme
    .entry-grid {

      background-image:

        linear-gradient(
          rgba(255,255,255,0.035) 1px,
          transparent 1px
        ),

        linear-gradient(
          90deg,
          rgba(255,255,255,0.035) 1px,
          transparent 1px
        );

    }


    /* ==========================================
       BACKGROUND SHAPES
    ========================================== */

    .entry-background-shape {

      position:
        absolute;

      border-radius:
        50%;

      filter:
        blur(60px);

      pointer-events:
        none;

      animation:
        entryOrbFloat
        3.5s
        ease-in-out
        infinite;

    }


    .shape-a {

      width:
        320px;

      height:
        320px;

      left:
        -130px;

      top:
        -90px;

      background:
        rgba(47,109,246,0.13);

    }


    .shape-b {

      width:
        320px;

      height:
        320px;

      right:
        -120px;

      bottom:
        -100px;

      background:
        rgba(22,185,129,0.11);

      animation-delay:
        0.8s;

    }


    /* ==========================================
       INTRO CONTENT
    ========================================== */

    .entry-container {

      position:
        relative;

      z-index:
        5;

      width:
        min(
          100%,
          620px
        );

      display:
        flex;

      flex-direction:
        column;

      align-items:
        center;

      text-align:
        center;

      opacity:
        0;

      transform:
        translateY(18px)
        scale(0.98);

      animation:
        entryContainerReveal
        0.58s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        )
        0.05s
        forwards;

    }


    /* ==========================================
       INTRO LOGO
    ========================================== */

    .entry-logo-area {

      position:
        relative;

      width:
        112px;

      height:
        112px;

      margin-bottom:
        22px;

      display:
        flex;

      align-items:
        center;

      justify-content:
        center;

    }


    .entry-logo {

      position:
        relative;

      z-index:
        6;

      width:
        72px;

      height:
        72px;

      display:
        flex;

      align-items:
        center;

      justify-content:
        center;

      border-radius:
        22px;

      color:
        #ffffff;

      background:
        linear-gradient(
          135deg,
          #2f6df6,
          #7564e9
        );

      box-shadow:
        0 18px 45px
        rgba(47,109,246,0.30);

      font-family:
        "Inter",
        sans-serif;

      font-size:
        2rem;

      font-weight:
        900;

      animation:
        entryLogoReveal
        0.70s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        )
        forwards;

    }


    .entry-logo::after {

      content:
        "";

      position:
        absolute;

      inset:
        6px;

      border:
        1px solid
        rgba(255,255,255,0.20);

      border-radius:
        17px;

    }


    .entry-logo-ring {

      position:
        absolute;

      border-radius:
        50%;

      border:
        1px solid
        rgba(47,109,246,0.20);

    }


    .ring-one {

      width:
        94px;

      height:
        94px;

      animation:
        entryRingOne
        2.2s
        linear
        infinite;

    }


    .ring-two {

      width:
        110px;

      height:
        110px;

      border-style:
        dashed;

      opacity:
        0.55;

      animation:
        entryRingTwo
        3.1s
        linear
        infinite;

    }


    .entry-online-dot {

      position:
        absolute;

      right:
        9px;

      top:
        10px;

      z-index:
        8;

      width:
        12px;

      height:
        12px;

      border-radius:
        50%;

      background:
        #16b981;

      box-shadow:

        0 0 0 6px
        rgba(22,185,129,0.11),

        0 0 20px
        rgba(22,185,129,0.55);

      animation:
        entryDotPulse
        1.2s
        ease-in-out
        infinite;

    }


    /* ==========================================
       INTRO TEXT
    ========================================== */

    .entry-welcome {

      margin-bottom:
        7px;

      color:
        #7d8999;

      font-family:
        "Inter",
        sans-serif;

      font-size:
        0.65rem;

      font-weight:
        900;

      letter-spacing:
        3.6px;

      opacity:
        0;

      animation:
        entryTextUp
        0.45s
        ease
        0.23s
        forwards;

    }


    body.dark-theme
    .entry-welcome {

      color:
        #93a1b7;

    }


    .entry-brand {

      display:
        flex;

      align-items:
        center;

      justify-content:
        center;

      gap:
        9px;

      margin:
        0;

      color:
        #101828;

      font-family:
        "Inter",
        sans-serif;

      font-size:
        clamp(
          2.1rem,
          7vw,
          3.15rem
        );

      font-weight:
        900;

      letter-spacing:
        2.4px;

      line-height:
        1.1;

      opacity:
        0;

      animation:
        entryBrandReveal
        0.55s
        cubic-bezier(
          0.22,
          1,
          0.36,
          1
        )
        0.29s
        forwards;

    }


    body.dark-theme
    .entry-brand {

      color:
        #f5f7fb;

    }


    .entry-brand strong {

      background:
        linear-gradient(
          135deg,
          #2f6df6,
          #755fe6,
          #16b981
        );

      -webkit-background-clip:
        text;

      background-clip:
        text;

      color:
        transparent;

    }


    .entry-divider {

      width:
        145px;

      height:
        2px;

      margin:
        14px 0;

      overflow:
        hidden;

      border-radius:
        999px;

      background:
        rgba(47,109,246,0.08);

    }


    .entry-divider span {

      display:
        block;

      width:
        0;

      height:
        100%;

      border-radius:
        inherit;

      background:
        linear-gradient(
          90deg,
          #2f6df6,
          #755fe6,
          #16b981
        );

      animation:
        entryDividerGrow
        0.55s
        ease
        0.45s
        forwards;

    }


    .entry-business-name {

      color:
        #101828;

      font-family:
        "Inter",
        sans-serif;

      font-size:
        clamp(
          0.88rem,
          3vw,
          1.08rem
        );

      font-weight:
        800;

      opacity:
        0;

      transform:
        translateY(8px);

      animation:
        entryTextUp
        0.45s
        ease
        0.50s
        forwards;

    }


    body.dark-theme
    .entry-business-name {

      color:
        #f5f7fb;

    }


    .entry-tagline {

      margin-top:
        5px;

      color:
        #667085;

      font-family:
        "Inter",
        sans-serif;

      font-size:
        clamp(
          0.68rem,
          2.3vw,
          0.82rem
        );

      opacity:
        0;

      animation:
        entryTextUp
        0.45s
        ease
        0.64s
        forwards;

    }


    body.dark-theme
    .entry-tagline {

      color:
        #aab6c9;

    }


    /* ==========================================
       READY BADGE
    ========================================== */

    .entry-ready {

      margin-top:
        18px;

      padding:
        7px 12px;

      display:
        inline-flex;

      align-items:
        center;

      gap:
        7px;

      border:
        1px solid
        rgba(22,185,129,0.15);

      border-radius:
        999px;

      color:
        #07845d;

      background:
        rgba(22,185,129,0.08);

      font-family:
        "Inter",
        sans-serif;

      font-size:
        0.68rem;

      font-weight:
        800;

      opacity:
        0;

      animation:
        entryTextUp
        0.42s
        ease
        0.77s
        forwards;

    }


    body.dark-theme
    .entry-ready {

      color:
        #78e7bd;

    }


    .entry-ready-dot {

      width:
        7px;

      height:
        7px;

      border-radius:
        50%;

      background:
        #16b981;

      box-shadow:
        0 0 0 4px
        rgba(22,185,129,0.10);

    }


    /* ==========================================
       PROGRESS BAR
    ========================================== */

    .entry-progress {

      width:
        175px;

      height:
        3px;

      margin-top:
        18px;

      overflow:
        hidden;

      border-radius:
        999px;

      background:
        rgba(47,109,246,0.09);

    }


    .entry-progress span {

      display:
        block;

      width:
        0;

      height:
        100%;

      border-radius:
        inherit;

      background:
        linear-gradient(
          90deg,
          #2f6df6,
          #755fe6,
          #16b981
        );

      animation:
        entryProgress
        1.45s
        cubic-bezier(
          0.65,
          0,
          0.35,
          1
        )
        0.12s
        forwards;

    }


    /* ==========================================
       INTRO KEYFRAMES
    ========================================== */

    @keyframes entryContainerReveal {

      from {

        opacity:
          0;

        transform:
          translateY(18px)
          scale(0.98);

      }

      to {

        opacity:
          1;

        transform:
          translateY(0)
          scale(1);

      }

    }


    @keyframes entryLogoReveal {

      0% {

        opacity:
          0;

        transform:
          scale(0.55)
          rotate(-12deg);

      }

      70% {

        opacity:
          1;

        transform:
          scale(1.08)
          rotate(3deg);

      }

      100% {

        opacity:
          1;

        transform:
          scale(1)
          rotate(0);

      }

    }


    @keyframes entryRingOne {

      to {

        transform:
          rotate(360deg);

      }

    }


    @keyframes entryRingTwo {

      to {

        transform:
          rotate(-360deg);

      }

    }


    @keyframes entryDotPulse {

      0%,
      100% {

        transform:
          scale(0.85);

        opacity:
          0.7;

      }

      50% {

        transform:
          scale(1.15);

        opacity:
          1;

      }

    }


    @keyframes entryTextUp {

      from {

        opacity:
          0;

        transform:
          translateY(8px);

      }

      to {

        opacity:
          1;

        transform:
          translateY(0);

      }

    }


    @keyframes entryBrandReveal {

      from {

        opacity:
          0;

        transform:
          translateY(10px)
          scale(0.96);

        letter-spacing:
          7px;

      }

      to {

        opacity:
          1;

        transform:
          translateY(0)
          scale(1);

        letter-spacing:
          2.4px;

      }

    }


    @keyframes entryDividerGrow {

      from {

        width:
          0;

      }

      to {

        width:
          100%;

      }

    }


    @keyframes entryProgress {

      from {

        width:
          0%;

      }

      to {

        width:
          100%;

      }

    }


    @keyframes entryOrbFloat {

      0%,
      100% {

        transform:
          translate3d(
            0,
            0,
            0
          );

      }

      50% {

        transform:
          translate3d(
            12px,
            -10px,
            0
          );

      }

    }


    /* ==========================================
       MOBILE INTRO
    ========================================== */

    @media (max-width: 520px) {

      .masum-entry-screen {

        padding:
          20px;

      }


      .entry-logo-area {

        width:
          92px;

        height:
          92px;

        margin-bottom:
          18px;

      }


      .entry-logo {

        width:
          62px;

        height:
          62px;

        border-radius:
          18px;

        font-size:
          1.7rem;

      }


      .ring-one {

        width:
          80px;

        height:
          80px;

      }


      .ring-two {

        width:
          92px;

        height:
          92px;

      }


      .entry-online-dot {

        right:
          5px;

        top:
          7px;

        width:
          10px;

        height:
          10px;

      }


      .entry-brand {

        gap:
          6px;

        letter-spacing:
          1px;

      }


      .entry-business-name {

        max-width:
          320px;

        line-height:
          1.5;

      }


      .entry-tagline {

        max-width:
          320px;

        line-height:
          1.6;

      }

    }


    @media (
      prefers-reduced-motion:
      reduce
    ) {

      .masum-entry-screen,
      .masum-entry-screen * {

        animation:
          none !important;

        transition:
          none !important;

      }

    }

  `;


  document.head.appendChild(
    style
  );

}


/* =========================================================
   NAME TYPING EFFECT
========================================================= */

let typingIndex =
  0;


let typingTimer =
  null;


function startTypingEffect() {

  if (
    !typingTarget
  ) {

    return;

  }


  clearTimeout(
    typingTimer
  );


  typingTarget.textContent =
    "";


  typingIndex =
    0;


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    reduceMotion
  ) {

    typingTarget.textContent =
      CONFIG.fullName;

    return;

  }


  function typeNextCharacter() {

    if (
      typingIndex >=
      CONFIG.fullName.length
    ) {

      return;

    }


    typingTarget.textContent +=
      CONFIG.fullName.charAt(
        typingIndex
      );


    typingIndex++;


    typingTimer =
      setTimeout(
        typeNextCharacter,
        CONFIG.typingSpeed
      );

  }


  typeNextCharacter();

}


/* =========================================================
   THEME
========================================================= */

function setupTheme() {

  let savedTheme =
    null;


  try {

    savedTheme =
      localStorage.getItem(
        "masumPortfolioTheme"
      );

  } catch (error) {

    savedTheme =
      null;

  }


  if (
    savedTheme === "dark"
  ) {

    body.classList.add(
      "dark-theme"
    );

  }


  updateThemeUI();


  if (
    !themeToggle
  ) {

    return;

  }


  themeToggle.addEventListener(
    "click",
    () => {

      body.classList.toggle(
        "dark-theme"
      );


      const theme =
        body.classList.contains(
          "dark-theme"
        )
          ? "dark"
          : "light";


      try {

        localStorage.setItem(
          "masumPortfolioTheme",
          theme
        );

      } catch (error) {

        /*
          Ignore local storage error.
        */

      }


      updateThemeUI();

    }
  );

}


/* =========================================================
   UPDATE THEME UI
========================================================= */

function updateThemeUI() {

  if (
    !themeToggle
  ) {

    return;

  }


  const isDark =
    body.classList.contains(
      "dark-theme"
    );


  const icon =
    themeToggle.querySelector(
      "i"
    );


  if (
    icon
  ) {

    icon.className =
      isDark
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";

  }


  themeToggle.setAttribute(

    "aria-label",

    isDark
      ? "Switch to light mode"
      : "Switch to dark mode"

  );


  if (
    themeColorMeta
  ) {

    themeColorMeta.setAttribute(

      "content",

      isDark
        ? "#0b111b"
        : "#f8fbff"

    );

  }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

  if (
    !menuToggle ||
    !navLinksContainer
  ) {

    return;

  }


  menuToggle.addEventListener(
    "click",
    () => {

      if (
        navLinksContainer
          .classList
          .contains("show")
      ) {

        closeMobileMenu();

      } else {

        openMobileMenu();

      }

    }
  );


  menuClose?.addEventListener(
    "click",
    closeMobileMenu
  );


  navOverlay?.addEventListener(
    "click",
    closeMobileMenu
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        !isHisabFlowModalOpen()
      ) {

        closeMobileMenu();

      }

    }
  );


  window.addEventListener(

    "resize",

    () => {

      if (
        window.innerWidth > 900
      ) {

        closeMobileMenu();

      }

    },

    {
      passive: true
    }

  );

}


/* =========================================================
   OPEN MOBILE MENU
========================================================= */

function openMobileMenu() {

  navLinksContainer
    ?.classList
    .add(
      "show"
    );


  navOverlay
    ?.classList
    .add(
      "show"
    );


  body.classList.add(
    "menu-open"
  );


  menuToggle
    ?.setAttribute(
      "aria-expanded",
      "true"
    );

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

function closeMobileMenu() {

  navLinksContainer
    ?.classList
    .remove(
      "show"
    );


  navOverlay
    ?.classList
    .remove(
      "show"
    );


  body.classList.remove(
    "menu-open"
  );


  menuToggle
    ?.setAttribute(
      "aria-expanded",
      "false"
    );

}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

function setupSmoothNavigation() {

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]:not([href="#"])'
    );


  internalLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          const targetID =
            link.getAttribute(
              "href"
            );


          if (
            !targetID
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetID
            );


          if (
            !target
          ) {

            return;

          }


          event.preventDefault();


          closeMobileMenu();


          const navbarHeight =
            navbar?.offsetHeight ||
            75;


          const targetTop =
            target
              .getBoundingClientRect()
              .top +
            window.scrollY -
            navbarHeight -
            12;


          window.scrollTo({

            top:
              targetTop,

            behavior:
              "smooth"

          });


          /*
            Keep URL clean.
          */

          try {

            history.replaceState(

              null,

              "",

              window.location.pathname +
              window.location.search

            );

          } catch (error) {

            /*
              Ignore history error.
            */

          }

        }
      );

    }
  );

}


/* =========================================================
   SCROLL EFFECTS
========================================================= */

function setupScrollEffects() {

  let ticking =
    false;


  function updateScrollState() {

    const scrollY =
      window.scrollY ||
      document.documentElement
        .scrollTop;


    navbar
      ?.classList
      .toggle(
        "scrolled",
        scrollY > 30
      );


    backToTop
      ?.classList
      .toggle(
        "show",
        scrollY > 500
      );


    updateActiveNavigation();


    ticking =
      false;

  }


  function onScroll() {

    if (
      ticking
    ) {

      return;

    }


    ticking =
      true;


    requestAnimationFrame(
      updateScrollState
    );

  }


  window.addEventListener(

    "scroll",

    onScroll,

    {
      passive: true
    }

  );


  updateScrollState();

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

  if (
    !sections.length
  ) {

    return;

  }


  let activeSection =
    "home";


  const position =
    window.scrollY +
    CONFIG.navOffset;


  sections.forEach(
    section => {

      if (
        position >=
        section.offsetTop
      ) {

        activeSection =
          section.id ||
          activeSection;

      }

    }
  );


  navLinks.forEach(
    link => {

      link.classList.toggle(

        "active",

        link.getAttribute(
          "href"
        ) ===
        `#${activeSection}`

      );

    }
  );

}


/* =========================================================
   REVEAL ANIMATION
========================================================= */

function setupRevealAnimation() {

  if (
    !revealElements.length
  ) {

    return;

  }


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    reduceMotion ||
    !(
      "IntersectionObserver"
      in window
    )
  ) {

    revealElements.forEach(
      element => {

        element.classList.add(
          "active-reveal"
        );

      }
    );


    return;

  }


  const observer =
    new IntersectionObserver(

      (
        entries,
        observerInstance
      ) => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target
              .classList
              .add(
                "active-reveal"
              );


            observerInstance
              .unobserve(
                entry.target
              );

          }
        );

      },

      {

        threshold:
          0.07,

        rootMargin:
          "0px 0px -55px 0px"

      }

    );


  revealElements.forEach(
    element => {

      observer.observe(
        element
      );

    }
  );

}


/* =========================================================
   SKILLS / WORK FOCUS TABS
========================================================= */

function setupTabs() {

  if (
    !tabButtons.length
  ) {

    return;

  }


  tabButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const panelID =
            button.dataset.tab;


          if (
            !panelID
          ) {

            return;

          }


          tabButtons.forEach(
            item => {

              item.classList.remove(
                "active"
              );


              item.setAttribute(
                "aria-selected",
                "false"
              );

            }
          );


          tabPanels.forEach(
            panel => {

              panel.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );


          button.setAttribute(
            "aria-selected",
            "true"
          );


          document
            .getElementById(
              panelID
            )
            ?.classList.add(
              "active"
            );

        }
      );

    }
  );

}


/* =========================================================
   HISABFLOW DEMO MODAL
========================================================= */

function setupHisabFlowDemo() {

  if (
    !watchHisabFlowDemo ||
    !hisabflowDemoModal ||
    !hisabflowDemoVideo
  ) {

    return;

  }


  watchHisabFlowDemo.addEventListener(
    "click",
    openHisabFlowDemo
  );


  closeHisabFlowDemo
    ?.addEventListener(
      "click",
      closeHisabFlowDemoModal
    );


  hisabflowCloseTargets.forEach(
    element => {

      element.addEventListener(
        "click",
        closeHisabFlowDemoModal
      );

    }
  );


  /*
    ESC closes modal.
  */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        isHisabFlowModalOpen()
      ) {

        event.preventDefault();

        closeHisabFlowDemoModal();

      }

    }
  );


  /*
    Pause video automatically
    if browser/tab becomes hidden.
  */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden &&
        isHisabFlowModalOpen()
      ) {

        hisabflowDemoVideo.pause();

      }

    }
  );

}


/* =========================================================
   OPEN HISABFLOW DEMO
========================================================= */

function openHisabFlowDemo() {

  if (
    !hisabflowDemoModal ||
    !hisabflowDemoVideo
  ) {

    return;

  }


  lastFocusedElement =
    document.activeElement;


  closeMobileMenu();


  const videoSource =
    hisabflowDemoVideo
      .dataset
      .src;


  /*
    VIDEO PERFORMANCE:
    src is attached only when
    user clicks Watch Demo.
  */

  if (
    videoSource &&
    !hisabflowDemoVideo
      .getAttribute("src")
  ) {

    hisabflowDemoVideo
      .setAttribute(
        "src",
        videoSource
      );


    hisabflowDemoVideo.load();

  }


  hisabflowDemoModal
    .classList
    .add(
      "show"
    );


  hisabflowDemoModal
    .setAttribute(
      "aria-hidden",
      "false"
    );


  body.classList.add(
    "hisabflow-modal-open"
  );


  /*
    Move focus to close button.
  */

  requestAnimationFrame(
    () => {

      closeHisabFlowDemo
        ?.focus();

    }
  );


  /*
    Try autoplay because opening
    comes directly from a user click.
    If browser blocks autoplay,
    normal video controls remain available.
  */

  const playPromise =
    hisabflowDemoVideo.play();


  if (
    playPromise &&
    typeof playPromise.catch ===
      "function"
  ) {

    playPromise.catch(
      () => {

        /*
          Autoplay blocked.
          User can press Play manually.
        */

      }
    );

  }

}


/* =========================================================
   CLOSE HISABFLOW DEMO
========================================================= */

function closeHisabFlowDemoModal() {

  if (
    !hisabflowDemoModal ||
    !hisabflowDemoVideo
  ) {

    return;

  }


  hisabflowDemoModal
    .classList
    .remove(
      "show"
    );


  hisabflowDemoModal
    .setAttribute(
      "aria-hidden",
      "true"
    );


  body.classList.remove(
    "hisabflow-modal-open"
  );


  /*
    Stop video immediately.
  */

  hisabflowDemoVideo.pause();


  try {

    hisabflowDemoVideo.currentTime =
      0;

  } catch (error) {

    /*
      Ignore reset error.
    */

  }


  /*
    Performance optimization:
    completely detach the large
    video file after modal closes.

    This releases network/media
    resources and prevents the
    25MB demo from affecting
    normal portfolio performance.
  */

  hisabflowDemoVideo
    .removeAttribute(
      "src"
    );


  hisabflowDemoVideo.load();


  /*
    Restore keyboard focus.
  */

  if (
    lastFocusedElement &&
    typeof lastFocusedElement.focus ===
      "function"
  ) {

    requestAnimationFrame(
      () => {

        lastFocusedElement.focus();

      }
    );

  }


  lastFocusedElement =
    null;

}


/* =========================================================
   CHECK MODAL STATE
========================================================= */

function isHisabFlowModalOpen() {

  return Boolean(

    hisabflowDemoModal
      ?.classList
      .contains(
        "show"
      )

  );

}


/* =========================================================
   CONTACT FORM -> WHATSAPP
========================================================= */

function setupContactForm() {

  if (
    !contactForm
  ) {

    return;

  }


  contactForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document
          .getElementById(
            "contactName"
          )
          ?.value
          .trim() ||
        "";


      const email =
        document
          .getElementById(
            "contactEmail"
          )
          ?.value
          .trim() ||
        "";


      const subject =
        document
          .getElementById(
            "contactSubject"
          )
          ?.value
          .trim() ||
        "";


      const message =
        document
          .getElementById(
            "contactMessage"
          )
          ?.value
          .trim() ||
        "";


      if (
        !name ||
        !email ||
        !subject ||
        !message
      ) {

        showFormMessage(

          "Please complete all required fields.",

          "error"

        );


        return;

      }


      if (
        !validateEmail(
          email
        )
      ) {

        showFormMessage(

          "Please enter a valid email address.",

          "error"

        );


        return;

      }


      const whatsappText =
`Hello Masum Tech,

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent from Masum Technical Support Bangladesh Portfolio`;


      const whatsappURL =
        `https://wa.me/${CONFIG.whatsappNumber}?text=` +
        encodeURIComponent(
          whatsappText
        );


      showFormMessage(

        "Opening WhatsApp...",

        "success"

      );


      setTimeout(
        () => {

          const newWindow =
            window.open(

              whatsappURL,

              "_blank",

              "noopener,noreferrer"

            );


          if (
            !newWindow
          ) {

            window.location.href =
              whatsappURL;

          }

        },

        220

      );

    }
  );

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function validateEmail(
  email
) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );

}


/* =========================================================
   CONTACT FORM MESSAGE
========================================================= */

function showFormMessage(
  message,
  type = "success"
) {

  document
    .getElementById(
      "contactFormMessage"
    )
    ?.remove();


  const messageBox =
    document.createElement(
      "div"
    );


  messageBox.id =
    "contactFormMessage";


  messageBox.textContent =
    message;


  messageBox.style.marginTop =
    "13px";


  messageBox.style.padding =
    "11px 13px";


  messageBox.style.borderRadius =
    "12px";


  messageBox.style.fontSize =
    "0.76rem";


  messageBox.style.fontWeight =
    "750";


  messageBox.style.textAlign =
    "center";


  if (
    type === "error"
  ) {

    messageBox.style.color =
      "#b42318";


    messageBox.style.background =
      "rgba(239,68,68,.10)";


    messageBox.style.border =
      "1px solid rgba(239,68,68,.18)";

  } else {

    messageBox.style.color =
      "#087a57";


    messageBox.style.background =
      "rgba(22,185,129,.10)";


    messageBox.style.border =
      "1px solid rgba(22,185,129,.18)";

  }


  contactForm.appendChild(
    messageBox
  );


  setTimeout(
    () => {

      messageBox.remove();

    },

    3500

  );

}


/* =========================================================
   BACK TO TOP
========================================================= */

function setupBackToTop() {

  if (
    !backToTop
  ) {

    return;

  }


  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({

        top:
          0,

        behavior:
          "smooth"

      });


      try {

        history.replaceState(

          null,

          "",

          window.location.pathname +
          window.location.search

        );

      } catch (error) {

        /*
          Ignore history error.
        */

      }

    }
  );

}


/* =========================================================
   HERO COUNTERS
========================================================= */

function setupCounters() {

  const counters =
    document.querySelectorAll(
      "[data-count]"
    );


  if (
    !counters.length
  ) {

    return;

  }


  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    reduceMotion ||
    !(
      "IntersectionObserver"
      in window
    )
  ) {

    counters.forEach(
      counter => {

        const value =
          Number(
            counter.dataset.count
          );


        if (
          Number.isFinite(
            value
          )
        ) {

          counter.textContent =
            `${value}+`;

        }

      }
    );


    return;

  }


  const observer =
    new IntersectionObserver(

      (
        entries,
        observerInstance
      ) => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            animateCounter(
              entry.target
            );


            observerInstance
              .unobserve(
                entry.target
              );

          }
        );

      },

      {

        threshold:
          0.45

      }

    );


  counters.forEach(
    counter => {

      observer.observe(
        counter
      );

    }
  );

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

function animateCounter(
  element
) {

  const target =
    Number(
      element.dataset.count
    );


  if (
    !Number.isFinite(
      target
    )
  ) {

    return;

  }


  const duration =
    650;


  const startTime =
    performance.now();


  function update(
    now
  ) {

    const progress =
      Math.min(

        (
          now -
          startTime
        ) /
        duration,

        1

      );


    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const value =
      Math.round(
        target *
        eased
      );


    element.textContent =
      `${value}+`;


    if (
      progress < 1
    ) {

      requestAnimationFrame(
        update
      );

    }

  }


  requestAnimationFrame(
    update
  );

}


/* =========================================================
   IMAGE PERFORMANCE
========================================================= */

function setupImagePerformance() {

  const images =
    document.querySelectorAll(
      "img"
    );


  images.forEach(
    image => {

      image.decoding =
        "async";


      if (
        image.classList.contains(
          "hero-main-photo"
        )
      ) {

        image.loading =
          "eager";


        try {

          image.fetchPriority =
            "high";

        } catch (error) {

          /*
            Browser fallback.
          */

        }

      } else {

        image.loading =
          "lazy";

      }

    }
  );

}


/* =========================================================
   EXTERNAL LINK SECURITY
========================================================= */

function setupExternalLinkSecurity() {

  const links =
    document.querySelectorAll(
      'a[target="_blank"]'
    );


  links.forEach(
    link => {

      const relValues =
        new Set(

          (
            link.getAttribute(
              "rel"
            ) ||
            ""
          )

            .split(/\s+/)

            .filter(
              Boolean
            )

        );


      relValues.add(
        "noopener"
      );


      relValues.add(
        "noreferrer"
      );


      link.setAttribute(

        "rel",

        Array
          .from(
            relValues
          )
          .join(" ")

      );

    }
  );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function updateCurrentYear() {

  if (
    !currentYear
  ) {

    return;

  }


  currentYear.textContent =
    new Date()
      .getFullYear();

}


/* =========================================================
   BACK / FORWARD CACHE
========================================================= */

window.addEventListener(
  "pageshow",
  event => {

    if (
      !event.persisted
    ) {

      return;

    }


    closeMobileMenu();


    closeHisabFlowDemoModal();


    updateActiveNavigation();


    navbar
      ?.classList
      .toggle(
        "scrolled",
        window.scrollY > 30
      );

  }
);


/* =========================================================
   PAGE HIDDEN PERFORMANCE
========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    document
      .documentElement
      .classList
      .toggle(

        "page-hidden",

        document.hidden

      );

  }
);


/* =========================================================
   WINDOW BEFORE UNLOAD
   CLEAN UP VIDEO
========================================================= */

window.addEventListener(
  "beforeunload",
  () => {

    if (
      hisabflowDemoVideo
    ) {

      hisabflowDemoVideo.pause();

    }

  }
);