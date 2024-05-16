// NAV BAR SEARCH
const searchBarIcon = document.getElementById("search_icon");
const OverlaySection = document.getElementById("mainCintianer");
const searchBarContainer = document.querySelector(
  ".resp__serach__barContainer"
);
let clicked = false;
searchBarIcon.addEventListener("click", () => {
  searchBarIcon.style.display = "none";
  searchBarContainer.style = "display:flex";
  clicked = true;
});
OverlaySection.addEventListener("click", () => {
  if (clicked) {
    searchBarIcon.style.display = "flex";
    searchBarContainer.style = "display:none";
    clicked = false;
  }
});

// Working on product carousel
const mainProduct = document.getElementById("mainCover");
const otherSlide = document.querySelectorAll(".opt > img");
otherSlide.forEach((pic) => {
  pic.addEventListener("click", () => {
    mainProduct.src = pic.src;
  });
});

// Culc percentage
const displayPercentage = document.getElementById("percentage");
const finalPrice = document.getElementById("finalPrice");
const orignalPrice = document.getElementById("orignalPrice");

let finalPriceNum = Number(
  finalPrice.innerHTML.substring(0, finalPrice.innerHTML.indexOf(" "))
);
let orignalPriceNum = Number(
  orignalPrice.innerHTML.substring(0, orignalPrice.innerHTML.indexOf(" "))
);
let culcPercentage =
  ((finalPriceNum - orignalPriceNum) /
    ((finalPriceNum + orignalPriceNum) / 2)) *
  100;
displayPercentage.innerHTML = culcPercentage.toFixed(0) + "%";

//Coloring cell table
const cells = document.querySelectorAll(".cell");
for (let i = 0; i < cells.length; i += 2) {
  cells[i].style = "background-color : #eee";
}
// display right price
price = finalPrice.innerHTML.substring(0, finalPrice.innerHTML.indexOf(" "));
const Quantity = document.getElementById("Quantity");
Quantity.addEventListener("change", () => {
  finalPrice.innerHTML = price * Quantity.value + "$";
});
