document.addEventListener("DOMContentLoaded", () => {

  // ── EXPLORE BUTTON ──────────────────────────────────────
  const btn = document.querySelector(".explore-btn");

  if (btn) {
    btn.addEventListener("click", () => {
      const gallery = document.querySelector("#gallery");
      if (gallery) {
        gallery.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ── CURSOR STAR ─────────────────────────────────────────
  const cursor = document.getElementById("cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";
  });

  const interactivos = document.querySelectorAll("a, button, .card, .color-dot, .size-btn");

  interactivos.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });

  // ── DESIGNS: cambio de color y talla ─────────────────────
  document.querySelectorAll(".design-card").forEach(card => {
    const preview = card.querySelector(".design-preview");
    const dots = card.querySelectorAll(".color-dot");

    dots.forEach((dot, i) => {
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        const color = dot.dataset.color;
        preview.style.setProperty("--c", color);
        dots.forEach(d => d.classList.remove("active"));
        dot.classList.add("active");
      });
    });

    const sizeBtns = card.querySelectorAll(".size-btn");
    sizeBtns.forEach(b => {
      b.addEventListener("click", () => {
        sizeBtns.forEach(x => x.classList.remove("active"));
        b.classList.add("active");
      });
    });

    const buyBtn = card.querySelector(".buy-btn");
    if (buyBtn) {
      buyBtn.addEventListener("click", () => {
        document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  });

  // ── MARIPOSAS ───────────────────────────────────────────
  function crearMariposa() {
    const el = document.createElement("div");
    el.classList.add("butterfly");

    const size = Math.random() * 22 + 18;

    el.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="20" cy="22" rx="18" ry="12" fill="rgba(180,140,255,0.75)" transform="rotate(-20 20 22)"/>
        <ellipse cx="18" cy="38" rx="13" ry="9"  fill="rgba(150,100,255,0.6)"  transform="rotate(15 18 38)"/>
        <ellipse cx="44" cy="22" rx="18" ry="12" fill="rgba(180,140,255,0.75)" transform="rotate(20 44 22)"/>
        <ellipse cx="46" cy="38" rx="13" ry="9"  fill="rgba(150,100,255,0.6)"  transform="rotate(-15 46 38)"/>
        <ellipse cx="32" cy="30" rx="3" ry="10" fill="rgba(215,197,255,0.9)"/>
      </svg>
    `;

    const x = Math.random() * 100;
    const duracion = Math.random() * 10 + 8;
    const drift = (Math.random() - 0.5) * 120;
    const delay = Math.random() * duracion;
    const aleteo = Math.random() * 0.4 + 0.3;

    el.style.left     = `${x}vw`;
    el.style.bottom   = `-10vh`;
    el.style.setProperty("--drift", `${drift}px`);
    el.style.animationDuration      = `${duracion}s`;
    el.style.animationDelay         = `-${delay}s`;
    el.querySelector("svg").style.animationDuration = `${aleteo}s`;

    document.body.appendChild(el);
  }

  for (let i = 0; i < 18; i++) {
    crearMariposa();
  }

});
