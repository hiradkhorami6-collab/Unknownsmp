document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".header");
  const form = document.querySelector("#joinForm");
  const status = document.querySelector("#formStatus");
  const year = document.querySelector("#year");

  year.textContent = new Date().getFullYear();

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  // Subtle header state while scrolling
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Reveal animations
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));

  // Active navigation section
  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.remove("active"));
      const current = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      current?.classList.add("active");
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => sectionObserver.observe(section));

  // Demo whitelist form.
  // Replace the block inside this handler with your backend/Discord webhook/API call.
  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const application = {
      minecraft: data.minecraft,
      age: data.age,
      telegram: data.telegram || "",
      reason: data.reason,
      submittedAt: new Date().toISOString()
    };

    console.log("Unknown SMP application:", application);
    status.textContent = "Application received locally. Connect a backend in script.js to send it to your staff system.";
    form.reset();
  });
});
