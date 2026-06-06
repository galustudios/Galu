document.addEventListener("DOMContentLoaded", () => {

  // ── EXPLORE BUTTON ──────────────────────────────────────
  const btn = document.querySelector(".explore-btn");

  if (btn) {
    btn.addEventListener("click", () => {
      // FIX: usar #gallery con id en vez de .gallery (más confiable)
      const gallery = document.querySelector("#gallery");
      if (gallery) {
        gallery.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ── CURSOR STAR ─────────────────────────────────────────
  // FIX: antes se creaba el div por JS pero no tenía estilos en CSS
  // Ahora el div ya existe en el HTML y solo lo movemos aquí
  const cursor = document.getElementById("cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";
  });

  // FIX: escalar cursor al pasar por elementos interactivos
  const interactivos = document.querySelectorAll("a, button, .card");

  interactivos.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });

  // ── MARIPOSAS ───────────────────────────────────────
  function crearMariposa() {
    const el = document.createElement("div");
    el.classList.add("butterfly");

    // Tamaño aleatorio entre 18px y 40px
    const size = Math.random() * 22 + 18;

    // SVG de mariposa púrpura
    el.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <!-- Ala izquierda superior -->
        <ellipse cx="20" cy="22" rx="18" ry="12" fill="rgba(180,140,255,0.75)" transform="rotate(-20 20 22)"/>
        <!-- Ala izquierda inferior -->
        <ellipse cx="18" cy="38" rx="13" ry="9"  fill="rgba(150,100,255,0.6)"  transform="rotate(15 18 38)"/>
        <!-- Ala derecha superior -->
        <ellipse cx="44" cy="22" rx="18" ry="12" fill="rgba(180,140,255,0.75)" transform="rotate(20 44 22)"/>
        <!-- Ala derecha inferior -->
        <ellipse cx="46" cy="38" rx="13" ry="9"  fill="rgba(150,100,255,0.6)"  transform="rotate(-15 46 38)"/>
        <!-- Cuerpo -->
        <ellipse cx="32" cy="30" rx="3" ry="10" fill="rgba(215,197,255,0.9)"/>
      </svg>
    `;

    // Posición horizontal aleatoria
    const x = Math.random() * 100;
    // Duración entre 8s y 18s
    const duracion = Math.random() * 10 + 8;
    // Vaivén horizontal
    const drift = (Math.random() - 0.5) * 120;
    // Delay para que no salgan todas juntas
    const delay = Math.random() * duracion;
    // Velocidad de aleteo
    const aleteo = Math.random() * 0.4 + 0.3;

    el.style.left     = `${x}vw`;
    el.style.bottom   = `-10vh`;
    el.style.setProperty("--drift", `${drift}px`);
    el.style.animationDuration      = `${duracion}s`;
    el.style.animationDelay         = `-${delay}s`;
    el.querySelector("svg").style.animationDuration = `${aleteo}s`;

    document.body.appendChild(el);
  }

  // Crear 18 mariposas
  for (let i = 0; i < 18; i++) {
    crearMariposa();
  }

});
