// ==========================================================
// Funkware — site behavior
// Set your real inbox here; the footer/contact links and the
// contact form all use it.
// ==========================================================
const CONTACT_EMAIL = "hello@funkware.com";

document.documentElement.classList.add("js");

// Email links
document.querySelectorAll("[data-email]").forEach((a) => {
  a.href = `mailto:${CONTACT_EMAIL}`;
  a.textContent = CONTACT_EMAIL;
});

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Header border on scroll
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-menu");
const setMenu = (open) => {
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  reveals.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
} else {
  reveals.forEach((el) => el.classList.add("in"));
}

// Contact form → opens the visitor's email app with the message filled in.
// (No server needed. To receive submissions directly instead, point the form
// at a service like Formspree or Netlify Forms — see README.md.)
const form = document.getElementById("contact-form");
const note = form.querySelector(".form-note");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const valid = field.value.trim() !== "" && field.checkValidity();
    field.classList.toggle("invalid", !valid);
    if (!valid) ok = false;
  });

  if (!ok) {
    note.textContent = "Please fill in your name, a valid email and a short message.";
    note.className = "form-note error";
    return;
  }

  const d = Object.fromEntries(new FormData(form));
  const subject = `Project inquiry: ${d.interest}${d.company ? ` — ${d.company}` : ""}`;
  const body = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.company ? `Company: ${d.company}` : null,
    `Interested in: ${d.interest}`,
    d.budget ? `Budget: ${d.budget}` : null,
    "",
    d.message,
  ].filter((line) => line !== null).join("\n");

  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  note.textContent = "Thanks! Your email app should open with your message ready to send.";
  note.className = "form-note ok";
});

form.addEventListener("input", (e) => {
  if (e.target.classList.contains("invalid") && e.target.value.trim()) {
    e.target.classList.remove("invalid");
  }
});
