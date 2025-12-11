// script.js (module)
const typePhrases = [
  "Je crée des expériences Web.",
  "Développement Full-Stack.",
  "Systèmes robustes et maintenables.",
];

document.addEventListener("DOMContentLoaded", () => {
  // year
  document.getElementById("year").textContent = new Date().getFullYear();

  // typewriter
  startTypewriter("typewriter", typePhrases, 100, 1500);

  // mobile menu
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
    if (nav.classList.contains("open")) {
      nav.style.display = "flex";
      nav.style.flexDirection = "column";
      nav.style.position = "absolute";
      nav.style.top = "64px";
      nav.style.right = "20px";
      nav.style.background = "rgba(2,6,23,0.95)";
      nav.style.padding = "14px";
      nav.style.borderRadius = "10px";
    } else {
      nav.style.display = "";
      nav.style.position = "";
      nav.style.top = "";
      nav.style.right = "";
      nav.style.padding = "";
      nav.style.background = "";
      nav.style.borderRadius = "";
    }
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: "smooth", block:"start"});
      }
    });
  });

  // project modal logic
  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  projectCards.forEach(card => {
    card.querySelector(".project-open").addEventListener("click", () => {
      openProjectModal(card);
    });
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // contact form (fake submit)
  const contactForm = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendBtn");
  const formMsg = document.getElementById("formMsg");
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    sendBtn.disabled = true;
    sendBtn.textContent = "Envoi...";
    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.textContent = "Envoyer";
      formMsg.textContent = "Merci — ton message a été envoyé (demo).";
      setTimeout(()=> formMsg.textContent = "", 4000);
      contactForm.reset();
    }, 1000);
  });

  // theme toggle (simple)
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
    const isLight = document.documentElement.classList.contains("light");
    themeToggle.textContent = isLight ? "🌞" : "🌙";
    // quick simple theme flip (you can expand)
    if (isLight) {
      document.documentElement.style.setProperty('--bg','#fff');
      document.documentElement.style.setProperty('--text','#071022');
    } else {
      document.documentElement.style.removeProperty('--bg');
      document.documentElement.style.removeProperty('--text');
    }
  });

});

// -------- typewriter implementation
function startTypewriter(elId, phrases, charDelay = 80, pause = 1200){
  const el = document.getElementById(elId);
  let pi = 0, ci = 0, forward = true;
  function step(){
    const current = phrases[pi];
    if (forward) {
      ci++;
      el.textContent = current.slice(0,ci);
      if (ci === current.length) {
        forward = false;
        setTimeout(step, pause);
        return;
      }
    } else {
      ci--;
      el.textContent = current.slice(0,ci);
      if (ci === 0) {
        forward = true;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(step, charDelay);
  }
  step();
}

// -------- modal helpers
function openProjectModal(card){
  const title = card.dataset.title || card.querySelector("h3").textContent;
  const desc = card.dataset.description || "";
  const tags = card.dataset.tags || "";
  const img = card.dataset.image || card.querySelector("img").src;

  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent = desc;
  document.getElementById("modalTags").textContent = tags;
  document.getElementById("modalImage").src = img;
  document.getElementById("projectModal").setAttribute("aria-hidden","false");
}

function closeModal(){
  const modal = document.getElementById("projectModal");
  modal.setAttribute("aria-hidden","true");
  // clear content optionally
  // document.getElementById("modalImage").src = "";
}
