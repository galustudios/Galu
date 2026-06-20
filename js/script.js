document.addEventListener("DOMContentLoaded", () => {

  fetch("/components/navbar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
  });
  fetch("/components/footer.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;

    document.getElementById("newsletterForm").addEventListener("submit", (e) => {
      e.preventDefault();
      alert("¡Gracias por suscribirte! Pronto tendrás novedades de GALU.");
      e.target.reset();
    });
  });

  // ── EXPLORE BUTTON ──────────────────────────────────────
  const btn = document.querySelector(".explore-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      const gallery = document.querySelector("#gallery");
      if (gallery) gallery.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ── CURSOR STAR ─────────────────────────────────────────
  const cursor = document.getElementById("cursor");
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";
  });

  const interactivos = document.querySelectorAll("a, button, .card");
  interactivos.forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });

  // ── MODAL FOURTHWALL ────────────────────────────────────
  const overlay    = document.getElementById("modalOverlay");
  const modalFrame = document.getElementById("modalFrame");
  const modalTitle = document.getElementById("modalTitle");
  const modalClose = document.getElementById("modalClose");
  const modalExt   = document.getElementById("modalExternal");

  function openModal(url, name) {
    modalTitle.textContent = name.toUpperCase();
    modalFrame.src = url;
    modalExt.href  = url;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("active");
    modalFrame.src = "";
    document.body.style.overflow = "";
  }

  // Abrir modal al hacer clic en botón de card
  document.querySelectorAll(".card-buy-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = btn.closest(".card");
      const url  = card.dataset.product;
      const name = card.dataset.name;
      if (url) openModal(url, name);
    });
  });

  // Cerrar con X
  modalClose.addEventListener("click", closeModal);

  // Cerrar al hacer clic fuera del modal
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // ── MARIPOSAS ───────────────────────────────────────────
  function crearMariposa() {
    const el = document.createElement("div");
    el.classList.add("butterfly");

    const size     = Math.random() * 22 + 18;
    const drift    = (Math.random() - 0.5) * 130;
    const duracion = Math.random() * 9 + 8;
    const delay    = Math.random() * duracion;
    const aleteo   = Math.random() * 0.4 + 0.3;

    el.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="20" cy="22" rx="18" ry="12" fill="rgba(180,140,255,0.75)" transform="rotate(-30 20 22)"/>
        <ellipse cx="18" cy="38" rx="13" ry="9"  fill="rgba(150,100,255,0.6)"  transform="rotate(15 18 32)"/>
        <ellipse cx="44" cy="22" rx="18" ry="12" fill="rgba(180,140,255,0.75)" transform="rotate(30 44 22)"/>
        <ellipse cx="46" cy="38" rx="13" ry="9"  fill="rgba(150,100,255,0.6)"  transform="rotate(-15 46 38)"/>
        <ellipse cx="32" cy="30" rx="3"  ry="30" fill="rgba(215,197,255,0.9)"/>
      </svg>
    `;

    el.style.left = `${Math.random() * 100}vw`;
    el.style.bottom = `-${size}px`;
    el.style.setProperty("--drift", `${drift}px`);
    el.style.animationDuration = `${duracion}s`;
    el.style.animationDelay   = `-${delay}s`;
    el.querySelector("svg").style.animationDuration = `${aleteo}s`;

    document.body.appendChild(el);
    setTimeout(() => el.remove(), (duracion + 1) * 1000);
  }

  for (let i = 0; i < 12; i++) {
    setTimeout(crearMariposa, i * 600);
  }
  setInterval(crearMariposa, 1800);

});
