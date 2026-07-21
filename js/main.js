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
