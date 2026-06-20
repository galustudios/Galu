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
  // ── FORMULARIO DE CONTACTO ──────────────────────────────
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("¡Gracias por escribirnos! Te responderemos pronto.");
      e.target.reset();
    });
  }
// ── PRODUCT PAGE ─────────────────────────────────────────
  const productPage = document.getElementById("productPage");
  if (productPage) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const product = window.PRODUCTS ? window.PRODUCTS[id] : null;

    if (!product) {
      productPage.innerHTML = `
        <div class="product-not-found">
          <h2>Diseño no encontrado</h2>
          <p>Vuelve a la <a href="/index.html#gallery">galería</a>.</p>
        </div>
      `;
    } else {
      document.title = `${product.name} | GALU`;

      const sizesHtml = product.comingSoon ? "" : `
        <div class="product-sizes">
          <span>Talla</span>
          <div class="size-options">
            <button class="size-btn" data-size="S">S</button>
            <button class="size-btn" data-size="M">M</button>
            <button class="size-btn" data-size="L">L</button>
            <button class="size-btn" data-size="XL">XL</button>
          </div>
        </div>
      `;

      const buyHtml = product.comingSoon
        ? `<button class="explore-btn" disabled>Próximamente</button>`
        : `<a class="explore-btn" href="${product.fourthwallUrl}" target="_blank">Comprar ahora ↗</a>`;

      productPage.innerHTML = `
        <div class="product-image" style="background:${product.image}"></div>
        <div class="product-info">
          <h2>${product.name}</h2>
          ${product.price ? `<p class="product-price">${product.price}</p>` : ""}
          <p class="product-description">${product.description || "Diseño en camino. Pronto disponible."}</p>
          ${sizesHtml}
          ${buyHtml}
        </div>
      `;

      productPage.querySelectorAll(".size-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          productPage.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        });
      });
    }
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
    if (!overlay) return;
    overlay.classList.remove("active");
    modalFrame.src = "";
    document.body.style.overflow = "";
  }

 // Cerrar con X (solo si el modal existe en esta página)
  if (modalClose && overlay) {
    modalClose.addEventListener("click", closeModal);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });
  }

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
