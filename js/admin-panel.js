// ==========================================================================
// Admin Panel — edit Skills, Experience, Projects, Education,
// Certifications, Contact and Chatbot Knowledge without touching code.
//
// HOW EDITS ARE SAVED
// Every "Save" writes to this browser's localStorage via ContentStore (see
// content-store.js) or, for chatbot Q&A, a small store defined at the
// bottom of this file. The page re-renders immediately so you see the
// change right away. These edits live in *this browser only* — because
// this is a static site with no backend, there is nowhere else to save
// them to. Use "Export JSON" in the footer to copy your edits, then hand
// them to a developer (or a future Claude session) to bake permanently
// into js/content-data.js / js/assistant-data.js so every visitor sees it.
//
// SECURITY
// The panel only opens when ProfileLock reports the page is unlocked (see
// js/profile-lock.js and the security note in that file). This is a
// convenience gate for a static site, not real authentication.
// ==========================================================================

(function () {
  const root = document.getElementById("adminPanelRoot");
  if (!root) return;

  const CHAT_KEY = "askSaiCustomEntries";

  // ---- tiny store for admin-added chatbot Q&A, kept local to this file ----
  const ChatbotCustomStore = {
    getAll: function () {
      try {
        const raw = localStorage.getItem(CHAT_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    },
    save: function (list) {
      try {
        localStorage.setItem(CHAT_KEY, JSON.stringify(list));
        return true;
      } catch (e) {
        return false;
      }
    },
    add: function (entry) {
      const list = ChatbotCustomStore.getAll();
      list.push(entry);
      ChatbotCustomStore.save(list);
    },
    remove: function (id) {
      const list = ChatbotCustomStore.getAll().filter(function (e) {
        return e.id !== id;
      });
      ChatbotCustomStore.save(list);
    },
  };
  window.ChatbotCustomStore = ChatbotCustomStore; // read by assistant.js

  // ------------------------------------------------------------- DOM helper
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "class") node.className = attrs[key];
        else if (key === "text") node.textContent = attrs[key];
        else if (key.indexOf("on") === 0 && typeof attrs[key] === "function") {
          node.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
        } else node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function iconSvg(pathD) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathD);
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1.8");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    return svg;
  }

  const ICON_TRASH = "M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13";
  const ICON_EDIT = "M4 20h4l10.5-10.5a1.5 1.5 0 0 0 0-2.12l-1.88-1.88a1.5 1.5 0 0 0-2.12 0L4 16v4Z";
  const ICON_CLOSE = "M6 6l12 12M18 6 6 18";

  // -------------------------------------------------------------- toast
  let toastEl;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    window.setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2200);
  }

  // -------------------------------------------------------- validation
  function fieldWrap(labelText, inputEl) {
    const wrap = el("div", { class: "admin-field" }, [el("label", { text: labelText }), inputEl, el("p", { class: "admin-field-error", text: "This field is required." })]);
    return wrap;
  }

  function validateRequired(wrap, inputEl) {
    const ok = inputEl.value.trim().length > 0;
    wrap.classList.toggle("invalid", !ok);
    return ok;
  }

  // ============================================================ tab: profile
  function renderProfileTab(body) {
    const content = ContentStore.get();
    body.innerHTML = "";
    body.appendChild(el("p", { class: "admin-section-title", text: "Profile text" }));
    body.appendChild(
      el("p", {
        class: "admin-section-help",
        text: "These short pieces of hero and About-section copy are safe to edit directly. Everything else in the Hero and About sections is hand-written HTML — ask a developer (or Claude) if you want structural changes there.",
      })
    );

    const taglineInput = el("textarea", { rows: "3" });
    taglineInput.value = content.profile.heroTagline;
    const taglineWrap = fieldWrap("Hero tagline", taglineInput);
    body.appendChild(taglineWrap);

    const focusInput = el("textarea", { rows: "3" });
    focusInput.value = content.profile.focusText;
    const focusWrap = fieldWrap("Current focus (About section)", focusInput);
    body.appendChild(focusWrap);

    const saveBtn = el("button", { type: "button", class: "admin-btn admin-btn-primary", text: "Save profile text" });
    saveBtn.addEventListener("click", function () {
      const okTagline = validateRequired(taglineWrap, taglineInput);
      const okFocus = validateRequired(focusWrap, focusInput);
      if (!okTagline || !okFocus) return;
      ContentStore.setSection("profile", { heroTagline: taglineInput.value.trim(), focusText: focusInput.value.trim() });
      window.PortfolioContentRender.renderAll();
      showToast("Profile text saved.");
    });
    body.appendChild(saveBtn);
  }

  // ============================================================= tab: skills
  function renderSkillsTab(body) {
    const content = ContentStore.get();
    body.innerHTML = "";
    body.appendChild(el("p", { class: "admin-section-title", text: "Skill groups" }));
    body.appendChild(el("p", { class: "admin-section-help", text: "Add or remove individual tags, or add a whole new group. Changes save per group." }));

    content.skills.forEach(function (group, groupIndex) {
      const groupWrap = el("div", { class: "admin-row" }, []);
      groupWrap.style.display = "block";

      const titleInput = el("input", { type: "text" });
      titleInput.value = group.title;
      groupWrap.appendChild(fieldWrap("Group title", titleInput));

      const pillRow = el("div", { class: "admin-pill-input-row" });
      function redrawPills(tags) {
        pillRow.innerHTML = "";
        tags.forEach(function (tag, tagIndex) {
          const removeBtn = el("button", { type: "button", text: "×", "aria-label": "Remove " + tag });
          removeBtn.addEventListener("click", function () {
            const next = group.tags.slice();
            next.splice(tagIndex, 1);
            group.tags = next;
            redrawPills(group.tags);
          });
          pillRow.appendChild(el("span", { class: "admin-pill" }, [document.createTextNode(tag), removeBtn]));
        });
      }
      redrawPills(group.tags);
      groupWrap.appendChild(pillRow);

      const addTagInput = el("input", { type: "text", placeholder: "New tag, e.g. Docker" });
      const addTagRow = el("div", { class: "admin-add-row" }, [
        addTagInput,
        (function () {
          const b = el("button", { type: "button", class: "admin-btn", text: "Add tag" });
          b.addEventListener("click", function () {
            const val = addTagInput.value.trim();
            if (!val) return;
            group.tags = group.tags.concat([val]);
            redrawPills(group.tags);
            addTagInput.value = "";
          });
          return b;
        })(),
      ]);
      groupWrap.appendChild(addTagRow);

      const actionsRow = el("div", { class: "admin-row-actions" }, [
        (function () {
          const b = el("button", { type: "button", class: "admin-btn admin-btn-primary", text: "Save group" });
          b.addEventListener("click", function () {
            group.title = titleInput.value.trim() || group.title;
            const fresh = ContentStore.get();
            fresh.skills[groupIndex] = group;
            ContentStore.setSection("skills", fresh.skills);
            window.PortfolioContentRender.renderAll();
            showToast("Skills saved.");
          });
          return b;
        })(),
        (function () {
          const b = el("button", { type: "button", class: "admin-btn", text: "Delete group" });
          b.addEventListener("click", function () {
            if (!window.confirm("Delete the “" + group.title + "” skill group?")) return;
            const fresh = ContentStore.get();
            fresh.skills.splice(groupIndex, 1);
            ContentStore.setSection("skills", fresh.skills);
            window.PortfolioContentRender.renderAll();
            renderSkillsTab(body);
            showToast("Skill group deleted.");
          });
          return b;
        })(),
      ]);
      groupWrap.appendChild(actionsRow);
      body.appendChild(groupWrap);
    });

    body.appendChild(el("hr", { class: "admin-divider" }));
    const newTitleInput = el("input", { type: "text", placeholder: "e.g. Cloud & DevOps" });
    const newTitleWrap = fieldWrap("New group title", newTitleInput);
    body.appendChild(newTitleWrap);
    const addGroupBtn = el("button", { type: "button", class: "admin-btn", text: "Add skill group" });
    addGroupBtn.addEventListener("click", function () {
      const ok = validateRequired(newTitleWrap, newTitleInput);
      if (!ok) return;
      const fresh = ContentStore.get();
      fresh.skills.push({ id: "skills-" + Date.now(), title: newTitleInput.value.trim(), icon: "tag", tags: [] });
      ContentStore.setSection("skills", fresh.skills);
      window.PortfolioContentRender.renderAll();
      renderSkillsTab(body);
      showToast("Skill group added — add some tags to it.");
    });
    body.appendChild(addGroupBtn);
  }

  // ========================================================= tab: education
  function renderEducationTab(body) {
    const content = ContentStore.get();
    body.innerHTML = "";
    body.appendChild(el("p", { class: "admin-section-title", text: "Education" }));

    content.education.forEach(function (item, index) {
      const row = el("div", { class: "admin-row" }, [
        el("div", { class: "admin-row-text" }, [el("strong", { text: item.degree }), el("span", { text: item.meta })]),
        el("div", { class: "admin-row-actions" }, [
          (function () {
            const b = el("button", { type: "button", class: "admin-icon-btn", "aria-label": "Delete" }, [iconSvg(ICON_TRASH)]);
            b.addEventListener("click", function () {
              if (!window.confirm("Delete this education entry?")) return;
              const fresh = ContentStore.get();
              fresh.education.splice(index, 1);
              ContentStore.setSection("education", fresh.education);
              window.PortfolioContentRender.renderAll();
              renderEducationTab(body);
              showToast("Education entry deleted.");
            });
            return b;
          })(),
        ]),
      ]);
      body.appendChild(row);
    });

    body.appendChild(el("hr", { class: "admin-divider" }));
    const degreeInput = el("input", { type: "text", placeholder: "e.g. B.S. in Data Science" });
    const degreeWrap = fieldWrap("Degree", degreeInput);
    const metaInput = el("input", { type: "text", placeholder: "e.g. Example University · 2027" });
    const metaWrap = fieldWrap("School & date", metaInput);
    body.appendChild(degreeWrap);
    body.appendChild(metaWrap);
    const addBtn = el("button", { type: "button", class: "admin-btn admin-btn-primary", text: "Add education entry" });
    addBtn.addEventListener("click", function () {
      const ok1 = validateRequired(degreeWrap, degreeInput);
      const ok2 = validateRequired(metaWrap, metaInput);
      if (!ok1 || !ok2) return;
      const fresh = ContentStore.get();
      fresh.education.push({ id: "edu-" + Date.now(), degree: degreeInput.value.trim(), meta: metaInput.value.trim() });
      ContentStore.setSection("education", fresh.education);
      window.PortfolioContentRender.renderAll();
      renderEducationTab(body);
      showToast("Education entry added.");
    });
    body.appendChild(addBtn);
  }

  // ==================================================== tab: certifications
  function renderCertificationsTab(body) {
    const content = ContentStore.get();
    body.innerHTML = "";
    body.appendChild(el("p", { class: "admin-section-title", text: "Certifications" }));

    content.certifications.forEach(function (group, groupIndex) {
      body.appendChild(el("p", { class: "admin-section-help", text: group.groupTitle }));
      group.items.forEach(function (item, itemIndex) {
        const row = el("div", { class: "admin-row" }, [
          el("div", { class: "admin-row-text" }, [el("strong", { text: item.name }), el("span", { text: item.issuer + (item.badge ? " · " + item.badge : "") })]),
          el("div", { class: "admin-row-actions" }, [
            (function () {
              const b = el("button", { type: "button", class: "admin-icon-btn admin-icon-danger", "aria-label": "Delete" }, [iconSvg(ICON_TRASH)]);
              b.addEventListener("click", function () {
                if (!window.confirm("Delete “" + item.name + "”?")) return;
                const fresh = ContentStore.get();
                fresh.certifications[groupIndex].items.splice(itemIndex, 1);
                ContentStore.setSection("certifications", fresh.certifications);
                window.PortfolioContentRender.renderAll();
                renderCertificationsTab(body);
                showToast("Certification deleted.");
              });
              return b;
            })(),
          ]),
        ]);
        body.appendChild(row);
      });

      const nameInput = el("input", { type: "text", placeholder: "Certification name" });
      const issuerInput = el("input", { type: "text", placeholder: "Issuer" });
      const addRow = el("div", { class: "admin-add-row" }, [
        nameInput,
        issuerInput,
        (function () {
          const b = el("button", { type: "button", class: "admin-btn", text: "Add" });
          b.addEventListener("click", function () {
            if (!nameInput.value.trim() || !issuerInput.value.trim()) return;
            const fresh = ContentStore.get();
            fresh.certifications[groupIndex].items.push({ name: nameInput.value.trim(), issuer: issuerInput.value.trim() });
            ContentStore.setSection("certifications", fresh.certifications);
            window.PortfolioContentRender.renderAll();
            renderCertificationsTab(body);
            showToast("Certification added.");
          });
          return b;
        })(),
      ]);
      body.appendChild(addRow);
      body.appendChild(el("hr", { class: "admin-divider" }));
    });

    const groupTitleInput = el("input", { type: "text", placeholder: "e.g. Cloud" });
    const groupTitleWrap = fieldWrap("New certification group", groupTitleInput);
    body.appendChild(groupTitleWrap);
    const addGroupBtn = el("button", { type: "button", class: "admin-btn admin-btn-primary", text: "Add certification group" });
    addGroupBtn.addEventListener("click", function () {
      const ok = validateRequired(groupTitleWrap, groupTitleInput);
      if (!ok) return;
      const fresh = ContentStore.get();
      fresh.certifications.push({ id: "cert-" + Date.now(), groupTitle: groupTitleInput.value.trim(), items: [] });
      ContentStore.setSection("certifications", fresh.certifications);
      window.PortfolioContentRender.renderAll();
      renderCertificationsTab(body);
      showToast("Certification group added.");
    });
    body.appendChild(addGroupBtn);
  }

  // ========================================================= tab: contact
  function renderContactTab(body) {
    const content = ContentStore.get();
    body.innerHTML = "";
    body.appendChild(el("p", { class: "admin-section-title", text: "Contact details" }));
    body.appendChild(el("p", { class: "admin-section-help", text: "Saving here also updates what Ask Sai tells visitors when they ask for your email, phone, or LinkedIn." }));

    const c = content.contact;
    const emailInput = el("input", { type: "email" });
    emailInput.value = c.email;
    const emailWrap = fieldWrap("Email", emailInput);

    const phoneInput = el("input", { type: "tel" });
    phoneInput.value = c.phoneDisplay;
    const phoneWrap = fieldWrap("Phone (display format, e.g. (555) 123-4567)", phoneInput);

    const locationInput = el("input", { type: "text" });
    locationInput.value = c.location;
    const locationWrap = fieldWrap("Location", locationInput);

    const githubInput = el("input", { type: "url" });
    githubInput.value = c.github;
    const githubWrap = fieldWrap("GitHub URL", githubInput);

    const linkedinInput = el("input", { type: "url" });
    linkedinInput.value = c.linkedin;
    const linkedinWrap = fieldWrap("LinkedIn URL", linkedinInput);

    [emailWrap, phoneWrap, locationWrap, githubWrap, linkedinWrap].forEach(function (w) {
      body.appendChild(w);
    });

    const saveBtn = el("button", { type: "button", class: "admin-btn admin-btn-primary", text: "Save contact details" });
    saveBtn.addEventListener("click", function () {
      const okEmail = validateRequired(emailWrap, emailInput) && /\S+@\S+\.\S+/.test(emailInput.value.trim());
      emailWrap.classList.toggle("invalid", !okEmail);
      if (!okEmail) return;

      const digitsOnly = phoneInput.value.replace(/\D/g, "");
      const nextContact = {
        email: emailInput.value.trim(),
        phone: digitsOnly ? "+" + digitsOnly : "",
        phoneDisplay: phoneInput.value.trim(),
        location: locationInput.value.trim(),
        github: githubInput.value.trim(),
        githubDisplay: githubInput.value.trim().replace(/^https?:\/\//, ""),
        linkedin: linkedinInput.value.trim(),
        linkedinDisplay: linkedinInput.value.trim().replace(/^https?:\/\//, ""),
      };
      ContentStore.setSection("contact", nextContact);
      window.PortfolioContentRender.renderAll();
      if (window.portfolioConfig) {
        portfolioConfig.email = nextContact.email;
        portfolioConfig.phone = nextContact.phone;
        portfolioConfig.phoneDisplay = nextContact.phoneDisplay;
        portfolioConfig.location = nextContact.location;
        portfolioConfig.github = nextContact.github;
        portfolioConfig.githubDisplay = nextContact.githubDisplay;
        portfolioConfig.linkedin = nextContact.linkedin;
        portfolioConfig.linkedinDisplay = nextContact.linkedinDisplay;
      }
      showToast("Contact details saved.");
    });
    body.appendChild(saveBtn);
  }

  // ======================================================== tab: experience
  function renderExperienceTab(body) {
    const content = ContentStore.get();
    body.innerHTML = "";
    body.appendChild(el("p", { class: "admin-section-title", text: "Experience" }));
    body.appendChild(
      el("p", {
        class: "admin-section-help",
        text: "Your existing roles are hand-written and shown here for reference only. New roles you add appear after them on the live timeline and can be removed below.",
      })
    );

    document.querySelectorAll(".timeline > .timeline-item:not(.timeline-item-edu)").forEach(function (node, i) {
      if (i >= 5) return; // only the originally-curated roles (safety cap)
      const h3 = node.querySelector(".role-head h3");
      const dates = node.querySelector(".role-dates");
      const company = node.querySelector(".role-company");
      if (!h3) return;
      body.appendChild(
        el("div", { class: "admin-row" }, [
          el("div", { class: "admin-row-text" }, [
            el("strong", { text: h3.textContent + (dates ? " — " + dates.textContent : "") }),
            el("span", { text: company ? company.textContent : "" }),
          ]),
        ])
      );
    });

    body.appendChild(el("hr", { class: "admin-divider" }));
    body.appendChild(el("p", { class: "admin-section-title", text: "Admin-added roles" }));
    (content.experienceAdditions || []).forEach(function (role, index) {
      body.appendChild(
        el("div", { class: "admin-row" }, [
          el("div", { class: "admin-row-text" }, [el("strong", { text: role.title + " — " + role.dates }), el("span", { text: role.company })]),
          el("div", { class: "admin-row-actions" }, [
            (function () {
              const b = el("button", { type: "button", class: "admin-icon-btn admin-icon-danger", "aria-label": "Delete" }, [iconSvg(ICON_TRASH)]);
              b.addEventListener("click", function () {
                if (!window.confirm("Delete this role?")) return;
                const fresh = ContentStore.get();
                fresh.experienceAdditions.splice(index, 1);
                ContentStore.setSection("experienceAdditions", fresh.experienceAdditions);
                window.PortfolioContentRender.renderAll();
                renderExperienceTab(body);
                showToast("Role removed.");
              });
              return b;
            })(),
          ]),
        ])
      );
    });

    body.appendChild(el("hr", { class: "admin-divider" }));
    const titleInput = el("input", { type: "text", placeholder: "e.g. Backend Developer" });
    const titleWrap = fieldWrap("Title", titleInput);
    const companyInput = el("input", { type: "text", placeholder: "e.g. Example Corp" });
    const companyWrap = fieldWrap("Company", companyInput);
    const datesInput = el("input", { type: "text", placeholder: "e.g. Jan 2027 – Present" });
    const datesWrap = fieldWrap("Dates", datesInput);
    const bulletsInput = el("textarea", { rows: "4", placeholder: "One responsibility per line" });
    const bulletsWrap = fieldWrap("Responsibilities (one per line)", bulletsInput);
    [titleWrap, companyWrap, datesWrap, bulletsWrap].forEach(function (w) {
      body.appendChild(w);
    });

    const addBtn = el("button", { type: "button", class: "admin-btn admin-btn-primary", text: "Add role" });
    addBtn.addEventListener("click", function () {
      const ok1 = validateRequired(titleWrap, titleInput);
      const ok2 = validateRequired(companyWrap, companyInput);
      const ok3 = validateRequired(datesWrap, datesInput);
      if (!ok1 || !ok2 || !ok3) return;
      const fresh = ContentStore.get();
      fresh.experienceAdditions = (fresh.experienceAdditions || []).concat([
        {
          title: titleInput.value.trim(),
          company: companyInput.value.trim(),
          dates: datesInput.value.trim(),
          bullets: bulletsInput.value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean),
        },
      ]);
      ContentStore.setSection("experienceAdditions", fresh.experienceAdditions);
      window.PortfolioContentRender.renderAll();
      renderExperienceTab(body);
      showToast("Role added to the timeline.");
    });
    body.appendChild(addBtn);
  }

  // =========================================================== tab: projects
  function renderProjectsTab(body) {
    const content = ContentStore.get();
    body.innerHTML = "";
    body.appendChild(el("p", { class: "admin-section-title", text: "Projects" }));
    body.appendChild(
      el("p", {
        class: "admin-section-help",
        text: "Your existing projects keep their custom illustrations and are shown here for reference only. New projects you add appear after them with a simple generic icon and can be removed below.",
      })
    );

    document.querySelectorAll(".project-list > .project").forEach(function (node) {
      const h3 = node.querySelector(".project-body h3");
      if (!h3) return;
      body.appendChild(el("div", { class: "admin-row" }, [el("div", { class: "admin-row-text" }, [el("strong", { text: h3.textContent })])]));
    });

    body.appendChild(el("hr", { class: "admin-divider" }));
    body.appendChild(el("p", { class: "admin-section-title", text: "Admin-added projects" }));
    (content.projectAdditions || []).forEach(function (proj, index) {
      body.appendChild(
        el("div", { class: "admin-row" }, [
          el("div", { class: "admin-row-text" }, [el("strong", { text: proj.title })]),
          el("div", { class: "admin-row-actions" }, [
            (function () {
              const b = el("button", { type: "button", class: "admin-icon-btn admin-icon-danger", "aria-label": "Delete" }, [iconSvg(ICON_TRASH)]);
              b.addEventListener("click", function () {
                if (!window.confirm("Delete this project?")) return;
                const fresh = ContentStore.get();
                fresh.projectAdditions.splice(index, 1);
                ContentStore.setSection("projectAdditions", fresh.projectAdditions);
                window.PortfolioContentRender.renderAll();
                renderProjectsTab(body);
                showToast("Project removed.");
              });
              return b;
            })(),
          ]),
        ])
      );
    });

    body.appendChild(el("hr", { class: "admin-divider" }));
    const titleInput = el("input", { type: "text", placeholder: "Project title" });
    const titleWrap = fieldWrap("Title", titleInput);
    const metaInput = el("input", { type: "text", placeholder: "e.g. Personal project" });
    const metaWrap = fieldWrap("Meta line", metaInput);
    const problemInput = el("input", { type: "text", placeholder: "The problem it solves" });
    const problemWrap = fieldWrap("Problem statement", problemInput);
    const pointsInput = el("textarea", { rows: "4", placeholder: "One bullet point per line" });
    const pointsWrap = fieldWrap("Highlights (one per line)", pointsInput);
    const tagsInput = el("input", { type: "text", placeholder: "e.g. Python, Flask, PostgreSQL" });
    const tagsWrap = fieldWrap("Tags (comma-separated)", tagsInput);
    const demoInput = el("input", { type: "url", placeholder: "https://…" });
    const demoWrap = fieldWrap("Live demo URL (optional)", demoInput);
    const codeInput = el("input", { type: "url", placeholder: "https://github.com/…" });
    const codeWrap = fieldWrap("Source code URL (optional)", codeInput);
    [titleWrap, metaWrap, problemWrap, pointsWrap, tagsWrap, demoWrap, codeWrap].forEach(function (w) {
      body.appendChild(w);
    });

    const addBtn = el("button", { type: "button", class: "admin-btn admin-btn-primary", text: "Add project" });
    addBtn.addEventListener("click", function () {
      const ok = validateRequired(titleWrap, titleInput);
      if (!ok) return;
      const fresh = ContentStore.get();
      fresh.projectAdditions = (fresh.projectAdditions || []).concat([
        {
          title: titleInput.value.trim(),
          meta: metaInput.value.trim(),
          problem: problemInput.value.trim(),
          points: pointsInput.value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean),
          tags: tagsInput.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean),
          demoUrl: demoInput.value.trim(),
          codeUrl: codeInput.value.trim(),
        },
      ]);
      ContentStore.setSection("projectAdditions", fresh.projectAdditions);
      window.PortfolioContentRender.renderAll();
      renderProjectsTab(body);
      showToast("Project added.");
    });
    body.appendChild(addBtn);
  }

  // ========================================================== tab: chatbot
  function renderChatbotTab(body) {
    body.innerHTML = "";
    body.appendChild(el("p", { class: "admin-section-title", text: "Chatbot knowledge" }));
    body.appendChild(
      el("p", {
        class: "admin-section-help",
        text: "Add a question Ask Sai should know how to answer. It's matched the same way as the built-in knowledge base (exact phrasing, keywords, and light typo tolerance).",
      })
    );

    ChatbotCustomStore.getAll().forEach(function (entry) {
      body.appendChild(
        el("div", { class: "admin-row" }, [
          el("div", { class: "admin-row-text" }, [el("strong", { text: entry.questions[0] }), el("span", { text: entry.answer })]),
          el("div", { class: "admin-row-actions" }, [
            (function () {
              const b = el("button", { type: "button", class: "admin-icon-btn admin-icon-danger", "aria-label": "Delete" }, [iconSvg(ICON_TRASH)]);
              b.addEventListener("click", function () {
                if (!window.confirm("Delete this Q&A?")) return;
                ChatbotCustomStore.remove(entry.id);
                renderChatbotTab(body);
                showToast("Chatbot entry deleted.");
              });
              return b;
            })(),
          ]),
        ])
      );
    });

    body.appendChild(el("hr", { class: "admin-divider" }));
    const questionInput = el("input", { type: "text", placeholder: "e.g. Does Sai know Docker?" });
    const questionWrap = fieldWrap("Question", questionInput);
    const keywordsInput = el("input", { type: "text", placeholder: "e.g. docker, containers, containerization" });
    const keywordsWrap = fieldWrap("Keywords (comma-separated)", keywordsInput);
    const answerInput = el("textarea", { rows: "3", placeholder: "The answer Ask Sai should give" });
    const answerWrap = fieldWrap("Answer", answerInput);
    [questionWrap, keywordsWrap, answerWrap].forEach(function (w) {
      body.appendChild(w);
    });

    const addBtn = el("button", { type: "button", class: "admin-btn admin-btn-primary", text: "Add to chatbot knowledge" });
    addBtn.addEventListener("click", function () {
      const ok1 = validateRequired(questionWrap, questionInput);
      const ok2 = validateRequired(answerWrap, answerInput);
      if (!ok1 || !ok2) return;
      ChatbotCustomStore.add({
        id: "custom-" + Date.now(),
        category: "custom",
        questions: [questionInput.value.trim()],
        keywords: keywordsInput.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean),
        answer: answerInput.value.trim(),
        proof: [],
        relatedQuestions: [],
      });
      renderChatbotTab(body);
      showToast("Ask Sai can now answer that question.");
    });
    body.appendChild(addBtn);
  }

  // ------------------------------------------------------------ tab registry
  const TABS = [
    { id: "profile", label: "Profile", render: renderProfileTab },
    { id: "skills", label: "Skills", render: renderSkillsTab },
    { id: "experience", label: "Experience", render: renderExperienceTab },
    { id: "projects", label: "Projects", render: renderProjectsTab },
    { id: "education", label: "Education", render: renderEducationTab },
    { id: "certifications", label: "Certifications", render: renderCertificationsTab },
    { id: "contact", label: "Contact", render: renderContactTab },
    { id: "chatbot", label: "Chatbot Knowledge", render: renderChatbotTab },
  ];

  // --------------------------------------------------------------- drawer
  let activeTabId = "profile";
  let bodyEl, tabsEl, overlayEl, drawerEl;

  function renderActiveTab() {
    tabsEl.querySelectorAll(".admin-tab").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.tabId === activeTabId);
    });
    const tab = TABS.filter(function (t) { return t.id === activeTabId; })[0];
    if (tab) tab.render(bodyEl);
  }

  function openDrawer(tabId) {
    if (!ProfileLock.isUnlocked()) return;
    activeTabId = tabId || activeTabId;
    overlayEl.classList.add("open");
    drawerEl.classList.add("open");
    renderActiveTab();
  }

  function closeDrawer() {
    overlayEl.classList.remove("open");
    drawerEl.classList.remove("open");
  }

  function build() {
    toastEl = el("span", { class: "admin-toast" });

    tabsEl = el(
      "div",
      { class: "admin-tabs" },
      TABS.map(function (t) {
        const btn = el("button", { type: "button", class: "admin-tab", text: t.label });
        btn.dataset.tabId = t.id;
        btn.addEventListener("click", function () {
          activeTabId = t.id;
          renderActiveTab();
        });
        return btn;
      })
    );

    bodyEl = el("div", { class: "admin-body" });

    const closeBtn = el("button", { type: "button", class: "admin-close-btn", "aria-label": "Close admin panel" }, [iconSvg(ICON_CLOSE)]);
    closeBtn.addEventListener("click", closeDrawer);

    const exportBtn = el("button", { type: "button", class: "admin-btn", text: "Export JSON" });
    exportBtn.addEventListener("click", function () {
      const json = ContentStore.exportJSON();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(json).then(function () {
          showToast("Copied full content JSON to clipboard.");
        }, function () {
          window.prompt("Copy this JSON:", json);
        });
      } else {
        window.prompt("Copy this JSON:", json);
      }
    });

    const resetBtn = el("button", { type: "button", class: "admin-btn admin-btn-ghost", text: "Reset all edits" });
    resetBtn.addEventListener("click", function () {
      if (!window.confirm("Discard every saved edit in this browser and revert to the original content?")) return;
      ContentStore.resetAll();
      window.PortfolioContentRender.renderAll();
      renderActiveTab();
      showToast("All edits reset to defaults.");
    });

    drawerEl = el("div", { class: "admin-drawer" }, [
      el("div", { class: "admin-drawer-header" }, [
        el("div", {}, [
          el("h2", { class: "admin-drawer-title", text: "Admin Panel" }),
          el("p", { class: "admin-drawer-subtitle", text: "Edit portfolio content. Saved to this browser only — see Export JSON below." }),
        ]),
        closeBtn,
      ]),
      tabsEl,
      bodyEl,
      el("div", { class: "admin-footer" }, [el("div", { class: "admin-footer-actions" }, [exportBtn, resetBtn]), toastEl]),
    ]);

    overlayEl = el("div", { class: "admin-overlay" });
    overlayEl.addEventListener("click", closeDrawer);

    root.appendChild(overlayEl);
    root.appendChild(drawerEl);
  }

  build();

  document.querySelectorAll(".admin-edit-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const tabId = btn.dataset.adminTab;
      if (!ProfileLock.isUnlocked()) return; // CSS already hides these when locked
      openDrawer(tabId);
    });
  });

  document.addEventListener("adminUnlockChanged", function (e) {
    if (!e.detail.unlocked) closeDrawer();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });
})();
