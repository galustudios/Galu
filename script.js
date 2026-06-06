const cards = document.querySelectorAll(".card");

// hover motion más suave (editorial feel)
cards.forEach(card => {

  card.addEventListener("mousemove", () => {
    card.style.transform = "translateY(-8px) scale(1.03)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });

});