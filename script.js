// EXPLORE SCROLL
document.querySelector(".explore-btn").addEventListener("click", () => {
  document.querySelector(".discover").scrollIntoView({
    behavior: "smooth"
  });
});

// ================= GLOW FOLLOW MOUSE =================
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", (e.clientX - rect.left) + "px");
    card.style.setProperty("--y", (e.clientY - rect.top) + "px");
  });
});

// ================= LOADER SAFE CLEAN =================
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, 2500);
});