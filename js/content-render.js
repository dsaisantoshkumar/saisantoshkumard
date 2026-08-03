// ==========================================================================
// Renders Skills / Education / Certifications / Contact-list from
// ContentStore.get() (see content-data.js + content-store.js), and appends
// any admin-added Experience roles or Projects after the existing curated
// ones. Runs BEFORE js/main.js on purpose — main.js selects ".card" etc.
// for the scroll-reveal animation and wires up #copyEmailBtn, so the
// content below has to already be in the DOM by the time main.js runs.
//
// Every element built here uses createElement/textContent (never innerHTML
// for anything that came from a form field), so admin-entered text can
// never be interpreted as markup. The only innerHTML usage in this file is
// for the small set of fixed, hand-written icon glyphs in ICON_LIBRARY —
// those strings are authored in this file, not user input.
// ==========================================================================

(function () {
  const ICON_LIBRARY = {
    code: '<path d="M8 9 4 12l4 3M16 9l4 3-4 3M13.5 6.5l-3 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    layers: '<rect x="3.5" y="4" width="17" height="16" rx="2.5" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 9.5h17M8 4v16" stroke="currentColor" stroke-width="1.8"/>',
    building: '<path d="M4 20V9l8-5 8 5v11M4 20h16M9 20v-6h6v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    database: '<ellipse cx="12" cy="6" rx="7.5" ry="2.7" stroke="currentColor" stroke-width="1.8"/><path d="M4.5 6v6c0 1.5 3.36 2.7 7.5 2.7s7.5-1.2 7.5-2.7V6M4.5 12v6c0 1.5 3.36 2.7 7.5 2.7s7.5-1.2 7.5-2.7v-6" stroke="currentColor" stroke-width="1.8"/>',
    trend: '<path d="M4 19 9 12l4 4 7-10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="12" r="1.3" fill="currentColor"/><circle cx="13" cy="16" r="1.3" fill="currentColor"/><circle cx="20" cy="6" r="1.3" fill="currentColor"/>',
    check: '<path d="M9 11.5 11 13.5 15.5 8.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.8"/>',
    tool: '<path d="M14.7 6.3a3 3 0 1 0-4.24 4.24l-6 6a1.5 1.5 0 0 0 2.12 2.12l6-6a3 3 0 0 0 4.24-4.24l-2.2 2.2-1.7-.4-.4-1.7 2.2-2.2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
    tag: '<path d="M12 2.5 3.5 11l9 9 8.5-8.5c.5-.5.5-1 0-1.5L14 2.5c-.5-.5-1-.5-1.5 0Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="8" cy="8" r="1.6" fill="currentColor"/>',
    briefcase: '<path d="M4 20V9l8-5 8 5v11M4 20h16M9 20v-6h6v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    folder: '<path d="M4 7.5h6l2 2.5h8V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V7.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  };

  function svgIcon(className, key) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", className);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.innerHTML = ICON_LIBRARY[key] || ICON_LIBRARY.tag; // fixed, author-written markup only
    return svg;
  }

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (key === "class") node.className = attrs[key];
        else if (key === "text") node.textContent = attrs[key];
        else node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  // ---------------------------------------------------------------- skills
  function renderSkills(content) {
    const grid = document.getElementById("skillsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    content.skills.forEach(function (group) {
      const h3Children = [svgIcon("skill-icon", group.icon)];
      h3Children.push(document.createTextNode(group.title));
      if (group.badge) {
        h3Children.push(el("span", { class: "skill-badge", text: group.badge }));
      }
      const h3 = el("h3", {}, h3Children);
      const tagsP = el(
        "p",
        { class: "tags" },
        group.tags.map(function (tag) {
          return el("span", { class: "pill", text: tag });
        })
      );
      const card = el("div", { class: "skill-group card" + (group.highlight ? " skill-group-highlight" : "") }, [h3, tagsP]);
      grid.appendChild(card);
    });
  }

  // ------------------------------------------------------------- education
  function renderEducation(content) {
    const mount = document.getElementById("educationList");
    if (!mount) return;
    mount.innerHTML = "";
    content.education.forEach(function (item) {
      mount.appendChild(
        el("div", { class: "edu-item card" }, [
          el("h3", { text: item.degree }),
          el("p", { class: "edu-meta", text: item.meta }),
        ])
      );
    });
  }

  // --------------------------------------------------------- certifications
  function renderCertifications(content) {
    const mount = document.getElementById("certificationsList");
    if (!mount) return;
    mount.innerHTML = "";
    content.certifications.forEach(function (group) {
      const list = el(
        "ul",
        { class: "cert-list" },
        group.items.map(function (item) {
          if (item.featured) {
            const nameWrapChildren = [];
            if (item.badge) nameWrapChildren.push(el("span", { class: "cert-badge", text: item.badge }));
            nameWrapChildren.push(el("span", { class: "cert-name", text: item.name }));
            return el("li", { class: "cert-featured" }, [
              el("div", { class: "cert-name-wrap" }, nameWrapChildren),
              el("span", { class: "cert-issuer", text: item.issuer }),
            ]);
          }
          return el("li", {}, [
            el("span", { class: "cert-name", text: item.name }),
            el("span", { class: "cert-issuer", text: item.issuer }),
          ]);
        })
      );
      mount.appendChild(
        el("div", { class: "cert-group" }, [
          el("h3", { class: "cert-group-title", text: group.groupTitle }),
          list,
        ])
      );
    });
  }

  // -------------------------------------------------------------- contact
  const CONTACT_ICONS = {
    email: '<rect x="2.5" y="4.5" width="19" height="15" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="m22 7-9.06 5.77a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    phone: '<path d="M13.83 16.57a1 1 0 0 0 1.21-.3l.36-.47A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.47.35a1 1 0 0 0-.29 1.23 14 14 0 0 0 6.39 6.39Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    pin: '<path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.8"/>',
    github: '<path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.007-.322 3.3 1.23.957-.267 1.983-.4 3.003-.404 1.02.004 2.047.137 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.624-5.48 5.92.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
    linkedin: '<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
  };

  function contactIcon(key) {
    const span = el("span", { class: "contact-icon", "aria-hidden": "true" });
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    if (key !== "github" && key !== "linkedin") svg.setAttribute("fill", "none");
    svg.innerHTML = CONTACT_ICONS[key];
    span.appendChild(svg);
    return span;
  }

  function renderContactList(content) {
    const mount = document.getElementById("contactList");
    if (!mount) return;
    const c = content.contact;
    mount.innerHTML = "";

    const emailLi = el("li", { class: "contact-item contact-item-email" }, [
      contactIcon("email"),
      el("a", { href: "mailto:" + c.email, text: c.email }),
      el(
        "button",
        { type: "button", id: "copyEmailBtn", class: "copy-btn", "aria-label": "Copy email address" },
        [
          (function () {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("fill", "none");
            svg.innerHTML =
              '<rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" stroke="currentColor" stroke-width="1.7"/>';
            return svg;
          })(),
          el("span", { text: "Copy" }),
        ]
      ),
    ]);
    mount.appendChild(emailLi);

    if (c.phone) {
      mount.appendChild(
        el("li", { class: "contact-item" }, [contactIcon("phone"), el("a", { href: "tel:" + c.phone, text: c.phoneDisplay })])
      );
    }

    if (c.location) {
      const srOnly = el("span", { class: "sr-only", text: "Location: " });
      const wrap = el("span", {}, [srOnly, document.createTextNode(c.location)]);
      mount.appendChild(el("li", { class: "contact-item" }, [contactIcon("pin"), wrap]));
    }

    if (c.github) {
      mount.appendChild(
        el("li", { class: "contact-item" }, [
          contactIcon("github"),
          el("a", { href: c.github, target: "_blank", rel: "noopener", text: c.githubDisplay || c.github }),
        ])
      );
    }

    if (c.linkedin) {
      mount.appendChild(
        el("li", { class: "contact-item" }, [
          contactIcon("linkedin"),
          el("a", { href: c.linkedin, target: "_blank", rel: "noopener", text: c.linkedinDisplay || c.linkedin }),
        ])
      );
    }
  }

  // --------------------------------------------------------------- profile
  function renderProfile(content) {
    const tagline = document.querySelector(".hero-tagline");
    if (tagline && content.profile.heroTagline) tagline.textContent = content.profile.heroTagline;
    const focusText = document.querySelector(".focus-text");
    if (focusText && content.profile.focusText) focusText.textContent = content.profile.focusText;

    const nameEl = document.getElementById("sidebarName");
    if (nameEl && content.profile.name) nameEl.textContent = content.profile.name;
    const locationEl = document.getElementById("sidebarLocationText");
    if (locationEl && content.profile.sidebarLocation) locationEl.textContent = content.profile.sidebarLocation;
  }

  // ---------------------------------------- admin-added experience/projects
  function renderExperienceAdditions(content) {
    const timeline = document.querySelector(".timeline");
    if (!timeline || !content.experienceAdditions || !content.experienceAdditions.length) return;
    content.experienceAdditions.forEach(function (role) {
      const ul = el(
        "ul",
        {},
        (role.bullets || []).map(function (b) {
          return el("li", { text: b });
        })
      );
      const body = el("div", { class: "timeline-body card" }, [
        el("div", { class: "role-head" }, [
          el("h3", { text: role.title }),
          el("span", { class: "role-dates", text: role.dates }),
        ]),
        el("p", { class: "role-company", text: role.company }),
        ul,
      ]);
      const item = el("article", { class: "timeline-item" }, [el("div", { class: "timeline-marker" }), body]);
      timeline.appendChild(item);
    });
  }

  function renderProjectAdditions(content) {
    const list = document.querySelector(".project-list");
    if (!list || !content.projectAdditions || !content.projectAdditions.length) return;
    content.projectAdditions.forEach(function (proj) {
      const visualSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      visualSvg.setAttribute("viewBox", "0 0 200 200");
      visualSvg.setAttribute("fill", "none");
      visualSvg.innerHTML =
        '<circle cx="100" cy="100" r="88" fill="var(--rust)" fill-opacity="0.07"/>' + ICON_LIBRARY.folder.replace(/currentColor/g, "var(--ink)").replace(/stroke-width="1.8"/, 'stroke-width="4" transform="translate(38 38) scale(5)"');
      const visual = el("div", { class: "project-visual" }, [visualSvg]);

      const bodyChildren = [
        el("h3", { text: proj.title }),
        el("p", { class: "project-meta", text: proj.meta || "Personal project" }),
      ];
      if (proj.problem) bodyChildren.push(el("p", { class: "project-problem", text: proj.problem }));
      if (proj.points && proj.points.length) {
        bodyChildren.push(
          el(
            "ul",
            { class: "project-points" },
            proj.points.map(function (p) {
              return el("li", { text: p });
            })
          )
        );
      }
      if (proj.tags && proj.tags.length) {
        bodyChildren.push(
          el(
            "p",
            { class: "tags" },
            proj.tags.map(function (t) {
              return el("span", { class: "pill", text: t });
            })
          )
        );
      }
      const links = [];
      if (proj.demoUrl) links.push(el("a", { class: "link-btn", href: proj.demoUrl, target: "_blank", rel: "noopener", text: "Live Demo" }));
      if (proj.codeUrl) links.push(el("a", { class: "link-btn", href: proj.codeUrl, target: "_blank", rel: "noopener", text: "View Code" }));
      if (links.length) bodyChildren.push(el("p", { class: "project-links" }, links));

      const article = el("article", { class: "project" }, [visual, el("div", { class: "project-body" }, bodyChildren)]);
      list.appendChild(article);
    });
  }

  function renderAll() {
    const content = ContentStore.get();
    renderProfile(content);
    renderSkills(content);
    renderEducation(content);
    renderCertifications(content);
    renderContactList(content);
    renderExperienceAdditions(content);
    renderProjectAdditions(content);
  }

  // Exposed so the Admin Panel can re-render immediately after a save,
  // without needing a full page reload.
  window.PortfolioContentRender = { renderAll: renderAll, ICON_LIBRARY: ICON_LIBRARY };

  renderAll();
})();
