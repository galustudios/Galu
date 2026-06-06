console.log("GALU iniciado");
const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mousemove",()=>{

card.style.transform="translateY(-8px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0) scale(1)";

});

});