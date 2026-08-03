// ==========================================================================
// Ask Sai — offline portfolio assistant (UI + interaction logic)
//
// This is NOT a chatbot backed by an external AI API. It matches typed
// text against the local knowledge base in assistant-data.js using the
// matcher in assistant-matcher.js. No network requests are made from this
// file — search your browser's Network tab while using it to confirm.
//
// To change what the assistant knows, edit js/assistant-data.js.
// To change contact details, edit js/assistant-config.js.
// This file only needs to change if you want to change *behavior*.
// ==========================================================================

(function () {
  const root = document.getElementById("askSaiRoot");
  if (!root) return;

  const SESSION_KEY = "askSaiSession";
  const POPULAR_KEY = "askSaiPopularQuestions";
  const dataById = {};
  portfolioAssistantData.forEach((entry) => (dataById[entry.id] = entry));

  // Admin-added Q&A (js/admin-panel.js, "Chatbot Knowledge" tab) is stored
  // separately in localStorage via window.ChatbotCustomStore and merged in
  // here at call time, so newly added questions work without a page reload.
  function allEntries() {
    const custom = window.ChatbotCustomStore ? window.ChatbotCustomStore.getAll() : [];
    return portfolioAssistantData.concat(custom);
  }

  function findEntryById(id) {
    if (dataById[id]) return dataById[id];
    const custom = window.ChatbotCustomStore ? window.ChatbotCustomStore.getAll() : [];
    return custom.filter(function (e) { return e.id === id; })[0];
  }

  const initialSuggestionIds = ["java-experience", "sap-skills-general", "contact-general"];
  const initialSuggestionLabels = {
    "java-experience": "Java experience",
    "sap-skills-general": "SAP skills",
    "contact-general": "Contact Sai",
  };

  // ---------------------------------------------------------- DOM helpers
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        if (key === "class") node.className = attrs[key];
        else if (key === "text") node.textContent = attrs[key];
        else if (key.indexOf("on") === 0 && typeof attrs[key] === "function") {
          node.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
        } else node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach((child) => {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function icon(pathData, viewBox) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", viewBox || "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1.8");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    return svg;
  }

  // ---------------------------------------------------------- markup shell
  const messagesEl = el("div", {
    class: "ask-sai-messages",
    id: "askSaiMessages",
    role: "log",
    "aria-live": "polite",
    "aria-relevant": "additions",
  });

  const suggestionsEl = el("div", { class: "ask-sai-suggestions", id: "askSaiSuggestions" });

  const inputEl = el("input", {
    type: "text",
    id: "askSaiInput",
    placeholder: "Ask about my experience…",
    autocomplete: "off",
    "aria-label": "Ask a question about Sai's skills, experience, projects, or contact information",
  });

  const formEl = el(
    "form",
    { class: "ask-sai-form", id: "askSaiForm" },
    [
      inputEl,
      el("button", { type: "submit", class: "ask-sai-send", "aria-label": "Send question" }, [
        icon("M5 12h14M13 6l6 6-6 6"),
      ]),
    ]
  );

  const resetBtn = el("button", {
    type: "button",
    class: "ask-sai-reset",
    text: "Reset conversation",
    onclick: resetConversation,
  });

  const card = el("div", { class: "ask-sai", id: "askSai", role: "region", "aria-label": "Ask Sai, offline portfolio assistant" }, [
    el("div", { class: "ask-sai-header" }, [
      el("div", {}, [
        el("h2", { class: "ask-sai-title", text: "Ask Sai" }),
        el("p", { class: "ask-sai-subtitle", text: "Ask about my skills, experience, projects, or contact information." }),
      ]),
      el("span", { class: "ask-sai-status" }, [
        el("span", { class: "ask-sai-status-dot", "aria-hidden": "true" }),
        document.createTextNode("Offline assistant"),
      ]),
    ]),
    messagesEl,
    suggestionsEl,
    formEl,
    resetBtn,
  ]);

  root.appendChild(card);

  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = "";
    handleQuestion(text);
  });

  // ---------------------------------------------------------- rendering
  function bubble(role, text) {
    return el("div", { class: "ask-sai-bubble ask-sai-bubble-" + role }, [
      el("p", { text: text }),
    ]);
  }

  function typingBubble() {
    return el("div", { class: "ask-sai-bubble ask-sai-bubble-assistant ask-sai-typing", id: "askSaiTyping" }, [
      el("span", { class: "ask-sai-dot" }),
      el("span", { class: "ask-sai-dot" }),
      el("span", { class: "ask-sai-dot" }),
    ]);
  }

  function proofLink(proof) {
    const isInternal = proof.target && proof.target.indexOf("#") === 0;
    const attrs = {
      class: "ask-sai-chip ask-sai-chip-proof",
      href: proof.target,
    };
    if (!isInternal) {
      attrs.target = "_blank";
      attrs.rel = "noopener";
    }
    const a = el("a", attrs, [document.createTextNode(proof.label)]);
    if (isInternal) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        scrollToSection(proof.target);
      });
    }
    return a;
  }

  function scrollToSection(hash) {
    const targetEl = document.querySelector(hash);
    if (!targetEl) return;
    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    targetEl.classList.add("ask-sai-highlight");
    window.setTimeout(function () {
      targetEl.classList.remove("ask-sai-highlight");
    }, 1500);
  }

  function copyButton(label, value) {
    const btn = el("button", { type: "button", class: "ask-sai-chip ask-sai-chip-action", text: label });
    btn.addEventListener("click", function () {
      const restore = label;
      copyToClipboard(value).then(function (ok) {
        btn.textContent = ok ? "Copied!" : "Copy failed";
        window.setTimeout(function () {
          btn.textContent = restore;
        }, 1600);
      });
    });
    return btn;
  }

  function copyToClipboard(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value).then(
        function () { return true; },
        function () { return false; }
      );
    }
    return Promise.resolve(false);
  }

  function linkChip(label, href) {
    return el("a", { class: "ask-sai-chip ask-sai-chip-action", href: href, target: "_blank", rel: "noopener" }, [
      document.createTextNode(label),
    ]);
  }

  function specialChips(special) {
    const chips = [];
    if (special === "contact-all" || special === "contact-email") {
      chips.push(copyButton("Copy email", portfolioConfig.email));
      chips.push(linkChip("Email Sai", "mailto:" + portfolioConfig.email));
    }
    if (special === "contact-all" || special === "contact-phone") {
      if (portfolioConfig.showPhone) {
        chips.push(copyButton("Copy phone number", portfolioConfig.phoneDisplay));
      }
    }
    if (special === "contact-all" || special === "contact-linkedin") {
      chips.push(linkChip("Open LinkedIn", portfolioConfig.linkedin));
    }
    if (special === "contact-all" || special === "contact-github") {
      chips.push(linkChip("Open GitHub", portfolioConfig.github));
    }
    if (special === "availability") {
      chips.push(copyButton("Copy email", portfolioConfig.email));
      chips.push(linkChip("Open LinkedIn", portfolioConfig.linkedin));
    }
    return chips;
  }

  function answerBlock(entry) {
    const wrap = el("div", { class: "ask-sai-answer" });
    wrap.appendChild(el("p", { class: "ask-sai-answer-text", text: buildAnswerText(entry) }));

    const chips = [];
    (entry.proof || []).forEach((p) => chips.push(proofLink(p)));
    specialChips(entry.special).forEach((c) => chips.push(c));

    if (chips.length) {
      const chipRow = el("div", { class: "ask-sai-chip-row" });
      chips.forEach((c) => chipRow.appendChild(c));
      wrap.appendChild(chipRow);
    }

    if (entry.relatedQuestions && entry.relatedQuestions.length) {
      const relWrap = el("div", { class: "ask-sai-related" });
      relWrap.appendChild(el("p", { class: "ask-sai-related-label", text: "Related questions" }));
      const relRow = el("div", { class: "ask-sai-chip-row" });
      entry.relatedQuestions.slice(0, 3).forEach((q) => {
        const btn = el("button", { type: "button", class: "ask-sai-chip ask-sai-chip-related", text: q });
        btn.addEventListener("click", function () {
          handleQuestion(q);
        });
        relRow.appendChild(btn);
      });
      relWrap.appendChild(relRow);
      wrap.appendChild(relWrap);
    }

    return wrap;
  }

  function buildAnswerText(entry) {
    if (entry.special === "contact-email") {
      return "You can contact Sai by email at: " + portfolioConfig.email;
    }
    if (entry.special === "contact-phone") {
      return portfolioConfig.showPhone
        ? "You can contact Sai at: " + portfolioConfig.phoneDisplay
        : "Sai's phone number isn't published here — email or LinkedIn are the best ways to reach him.";
    }
    if (entry.special === "contact-linkedin") {
      return "Sai's LinkedIn profile is " + portfolioConfig.linkedinDisplay + ".";
    }
    if (entry.special === "contact-github") {
      return "Sai's GitHub profile is " + portfolioConfig.githubDisplay + ".";
    }
    return entry.answer;
  }

  function fallbackBlock(rawInput) {
    const wrap = el("div", { class: "ask-sai-answer" });
    wrap.appendChild(
      el("p", {
        class: "ask-sai-answer-text",
        text:
          "I don’t have a saved answer for that question yet. Try asking about skills, experience, projects, certifications, education, or contact information.",
      })
    );

    const category = AskSaiMatcher.findFallbackCategory(rawInput, portfolioAssistantCategories);
    const ids =
      (category && portfolioAssistantCategorySuggestions[category]) || portfolioAssistantDefaultSuggestions;

    const relRow = el("div", { class: "ask-sai-chip-row" });
    ids.forEach((id) => {
      const entry = dataById[id];
      if (!entry) return;
      const btn = el("button", {
        type: "button",
        class: "ask-sai-chip ask-sai-chip-related",
        text: entry.questions[0],
      });
      btn.addEventListener("click", function () {
        handleQuestion(entry.questions[0]);
      });
      relRow.appendChild(btn);
    });
    wrap.appendChild(relRow);
    return wrap;
  }

  // ---------------------------------------------------------- conversation
  let history = loadHistory();

  function loadHistory() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistory() {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(history));
    } catch (e) {
      /* sessionStorage unavailable — conversation just won't persist */
    }
  }

  function trackPopularQuestion(id) {
    try {
      const raw = localStorage.getItem(POPULAR_KEY);
      const counts = raw ? JSON.parse(raw) : {};
      counts[id] = (counts[id] || 0) + 1;
      localStorage.setItem(POPULAR_KEY, JSON.stringify(counts));
    } catch (e) {
      /* localStorage unavailable — counting is a nice-to-have, skip silently */
    }
  }

  function renderWelcome() {
    messagesEl.innerHTML = "";
    messagesEl.appendChild(
      bubble(
        "assistant",
        "Hi! Ask me about Sai's skills, experience, projects, education, certifications, or contact information."
      )
    );
    renderInitialSuggestions();
  }

  function renderInitialSuggestions() {
    suggestionsEl.innerHTML = "";
    initialSuggestionIds.forEach((id) => {
      const entry = dataById[id];
      if (!entry) return;
      const btn = el("button", {
        type: "button",
        class: "ask-sai-chip ask-sai-chip-suggestion",
        text: initialSuggestionLabels[id] || entry.questions[0],
      });
      btn.addEventListener("click", function () {
        handleQuestion(entry.questions[0]);
      });
      suggestionsEl.appendChild(btn);
    });
  }

  function replayHistory() {
    messagesEl.innerHTML = "";
    if (!history.length) {
      renderWelcome();
      return;
    }
    messagesEl.appendChild(
      bubble(
        "assistant",
        "Hi! Ask me about Sai's skills, experience, projects, education, certifications, or contact information."
      )
    );
    history.forEach((turn) => {
      messagesEl.appendChild(bubble("user", turn.question));
      if (turn.entryId && findEntryById(turn.entryId)) {
        messagesEl.appendChild(answerBlock(findEntryById(turn.entryId)));
      } else {
        messagesEl.appendChild(fallbackBlock(turn.question));
      }
    });
    suggestionsEl.innerHTML = "";
    scrollMessagesToBottom();
  }

  function scrollMessagesToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function handleQuestion(text) {
    suggestionsEl.innerHTML = "";
    messagesEl.appendChild(bubble("user", text));
    const typing = typingBubble();
    messagesEl.appendChild(typing);
    scrollMessagesToBottom();

    const delay = 300 + Math.random() * 200;
    window.setTimeout(function () {
      typing.remove();
      const match = AskSaiMatcher.findBestMatch(text, allEntries());
      if (match) {
        messagesEl.appendChild(answerBlock(match.entry));
        trackPopularQuestion(match.entry.id);
        history.push({ question: text, entryId: match.entry.id });
      } else {
        messagesEl.appendChild(fallbackBlock(text));
        trackPopularQuestion("__fallback__");
        history.push({ question: text, entryId: null });
      }
      saveHistory();
      scrollMessagesToBottom();
    }, delay);
  }

  function resetConversation() {
    history = [];
    saveHistory();
    inputEl.value = "";
    renderWelcome();
    inputEl.focus();
  }

  replayHistory();
})();
