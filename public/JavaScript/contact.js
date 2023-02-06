// NAV BAR SEARCH
const searchBarIcon = document.getElementById("search_icon");
const OverlaySection = document.getElementById("map");
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

// LEAFLET
var map = L.map("map", { scrollWheelZoom: false }).setView(
  [35.7595, -5.834],
  13
);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
var marker = L.marker([35.7595, -5.834], { alt: "TechJoy" })
  .addTo(map) // "Kyiv" is the accessible name of this marker
  .bindPopup("Visit us at TechJoy!");

// DARK MOODE
const darkMode = document.getElementById("darkMode");
darkMode.addEventListener("click", () => {
  document.documentElement.style.setProperty(
    "--bodyBackgroundColor",
    " #1b1b1b"
  );
  document.documentElement.style.setProperty("--textPrimeColor", " azure");
  document.documentElement.style.setProperty(
    "--containerBackgroundColor",
    " #212121"
  );
  document.documentElement.style.setProperty(
    "--productsBackgroundColor",
    " #495057"
  );
  document.documentElement.style.setProperty(
    "--footerBgColor",
    " #495021212157"
  );
});
