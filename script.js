"use strict";

const AI_ENDPOINT =
  "https://masum-assistant-api.farabi13577.workers.dev/";

const body =
  document.body;

const navbar =
  document.getElementById("navbar");

const navLinks =
  document.getElementById("navLinks");

const menuButton =
  document.getElementById("menuButton");

const menuClose =
  document.getElementById("menuClose");

const navOverlay =
  document.getElementById("navOverlay");

const themeButton =
  document.getElementById("themeButton");

const typingName =
  document.getElementById("typingName");

const introScreen =
  document.getElementById("introScreen");

const topButton =
  document.getElementById("topButton");

const contactForm =
  document.getElementById("contactForm");

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

const fullName =
  "Md Raqibul Islam Masum";

let typingIndex = 0;
let typingTimer = null;
let assistantBusy = false;

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializePortfolio
  );
} else {
  initializePortfolio();
}

function initializePortfolio() {
  window.scrollTo(0, 0);

  setupTheme();
  setupIntro();
  setupNavigation();
  setupReveal();
  setupProjectAnimations();
  setupSkillTabs();
  setupVideos();
  setupContactForm();
  setupAssistant();
  setupAssistantViewport();
  setupBackToTop();
  setupYear();

  window.addEventListener(
    "load",
    () => {
      window.scrollTo(0, 0);
    },
    {
      once: true
    }
  );
}

function setupIntro() {
  if (!introScreen) {
    startTyping();
    return;
  }

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (reduceMotion) {
    introScreen.remove();
    startTyping();
    return;
  }

  setTimeout(
    () => {
      introScreen.classList.add("hide");

      setTimeout(
        () => {
          introScreen.remove();
          startTyping();
        },
        470
      );
    },
    1650
  );
}

function startTyping() {
  if (!typingName) {
    return;
  }

  clearTimeout(typingTimer);

  typingName.textContent = "";
  typingIndex = 0;

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (reduceMotion) {
    typingName.textContent = fullName;
    return;
  }

  function typeNext() {
    if (
      typingIndex >=
      fullName.length
    ) {
      return;
    }

    typingName.textContent +=
      fullName.charAt(
        typingIndex
      );

    typingIndex += 1;

    typingTimer =
      setTimeout(
        typeNext,
        47
      );
  }

  typeNext();
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
        console.warn(
          "Theme preference could not be saved."
        );
      }

      updateThemeIcon();
    }
  );
}

function updateThemeIcon() {
  const icon =
    themeButton?.querySelector("i");

  if (!icon) {
    return;
  }

  icon.className =
    body.classList.contains(
      "light-theme"
    )
      ? "fa-solid fa-moon"
      : "fa-solid fa-sun";
}

function setupNavigation() {
  menuButton?.addEventListener(
    "click",
    openMenu
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
    .forEach(
      link => {
        link.addEventListener(
          "click",
          event => {
            const selector =
              link.getAttribute(
                "href"
              );

            if (!selector) {
              return;
            }

            const target =
              document.querySelector(
                selector
              );

            if (!target) {
              return;
            }

            event.preventDefault();

            closeMenu();

            const navHeight =
              navbar?.offsetHeight ||
              66;

            const targetTop =
              target
                .getBoundingClientRect()
                .top +
              window.scrollY -
              navHeight -
              8;

            window.scrollTo({
              top: Math.max(
                0,
                targetTop
              ),
              behavior: "smooth"
            });
          }
        );
      }
    );

  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    () => {
      if (
        window.innerWidth > 820
      ) {
        closeMenu();
      }
    }
  );

  handleScroll();
}

function openMenu() {
  navLinks?.classList.add(
    "show"
  );

  navOverlay?.classList.add(
    "show"
  );

  menuButton?.setAttribute(
    "aria-expanded",
    "true"
  );

  body.classList.add(
    "no-scroll"
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
    !automationModal
      ?.classList
      .contains("show") &&
    !hisabflowModal
      ?.classList
      .contains("show") &&
    !assistantPanel
      ?.classList
      .contains("show")
  ) {
    body.classList.remove(
      "no-scroll"
    );
  }
}

function handleScroll() {
  navbar?.classList.toggle(
    "scrolled",
    window.scrollY > 25
  );

  updateActiveNavigation();

  topButton?.classList.toggle(
    "show",
    window.scrollY > 430
  );
}

function updateActiveNavigation() {
  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  let current =
    "home";

  const position =
    window.scrollY + 130;

  sections.forEach(
    section => {
      if (
        position >=
        section.offsetTop
      ) {
        current =
          section.id;
      }
    }
  );

  document
    .querySelectorAll(
      '.nav-links a[href^="#"]'
    )
    .forEach(
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

function setupReveal() {
  const elements =
    document.querySelectorAll(
      ".section-reveal"
    );

  if (
    !(
      "IntersectionObserver" in
      window
    )
  ) {
    elements.forEach(
      element => {
        element.classList.add(
          "visible"
        );
      }
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      entries => {
        entries.forEach(
          entry => {
            if (
              !entry.isIntersecting
            ) {
              return;
            }

            entry.target
              .classList
              .add("visible");

            observer.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold: 0.05,
        rootMargin:
          "0px 0px -25px 0px"
      }
    );

  elements.forEach(
    element => {
      observer.observe(
        element
      );
    }
  );
}

function setupProjectAnimations() {
  const elements =
    document.querySelectorAll(
      "[data-project-card]"
    );

  if (
    !(
      "IntersectionObserver" in
      window
    )
  ) {
    elements.forEach(
      element => {
        element.classList.add(
          "project-visible"
        );
      }
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      entries => {
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
                "project-visible"
              );

            observer.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold: 0.12,
        rootMargin:
          "0px 0px -30px 0px"
      }
    );

  elements.forEach(
    element => {
      observer.observe(
        element
      );
    }
  );
}

function setupSkillTabs() {
  const buttons =
    document.querySelectorAll(
      ".skill-tab"
    );

  const panels =
    document.querySelectorAll(
      ".skill-panel"
    );

  buttons.forEach(
    button => {
      button.addEventListener(
        "click",
        () => {
          const panelId =
            button.dataset.tab;

          const panel =
            document.getElementById(
              panelId
            );

          if (!panel) {
            return;
          }

          buttons.forEach(
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

          panels.forEach(
            item => {
              item.classList.remove(
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

          panel.classList.add(
            "active"
          );
        }
      );
    }
  );
}

function setupVideos() {
  automationDemoButton
    ?.addEventListener(
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
    .forEach(
      element => {
        element.addEventListener(
          "click",
          () => {
            closeVideoModal(
              automationModal,
              automationVideo
            );
          }
        );
      }
    );

  hisabflowDemoButton
    ?.addEventListener(
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
    .forEach(
      element => {
        element.addEventListener(
          "click",
          () => {
            closeVideoModal(
              hisabflowModal,
              hisabflowVideo
            );
          }
        );
      }
    );

  document.addEventListener(
    "keydown",
    event => {
      if (
        event.key !== "Escape"
      ) {
        return;
      }

      if (
        automationModal
          ?.classList
          .contains("show")
      ) {
        closeVideoModal(
          automationModal,
          automationVideo
        );
      }

      if (
        hisabflowModal
          ?.classList
          .contains("show")
      ) {
        closeVideoModal(
          hisabflowModal,
          hisabflowVideo
        );
      }

      closeMenu();
      closeAssistant();
    }
  );
}

function openVideoModal(
  modal,
  video
) {
  if (
    !modal ||
    !video
  ) {
    return;
  }

  const source =
    video.dataset.src;

  if (
    source &&
    !video.getAttribute(
      "src"
    )
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

  const playPromise =
    video.play();

  if (
    playPromise &&
    typeof playPromise.catch ===
      "function"
  ) {
    playPromise.catch(
      () => {}
    );
  }
}

function closeVideoModal(
  modal,
  video
) {
  if (
    !modal ||
    !video
  ) {
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

  try {
    video.currentTime = 0;
  } catch (error) {
    console.warn(
      "Video reset failed."
    );
  }

  video.removeAttribute(
    "src"
  );

  video.load();

  if (
    !assistantPanel
      ?.classList
      .contains("show")
  ) {
    body.classList.remove(
      "no-scroll"
    );
  }
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

      const newWindow =
        window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );

      if (!newWindow) {
        window.location.href =
          url;
      }
    }
  );
}

function setupAssistant() {
  assistantButton
    ?.addEventListener(
      "click",
      () => {
        if (
          assistantPanel
            ?.classList
            .contains("show")
        ) {
          closeAssistant();
        } else {
          openAssistant();
        }
      }
    );

  assistantClose
    ?.addEventListener(
      "click",
      closeAssistant
    );

  document
    .querySelectorAll(
      "[data-question]"
    )
    .forEach(
      button => {
        button.addEventListener(
          "click",
          () => {
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
              questions[
                button.dataset
                  .question
              ];

            if (!question) {
              return;
            }

            sendAssistantQuestion(
              question
            );
          }
        );
      }
    );

  assistantForm
    ?.addEventListener(
      "submit",
      event => {
        event.preventDefault();

        const question =
          assistantInput
            ?.value
            .trim();

        if (
          !question ||
          assistantBusy
        ) {
          return;
        }

        assistantInput.value =
          "";

        sendAssistantQuestion(
          question
        );
      }
    );

  assistantInput
    ?.addEventListener(
      "focus",
      () => {
        body.classList.add(
          "assistant-open"
        );

        setTimeout(
          syncAssistantViewport,
          80
        );

        setTimeout(
          scrollAssistantBottom,
          150
        );
      }
    );

  assistantInput
    ?.addEventListener(
      "blur",
      () => {
        setTimeout(
          syncAssistantViewport,
          120
        );
      }
    );
}

function openAssistant() {
  if (!assistantPanel) {
    return;
  }

  closeMenu();

  assistantPanel.classList.add(
    "show"
  );

  assistantPanel.setAttribute(
    "aria-hidden",
    "false"
  );

  body.classList.add(
    "assistant-open"
  );

  syncAssistantViewport();

  setTimeout(
    scrollAssistantBottom,
    50
  );
}

function closeAssistant() {
  if (!assistantPanel) {
    return;
  }

  assistantPanel.classList.remove(
    "show"
  );

  assistantPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  body.classList.remove(
    "assistant-open"
  );

  resetAssistantViewport();

  assistantInput?.blur();
}

async function sendAssistantQuestion(
  question
) {
  if (
    !question ||
    assistantBusy
  ) {
    return;
  }

  openAssistant();

  addAssistantMessage(
    question,
    "user"
  );

  assistantBusy = true;

  setAssistantSubmitState(
    true
  );

  showThinkingIndicator();

  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () => {
        controller.abort();
      },
      35000
    );

  try {
    const response =
      await fetch(
        AI_ENDPOINT,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            message: question
          }),
          signal:
            controller.signal
        }
      );

    const rawText =
      await response.text();

    let data = null;

    try {
      data =
        JSON.parse(
          rawText
        );
    } catch (error) {
      data = null;
    }

    if (
      !response.ok ||
      !data
    ) {
      throw new Error(
        "Assistant request failed."
      );
    }

    const reply =
      typeof data.reply ===
        "string"
        ? data.reply.trim()
        : "";

    if (!reply) {
      throw new Error(
        "Assistant returned no reply."
      );
    }

    removeThinkingIndicator();

    addAssistantMessage(
      reply,
      "bot"
    );
  } catch (error) {
    removeThinkingIndicator();

    if (
      error.name ===
      "AbortError"
    ) {
      addAssistantMessage(
        "The response is taking longer than expected. Please try again.",
        "bot"
      );
    } else {
      addAssistantMessage(
        "Masum Assistant is temporarily unable to answer. Please try again shortly.",
        "bot"
      );
    }
  } finally {
    clearTimeout(
      timeout
    );

    assistantBusy =
      false;

    setAssistantSubmitState(
      false
    );

    scrollAssistantBottom();
  }
}

function addAssistantMessage(
  text,
  sender
) {
  if (
    !assistantMessages
  ) {
    return;
  }

  const wrapper =
    document.createElement(
      "div"
    );

  wrapper.className =
    `assistant-message ${sender}`;

  if (
    sender === "bot"
  ) {
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

  const message =
    document.createElement(
      "div"
    );

  message.textContent =
    text;

  wrapper.appendChild(
    message
  );

  assistantMessages
    .appendChild(
      wrapper
    );

  scrollAssistantBottom();
}

function showThinkingIndicator() {
  if (
    !assistantMessages
  ) {
    return;
  }

  removeThinkingIndicator();

  const wrapper =
    document.createElement(
      "div"
    );

  wrapper.id =
    "assistantThinking";

  wrapper.className =
    "assistant-thinking";

  const content =
    document.createElement(
      "div"
    );

  const text =
    document.createElement(
      "span"
    );

  text.textContent =
    "Thinking";

  const dots =
    document.createElement(
      "span"
    );

  dots.className =
    "thinking-dots";

  for (
    let index = 0;
    index < 3;
    index += 1
  ) {
    const dot =
      document.createElement(
        "i"
      );

    dots.appendChild(
      dot
    );
  }

  content.appendChild(
    text
  );

  content.appendChild(
    dots
  );

  wrapper.appendChild(
    content
  );

  assistantMessages
    .appendChild(
      wrapper
    );

  scrollAssistantBottom();
}

function removeThinkingIndicator() {
  document
    .getElementById(
      "assistantThinking"
    )
    ?.remove();
}

function setAssistantSubmitState(
  busy
) {
  const button =
    assistantForm
      ?.querySelector(
        'button[type="submit"]'
      );

  if (!button) {
    return;
  }

  button.disabled =
    busy;

  button.innerHTML =
    busy
      ? '<i class="fa-solid fa-spinner fa-spin"></i>'
      : '<i class="fa-solid fa-arrow-up"></i>';
}

function scrollAssistantBottom() {
  if (
    !assistantMessages
  ) {
    return;
  }

  requestAnimationFrame(
    () => {
      assistantMessages
        .scrollTop =
        assistantMessages
          .scrollHeight;
    }
  );
}

function setupAssistantViewport() {
  if (
    !window.visualViewport
  ) {
    return;
  }

  window.visualViewport
    .addEventListener(
      "resize",
      syncAssistantViewport
    );

  window.visualViewport
    .addEventListener(
      "scroll",
      syncAssistantViewport
    );

  window.addEventListener(
    "orientationchange",
    () => {
      setTimeout(
        syncAssistantViewport,
        250
      );
    }
  );

  window.addEventListener(
    "resize",
    () => {
      if (
        assistantPanel
          ?.classList
          .contains("show")
      ) {
        syncAssistantViewport();
      }
    }
  );
}

function syncAssistantViewport() {
  if (
    !assistantPanel ||
    !assistantPanel
      .classList
      .contains("show")
  ) {
    return;
  }

  if (
    !window.matchMedia(
      "(max-width: 650px)"
    ).matches
  ) {
    resetAssistantViewport();
    return;
  }

  const viewport =
    window.visualViewport;

  if (!viewport) {
    return;
  }

  const keyboardDifference =
    window.innerHeight -
    viewport.height;

  const keyboardOpen =
    keyboardDifference > 120;

  if (!keyboardOpen) {
    resetAssistantViewport();
    return;
  }

  const gap = 8;

  const availableHeight =
    Math.max(
      280,
      viewport.height -
        gap * 2
    );

  assistantPanel.style.top =
    `${viewport.offsetTop + gap}px`;

  assistantPanel.style.bottom =
    "auto";

  assistantPanel.style.height =
    `${availableHeight}px`;

  assistantPanel.style.maxHeight =
    `${availableHeight}px`;

  scrollAssistantBottom();
}

function resetAssistantViewport() {
  if (!assistantPanel) {
    return;
  }

  assistantPanel.style
    .removeProperty("top");

  assistantPanel.style
    .removeProperty("bottom");

  assistantPanel.style
    .removeProperty("height");

  assistantPanel.style
    .removeProperty(
      "max-height"
    );
}

function setupBackToTop() {
  topButton
    ?.addEventListener(
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
      new Date()
        .getFullYear();
  }
}

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