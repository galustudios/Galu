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

});
