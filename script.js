
// ================= EXPLORE =================
document.querySelector(".explore-btn").addEventListener("click", () => {
  document.querySelector(".gallery").scrollIntoView({
    behavior: "smooth"
  });
});

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

  const duration = 8 + Math.random() * 10;
  b.style.animationDuration = duration + "s";

  b.style.fontSize = 10 + Math.random() * 14 + "px";
  b.style.opacity = Math.random() * 0.25;

  document.body.appendChild(b);

  setTimeout(() => {
    b.remove();
  }, duration * 1000);
}

// muchas mariposas suaves
setInterval(() => {
  createButterfly();
}, 400);