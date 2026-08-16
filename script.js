"use strict";

const body = document.body;
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const menuButton = document.getElementById("menuButton");
const menuClose = document.getElementById("menuClose");
const navOverlay = document.getElementById("navOverlay");
const themeButton = document.getElementById("themeButton");
const typingName = document.getElementById("typingName");
const introScreen = document.getElementById("introScreen");
const topButton = document.getElementById("topButton");
const contactForm = document.getElementById("contactForm");

const automationDemoButton =
  document.getElementById("automationDemoButton");

const automationModal =
  document.getElementById("automationModal");

const automationVideo =
  document.getElementById("automationVideo");

const hisabflowDemoButton =
  document.getElementById("hisabflowDemoButton");

const hisabflowModal =
  document.getElementById("hisabflowModal");

const hisabflowVideo =
  document.getElementById("hisabflowVideo");

const assistantButton =
  document.getElementById("assistantButton");

const assistantPanel =
  document.getElementById("assistantPanel");

const assistantClose =
  document.getElementById("assistantClose");

const assistantMessages =
  document.getElementById("assistantMessages");

const assistantForm =
  document.getElementById("assistantForm");

const assistantInput =
  document.getElementById("assistantInput");

const assistantApi =
  "https://masum-assistant-api.farabi13577.workers.dev/";

const fullName =
  "Md Raqibul Islam Masum";

let typingIndex = 0;
let typingTimer = null;
let assistantBusy = false;

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    window.scrollTo(0, 0);

    setupTheme();
    setupIntro();
    setupNavigation();
    setupSectionReveal();
    setupProjectAnimations();
    setupTabs();
    setupVideos();
    setupAssistant();
    setupContactForm();
    setupBackToTop();
    setupYear();
    setupActiveNavigation();
  }
);

function setupIntro() {
  if (!introScreen) {
    startTyping();
    return;
  }

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (reducedMotion) {
    introScreen.remove();
    startTyping();
    return;
  }

  setTimeout(() => {
    introScreen.classList.add("hide");

    setTimeout(() => {
      introScreen.remove();
      startTyping();
    }, 500);
  }, 1600);
}

function startTyping() {
  if (!typingName) return;

  clearTimeout(typingTimer);

  typingName.textContent = "";
  typingIndex = 0;

  function nextCharacter() {
    if (typingIndex >= fullName.length) {
      return;
    }

    typingName.textContent +=
      fullName.charAt(typingIndex);

    typingIndex += 1;

    typingTimer =
      setTimeout(
        nextCharacter,
        48
      );
  }

  nextCharacter();
}

function setupTheme() {
  let savedTheme = null;

  try {
    savedTheme =
      localStorage.getItem(
        "masum-theme"
      );
  } catch (error) {
    savedTheme = null;
  }

  if (savedTheme === "light") {
    body.classList.add(
      "light-theme"
    );
  }

  updateThemeIcon();

  themeButton?.addEventListener(
    "click",
    () => {
      body.classList.toggle(
        "light-theme"
      );

      try {
        localStorage.setItem(
          "masum-theme",
          body.classList.contains(
            "light-theme"
          )
            ? "light"
            : "dark"
        );
      } catch (error) {
      }

      updateThemeIcon();
    }
  );
}

function updateThemeIcon() {
  if (!themeButton) return;

  themeButton.innerHTML =
    body.classList.contains(
      "light-theme"
    )
      ? '<i class="fa-solid fa-moon"></i>'
      : '<i class="fa-solid fa-sun"></i>';
}

function setupNavigation() {
  menuButton?.addEventListener(
    "click",
    () => {
      navLinks?.classList.contains(
        "show"
      )
        ? closeMenu()
        : openMenu();
    }
  );

  menuClose?.addEventListener(
    "click",
    closeMenu
  );

  navOverlay?.addEventListener(
    "click",
    closeMenu
  );

  document
    .querySelectorAll(
      'a[href^="#"]:not([href="#"])'
    )
    .forEach(link => {
      link.addEventListener(
        "click",
        event => {
          const href =
            link.getAttribute(
              "href"
            );

          if (!href) return;

          const target =
            document.querySelector(
              href
            );

          if (!target) return;

          event.preventDefault();

          closeMenu();

          const navHeight =
            navbar?.offsetHeight ||
            75;

          const top =
            target
              .getBoundingClientRect()
              .top +
            window.scrollY -
            navHeight -
            16;

          window.scrollTo({
            top,
            behavior: "smooth"
          });
        }
      );
    });

  document.addEventListener(
    "keydown",
    event => {
      if (event.key !== "Escape") {
        return;
      }

      closeMenu();
      closeAssistant();

      closeVideoModal(
        automationModal,
        automationVideo
      );

      closeVideoModal(
        hisabflowModal,
        hisabflowVideo
      );
    }
  );

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 960) {
        closeMenu();
      }
    }
  );
}

function openMenu() {
  navLinks?.classList.add(
    "show"
  );

  navOverlay?.classList.add(
    "show"
  );

  body.classList.add(
    "no-scroll"
  );

  menuButton?.setAttribute(
    "aria-expanded",
    "true"
  );
}

function closeMenu() {
  navLinks?.classList.remove(
    "show"
  );

  navOverlay?.classList.remove(
    "show"
  );

  menuButton?.setAttribute(
    "aria-expanded",
    "false"
  );

  if (
    !automationModal?.classList.contains(
      "show"
    ) &&
    !hisabflowModal?.classList.contains(
      "show"
    )
  ) {
    body.classList.remove(
      "no-scroll"
    );
  }
}

function setupSectionReveal() {
  const elements =
    document.querySelectorAll(
      ".section-reveal"
    );

  if (
    !elements.length ||
    !("IntersectionObserver" in window)
  ) {
    elements.forEach(element => {
      element.classList.add(
        "visible"
      );
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.06,
        rootMargin:
          "0px 0px -40px 0px"
      }
    );

  elements.forEach(element => {
    observer.observe(element);
  });
}

function setupProjectAnimations() {
  const cards =
    document.querySelectorAll(
      "[data-project-card]"
    );

  if (
    !cards.length ||
    !("IntersectionObserver" in window)
  ) {
    cards.forEach(card => {
      card.classList.add(
        "in-view"
      );
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "in-view"
          );

          observer.unobserve(
            entry.target
          );
        });
      },
      {
        threshold: 0.09,
        rootMargin:
          "0px 0px -45px 0px"
      }
    );

  cards.forEach(card => {
    observer.observe(card);
  });
}

function setupTabs() {
  const buttons =
    document.querySelectorAll(
      ".skill-tab[data-tab]"
    );

  const panels =
    document.querySelectorAll(
      ".skill-panel"
    );

  buttons.forEach(button => {
    button.addEventListener(
      "click",
      () => {
        const targetId =
          button.dataset.tab;

        const target =
          document.getElementById(
            targetId
          );

        if (!target) return;

        buttons.forEach(item => {
          item.classList.remove(
            "active"
          );

          item.setAttribute(
            "aria-selected",
            "false"
          );
        });

        panels.forEach(panel => {
          panel.classList.remove(
            "active"
          );
        });

        button.classList.add(
          "active"
        );

        button.setAttribute(
          "aria-selected",
          "true"
        );

        target.classList.add(
          "active"
        );

        if (
          targetId ===
          "workPanel"
        ) {
          animateWorkFocus(
            target
          );
        }
      }
    );
  });
}

function animateWorkFocus(panel) {
  const items =
    panel.querySelectorAll(
      ".work-timeline article"
    );

  items.forEach(item => {
    item.classList.remove(
      "timeline-show"
    );
  });

  requestAnimationFrame(() => {
    items.forEach(
      (item, index) => {
        setTimeout(() => {
          item.classList.add(
            "timeline-show"
          );
        }, index * 115);
      }
    );
  });
}

function setupVideos() {
  automationDemoButton?.addEventListener(
    "click",
    () => {
      openVideoModal(
        automationModal,
        automationVideo
      );
    }
  );

  document
    .querySelectorAll(
      "[data-close-modal]"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          closeVideoModal(
            automationModal,
            automationVideo
          );
        }
      );
    });

  hisabflowDemoButton?.addEventListener(
    "click",
    () => {
      openVideoModal(
        hisabflowModal,
        hisabflowVideo
      );
    }
  );

  document
    .querySelectorAll(
      "[data-close-hisabflow]"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          closeVideoModal(
            hisabflowModal,
            hisabflowVideo
          );
        }
      );
    });
}

function openVideoModal(
  modal,
  video
) {
  if (!modal || !video) {
    return;
  }

  const source =
    video.dataset.src;

  if (
    source &&
    !video.getAttribute("src")
  ) {
    video.src = source;
    video.load();
  }

  modal.classList.add(
    "show"
  );

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  body.classList.add(
    "no-scroll"
  );

  video
    .play()
    .catch(() => {});
}

function closeVideoModal(
  modal,
  video
) {
  if (!modal || !video) {
    return;
  }

  modal.classList.remove(
    "show"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  video.pause();

  video.removeAttribute(
    "src"
  );

  video.load();

  body.classList.remove(
    "no-scroll"
  );
}

function setupAssistant() {
  assistantButton?.addEventListener(
    "click",
    () => {
      const open =
        assistantPanel
          ?.classList
          .toggle("show");

      assistantPanel?.setAttribute(
        "aria-hidden",
        open
          ? "false"
          : "true"
      );

      if (open) {
        setTimeout(() => {
          assistantInput?.focus();
        }, 120);
      }
    }
  );

  assistantClose?.addEventListener(
    "click",
    closeAssistant
  );

  document
    .querySelectorAll(
      "[data-question]"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          handleQuickQuestion(
            button.dataset.question
          );
        }
      );
    });

  assistantForm?.addEventListener(
    "submit",
    async event => {
      event.preventDefault();

      if (assistantBusy) {
        return;
      }

      const question =
        assistantInput
          ?.value
          .trim();

      if (!question) {
        return;
      }

      assistantInput.value =
        "";

      await askAssistant(
        question
      );
    }
  );
}

function closeAssistant() {
  assistantPanel?.classList.remove(
    "show"
  );

  assistantPanel?.setAttribute(
    "aria-hidden",
    "true"
  );
}

async function handleQuickQuestion(
  type
) {
  if (assistantBusy) {
    return;
  }

  const questions = {
    automation:
      "Tell me about your spreadsheet automation.",
    hisabflow:
      "Tell me about HisabFlow.",
    websites:
      "Which websites did you build?",
    contact:
      "How can I contact you?"
  };

  const question =
    questions[type];

  if (!question) {
    return;
  }

  await askAssistant(
    question
  );
}

async function askAssistant(
  question
) {
  addAssistantMessage(
    question,
    "user"
  );

  showThinking();

  setAssistantBusy(
    true
  );

  try {
    const reply =
      await requestAssistantReply(
        question
      );

    removeThinking();

    addAssistantMessage(
      reply,
      "bot"
    );
  } catch (error) {
    removeThinking();

    addAssistantMessage(
      getLocalAssistantReply(
        question
      ),
      "bot"
    );
  } finally {
    setAssistantBusy(
      false
    );
  }
}

async function requestAssistantReply(
  message
) {
  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () => {
        controller.abort();
      },
      30000
    );

  try {
    const response =
      await fetch(
        assistantApi,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({
              message
            }),

          signal:
            controller.signal
        }
      );

    const data =
      await response.json();

    if (
      !response.ok ||
      !data ||
      data.success !== true ||
      typeof data.reply !==
        "string" ||
      !data.reply.trim()
    ) {
      throw new Error(
        "Assistant API error"
      );
    }

    return data.reply.trim();
  } finally {
    clearTimeout(
      timeout
    );
  }
}

function addAssistantMessage(
  text,
  sender
) {
  if (!assistantMessages) {
    return;
  }

  const wrapper =
    document.createElement(
      "div"
    );

  wrapper.className =
    `assistant-message ${sender}`;

  if (sender === "bot") {
    const avatar =
      document.createElement(
        "span"
      );

    avatar.className =
      "message-avatar";

    avatar.textContent =
      "M";

    wrapper.appendChild(
      avatar
    );
  }

  const content =
    document.createElement(
      "div"
    );

  content.textContent =
    text;

  wrapper.appendChild(
    content
  );

  assistantMessages.appendChild(
    wrapper
  );

  scrollAssistant();
}

function showThinking() {
  if (!assistantMessages) {
    return;
  }

  removeThinking();

  const row =
    document.createElement(
      "div"
    );

  row.className =
    "assistant-thinking-row";

  row.id =
    "assistantThinking";

  row.innerHTML = `
    <div class="assistant-thinking-text">
      <span>Thinking</span>
      <div class="thinking-dots">
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  `;

  assistantMessages.appendChild(
    row
  );

  scrollAssistant();
}

function removeThinking() {
  document
    .getElementById(
      "assistantThinking"
    )
    ?.remove();
}

function scrollAssistant() {
  if (!assistantMessages) {
    return;
  }

  requestAnimationFrame(
    () => {
      assistantMessages.scrollTop =
        assistantMessages.scrollHeight;
    }
  );
}

function setAssistantBusy(
  busy
) {
  assistantBusy =
    busy;

  if (assistantInput) {
    assistantInput.disabled =
      busy;

    assistantInput.placeholder =
      busy
        ? "Masum Assistant is thinking..."
        : "Ask about services or projects...";
  }

  const submit =
    assistantForm
      ?.querySelector(
        "button[type='submit']"
      );

  if (submit) {
    submit.disabled =
      busy;
  }

  document
    .querySelectorAll(
      "[data-question]"
    )
    .forEach(button => {
      button.disabled =
        busy;
    });
}

function normalizeQuestion(
  text
) {
  return text
    .toLowerCase()
    .trim()
    .replace(
      /[?!.,;:'"()]/g,
      " "
    )
    .replace(
      /\s+/g,
      " "
    );
}

function includesAny(
  text,
  words
) {
  return words.some(
    word =>
      text.includes(word)
  );
}

function getLocalAssistantReply(
  question
) {
  const q =
    normalizeQuestion(
      question
    );

  if (
    includesAny(
      q,
      [
        "assalamualaikum",
        "assalamu alaikum",
        "salam",
        "আসসালামু আলাইকুম"
      ]
    )
  ) {
    return "Wa Alaikum Assalam! 👋 I'm Masum Assistant. You can ask me about Spreadsheet Automation, HisabFlow, websites, services or contact information.";
  }

  if (
    includesAny(
      q,
      [
        "inventory",
        "stock",
        "reconciliation",
        "spreadsheet",
        "excel",
        "google sheet",
        "automation",
        "formula",
        "dashboard",
        "report"
      ]
    )
  ) {
    return "Masum builds advanced Excel and Google Sheets automation systems including Stock In/Out, inventory, sales, product pricing, cash collection, deposits, pending amounts, reconciliation, advanced formulas, dashboards and dynamic business reports.";
  }

  if (
    includesAny(
      q,
      [
        "hisabflow",
        "hisab flow",
        "calculator",
        "android",
        "mobile app",
        "expense",
        "cash counter"
      ]
    )
  ) {
    return "HisabFlow 2.0 is a Flutter Android application combining a Smart Calculator, AI Assistant, Daily Income & Expense, Cash Counter BD, Best Buy Compare, Smart Bill Split, Google Login, Cloud Backup, App Lock and other practical utilities.";
  }

  if (
    includesAny(
      q,
      [
        "website",
        "portfolio",
        "muneeba",
        "mezbah",
        "mizanur"
      ]
    )
  ) {
    return "Featured website projects include Muneeba Medicine Center, Mezbah Uddin Portfolio and Mizanur Rahman Portfolio. You can open each live website from the Projects section.";
  }

  if (
    includesAny(
      q,
      [
        "contact",
        "phone",
        "whatsapp",
        "email",
        "hire"
      ]
    )
  ) {
    return "You can contact Md Raqibul Islam Masum by WhatsApp or phone at +880 1820-806464 or by email at masumtech.dev@gmail.com.";
  }

  return "Masum Assistant is temporarily unable to get the full AI reply. You can still ask about Spreadsheet Automation, HisabFlow, websites, services or contact information.";
}

function setupContactForm() {
  if (!contactForm) {
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
          .trim() || "";

      const email =
        document
          .getElementById(
            "contactEmail"
          )
          ?.value
          .trim() || "";

      const subject =
        document
          .getElementById(
            "contactSubject"
          )
          ?.value
          .trim() || "";

      const message =
        document
          .getElementById(
            "contactMessage"
          )
          ?.value
          .trim() || "";

      if (
        !name ||
        !email ||
        !subject ||
        !message
      ) {
        return;
      }

      const text =
`Hello Masum Tech,

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent from Masum Technical Support Bangladesh Portfolio`;

      const url =
        "https://wa.me/8801820806464?text=" +
        encodeURIComponent(
          text
        );

      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );
    }
  );
}

function setupBackToTop() {
  function update() {
    navbar?.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

    topButton?.classList.toggle(
      "show",
      window.scrollY > 450
    );
  }

  window.addEventListener(
    "scroll",
    update,
    {
      passive: true
    }
  );

  update();

  topButton?.addEventListener(
    "click",
    () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );
}

function setupYear() {
  const year =
    document.getElementById(
      "year"
    );

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }
}

function setupActiveNavigation() {
  const links =
    Array.from(
      document.querySelectorAll(
        ".nav-links a[href^='#']"
      )
    );

  const sections =
    Array.from(
      document.querySelectorAll(
        "main section[id]"
      )
    );

  if (
    !links.length ||
    !sections.length
  ) {
    return;
  }

  function update() {
    const marker =
      window.scrollY + 170;

    let current =
      sections[0]?.id ||
      "home";

    sections.forEach(
      section => {
        if (
          marker >=
          section.offsetTop
        ) {
          current =
            section.id;
        }
      }
    );

    links.forEach(
      link => {
        link.classList.toggle(
          "active",
          link.getAttribute(
            "href"
          ) ===
            `#${current}`
        );
      }
    );
  }

  window.addEventListener(
    "scroll",
    update,
    {
      passive: true
    }
  );

  update();
}

window.addEventListener(
  "pageshow",
  event => {
    if (event.persisted) {
      window.scrollTo(
        0,
        0
      );
    }
  }
);

window.addEventListener(
  "beforeunload",
  () => {
    document
      .querySelectorAll(
        "video"
      )
      .forEach(
        video => {
          video.pause();
        }
      );
  }
);