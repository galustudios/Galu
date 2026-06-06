// EXPLORE SCROLL
document.querySelector(".explore-btn").addEventListener("click", () => {
  document.querySelector(".discover").scrollIntoView({
    behavior: "smooth"
  });
});

// ================= GLOW MOUSE EFFECT =================
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});

// loader cleanup safety
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 2500);
});