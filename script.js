document.addEventListener("DOMContentLoaded", () => {

  // EXPLORE BUTTON
  const btn = document.querySelector(".explore-btn");

  if (btn) {
    btn.addEventListener("click", () => {
      const gallery = document.querySelector(".gallery");
      if (gallery) {
        gallery.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // CURSOR STAR
  const cursor = document.createElement("div");
  cursor.classList.add("cursor-star");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

});