// ==========================================================================
// Sai Santosh Kumar Devarasetty — Portfolio
// EmailJS config reused as-is from dsaisantoshkumar.github.io so the
// contact form behaves identically to the existing site.
// ==========================================================================

const EMAILJS_PUBLIC_KEY = "fof2kfSPzOm-gRMrI";
const EMAILJS_SERVICE_ID = "service_yxemoqc";
const EMAILJS_TEMPLATE_ID = "template_836mkd8";

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ---------- contact form ----------

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Honeypot: real visitors never see or fill this hidden field.
    // Bots that auto-fill every input will trip it, so we silently
    // pretend to succeed without ever calling EmailJS.
    const honeypot = document.getElementById("company_website");
    if (honeypot && honeypot.value.trim() !== "") {
      formStatus.textContent = "Message sent. Thanks for reaching out, I will reply soon.";
      formStatus.className = "form-status success";
      contactForm.reset();
      return;
    }

    const params = {
      from_name: document.getElementById("from_name").value,
      from_email: document.getElementById("from_email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      to_email: "dsaisantoshkumar@gmail.com",
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params).then(
      function () {
        formStatus.textContent = "Message sent. Thanks for reaching out, I will reply soon.";
        formStatus.className = "form-status success";
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      },
      function (error) {
        formStatus.textContent = "Something went wrong. Please email me directly at dsaisantoshkumar@gmail.com.";
        formStatus.className = "form-status error";
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        console.error("EmailJS error:", error);
      }
    );
  });
}

// ---------- copy email ----------

const copyEmailBtn = document.getElementById("copyEmailBtn");

if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", function () {
    const email = "dsaisantoshkumar@gmail.com";
    const label = copyEmailBtn.querySelector("span");
    const restore = function () {
      copyEmailBtn.classList.remove("copied");
      if (label) label.textContent = "Copy";
    };
    navigator.clipboard
      .writeText(email)
      .then(function () {
        copyEmailBtn.classList.add("copied");
        if (label) label.textContent = "Copied!";
        setTimeout(restore, 2000);
      })
      .catch(function () {
        if (label) label.textContent = "Failed";
        setTimeout(restore, 2000);
      });
  });
}

// ---------- dark mode toggle ----------

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
}

// ---------- mobile nav toggle ----------

const navToggle = document.getElementById("navToggle");
const sideNav = document.querySelector(".side-nav");

if (navToggle && sideNav) {
  navToggle.addEventListener("click", function () {
    const isOpen = sideNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  sideNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      sideNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---------- scroll-spy active nav state ----------

const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".side-nav a");

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.dataset.section === id);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);

sections.forEach(function (section) {
  observer.observe(section);
});

// ---------- scroll reveal (fade + slide up) ----------

const revealEls = document.querySelectorAll(
  ".card, .project, .stat-chip, .specialty-card, .focus-panel"
);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

revealEls.forEach(function (el) {
  el.classList.add("reveal");
});

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add("in-view");
          revealObserver.unobserve(el);
          el.addEventListener(
            "transitionend",
            function cleanup() {
              el.classList.remove("reveal", "in-view");
              el.removeEventListener("transitionend", cleanup);
            },
            { once: true }
          );
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });
} else {
  revealEls.forEach(function (el) {
    el.classList.add("in-view");
  });
}
