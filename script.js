document.addEventListener("DOMContentLoaded", () => {

  // ================= EXPLORE =================
  const btn = document.querySelector(".explore-btn");

  if (btn) {
    btn.addEventListener("click", () => {
      const gallery = document.querySelector(".gallery");
      if (gallery) {
        gallery.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // ================= CURSOR STAR =================
  const cursor = document.createElement("div");
  cursor.classList.add("cursor-star");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // ================= FLOATING BUTTERFLIES =================
  function createButterfly() {
    const b = document.createElement("div");
    b.classList.add("butterfly");

    b.innerHTML = "🦋";

    b.style.left = Math.random() * window.innerWidth + "px";
    b.style.bottom = "-20px";

    const duration = 8000 + Math.random() * 10000;

    b.style.animationDuration = duration + "ms";
    b.style.fontSize = (10 + Math.random() * 14) + "px";
    b.style.opacity = (Math.random() * 0.2).toString();

    document.body.appendChild(b);

    setTimeout(() => {
      b.remove();
    }, duration);
  }

  setInterval(createButterfly, 500);

});