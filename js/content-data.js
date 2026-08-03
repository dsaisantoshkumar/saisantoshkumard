// ==========================================================================
// Portfolio content — single source of truth for the sections listed below.
//
// WHY THIS FILE EXISTS
// Skills, Education, Certifications and Contact details are the things a
// job-seeker updates most often. Instead of hand-editing HTML for every
// change, those sections now render from the plain data below at page load
// (see js/content-render.js). Edit an array here — or use the Admin Panel
// (unlock it from the bottom of the sidebar) — and the page updates itself.
//
// WHAT STAYS STATIC ON PURPOSE
// The Hero narrative, the existing Experience roles, and the existing
// Project write-ups (each with its own hand-drawn illustration) remain
// hand-authored HTML in index.html. They're deliberately curated writing,
// not a list of interchangeable records, so rewriting them as generic data
// risks flattening the voice and the bespoke artwork. The Admin Panel can
// still ADD new Experience entries or new Projects — those are appended
// after the existing ones using a clean, simple template.
//
// HOW TO EDIT
// - Change values directly in this file and redeploy, OR
// - Unlock the Admin Panel (password-gated, bottom of sidebar) and use the
//   Skills / Education / Certifications / Contact / Profile tabs. Panel
//   edits are saved to this browser's localStorage and layered on top of
//   the defaults below — they do not change this file by themselves. Use
//   the panel's "Export JSON" button to grab your edits and ask me (or a
//   future Claude session) to bake them back into this file permanently,
//   so every visitor — not just your browser — sees the update.
// ==========================================================================

const portfolioContentDefaults = {

  // Small, frequently-tweaked hero/about text. Everything else in the Hero
  // and About sections stays as hand-written HTML in index.html.
  profile: {
    name: "Sai Santosh Kumar Devarasetty",
    // Short, sidebar-level location. The full city/state ("Bentonville, AR,
    // USA") still lives in `contact.location` below and shows in the
    // Contact section — this is just the compact country-level line next
    // to the sidebar name. Edit here, or via Admin Panel → Profile.
    sidebarLocation: "Based in USA",
    heroTagline:
      "Building reliable software, intelligent automation, and data-driven solutions across Computer Science, Statistics, Mathematics, and SAP.",
    focusText:
      "Building Python backend services and REST APIs at Tech Pro, while continuing hands-on SAP S/4HANA development and exploring applied machine learning and generative AI through ongoing certifications.",
  },

  // Each group renders as one card in the Skills grid. `icon` selects a
  // pre-approved SVG glyph from content-render.js's ICON_LIBRARY — new
  // groups added via the Admin Panel get a generic "tag" icon.
  skills: [
    {
      id: "skills-languages",
      title: "Programming Languages",
      icon: "code",
      tags: ["Python", "Java", "SAP ABAP", "Object Oriented ABAP", "SQL", "JSP", "Servlets", "C"],
    },
    {
      id: "skills-backend",
      title: "Backend & APIs",
      icon: "layers",
      tags: ["REST APIs", "OData Services", "BAPI", "BADI", "RFC", "IDoc", "JSON", "Database Integration"],
    },
    {
      id: "skills-sap",
      title: "SAP & Enterprise Systems",
      icon: "building",
      tags: ["SAP S/4HANA", "RAP", "CDS Views", "AMDP", "SAP HANA", "ALV Reports", "Enhancements", "Interfaces", "Data Migration Support"],
    },
    {
      id: "skills-databases",
      title: "Databases",
      icon: "database",
      tags: ["MySQL", "Relational Databases"],
    },
    {
      id: "skills-ml",
      title: "Machine Learning & Statistics",
      icon: "trend",
      highlight: true,
      badge: "Core AI focus",
      tags: ["Python", "R", "ANOVA", "Scikit-learn", "Random Forest", "SVM", "KNN", "PyCaret", "LightGBM", "TF-IDF", "Anomaly Detection"],
    },
    {
      id: "skills-automation",
      title: "Automation & Testing",
      icon: "check",
      tags: ["Postman", "Unit Testing", "API Testing", "Debugging", "Code Reviews", "UAT Support", "Playwright"],
    },
    {
      id: "skills-tools",
      title: "Development Tools",
      icon: "tool",
      tags: ["Git", "SAP GUI", "Eclipse ADT", "Agile/Scrum", "SDLC", "Performance Tuning", "Linux", "Unix"],
    },
  ],

  education: [
    {
      id: "edu-masters",
      degree: "Master of Science in Computer and Information Science",
      meta: "University of Southern Mississippi · Dec 2023",
    },
    {
      id: "edu-bachelors",
      degree: "Bachelor’s Degree in Computer Science, Statistics and Mathematics",
      meta: "Acharya Nagarjuna University · 2021",
    },
  ],

  certifications: [
    {
      id: "cert-sap",
      groupTitle: "SAP",
      items: [
        { name: "SAP S/4HANA: From ABAP to Cloud-Ready Applications", issuer: "Board Infinity", badge: "Specialization", featured: true },
        { name: "SAP Professional Fundamentals", issuer: "SAP", featured: true },
      ],
    },
    {
      id: "cert-ai",
      groupTitle: "Artificial Intelligence",
      items: [
        { name: "Google AI Essentials", issuer: "Google", badge: "Specialization", featured: true },
        { name: "Generative AI for Beginners", issuer: "Simplilearn SkillUp" },
        { name: "AI Agents for Beginners", issuer: "Simplilearn SkillUp" },
        { name: "Build Website With AI", issuer: "Simplilearn SkillUp" },
        { name: "Introduction to Artificial Intelligence", issuer: "Simplilearn SkillUp" },
        { name: "LLM Knowledge Certification", issuer: "Issuer not specified" },
      ],
    },
  ],

  contact: {
    email: "dsaisantoshkumar@gmail.com",
    phone: "+16019131606",
    phoneDisplay: "(601) 913-1606",
    location: "Bentonville, AR, USA",
    github: "https://github.com/dsaisantoshkumar",
    githubDisplay: "github.com/dsaisantoshkumar",
    linkedin: "https://linkedin.com/in/santosh29",
    linkedinDisplay: "linkedin.com/in/santosh29",
  },

  // Admin-added Experience roles and Projects are appended after the
  // existing hand-written ones. Empty by default — the Admin Panel pushes
  // entries here (persisted via ContentStore, not by editing this array).
  experienceAdditions: [],
  projectAdditions: [],
};
