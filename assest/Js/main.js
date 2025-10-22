// Mohammed Javeed Portfolio main.js
// Handles animations, smooth scroll, form, and interactions.

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Smooth scrolling for anchor links ---------- */
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#") && targetId.length > 1) {
        e.preventDefault();
        const section = document.querySelector(targetId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // close mobile menu if open
        document.body.classList.remove("menu-open");
      }
    });
  });

  /* ---------- Active nav link highlight on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const navItem = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (navItem) {
          if (entry.isIntersecting) {
            document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
            navItem.classList.add("active");
          }
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(sec => observer.observe(sec));

  /* ---------- Floating logos parallax effect ---------- */
  const floating = document.querySelector(".floating-logos");
  if (floating) {
    window.addEventListener("mousemove", e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30; // -15 to +15
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      floating.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }

  /* ---------- Scroll reveal fade-in animation ---------- */
  const revealEls = document.querySelectorAll(".section");
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach(el => {
    el.classList.add("hidden");
    revealObserver.observe(el);
  });

  /* ---------- Contact form via Formspree ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const data = new FormData(form);
      status.textContent = "Sending…";

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        });
        if (res.ok) {
          status.textContent = "Message sent successfully! ✅";
          form.reset();
        } else {
          const json = await res.json();
          status.textContent = json.error || "Error sending message.";
        }
      } catch (err) {
        status.textContent = "Network error — please try again later.";
      }
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
    });
  }

  /* ---------- Set current year in footer ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

/* ---------- Reveal animations ---------- */
const css = document.createElement("style");
css.textContent = `
  .hidden {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .visible {
    opacity: 1;
    transform: translateY(0);
  }
  nav a.active {
    color: var(--accent);
  }
  body.menu-open nav {
    display: flex !important;
    flex-direction: column;
    background: rgba(0,0,0,0.8);
    position: fixed;
    top: 60px;
    right: 20px;
    padding: 20px;
    border-radius: 12px;
  }
`;
document.head.appendChild(css);
