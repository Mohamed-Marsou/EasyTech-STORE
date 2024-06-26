// NAV BAR SEARCH
const searchBarIcon = document.getElementById("search_icon");
const OverlaySection = document.getElementById("prfileContainer");
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

//* dark MODE
const ball = document.querySelector(".ball");
const darkLabel = document.querySelector(".dark_label");

// Check if dark mode is in LocalStorage
const darkModeOn = localStorage.getItem("DarkMode");
///
if (darkModeOn) {
  darkLabel.addEventListener("click", () => {
    localStorage.removeItem("DarkMode");
    location.reload();

    document.documentElement.style.setProperty(
      "--bodyBackgroundColor",
      " white"
    );
    document.documentElement.style.setProperty("--textPrimeColor", " #555");
    document.documentElement.style.setProperty(
      "--containerBackgroundColor",
      " #f5f5f5"
    );
    document.documentElement.style.setProperty(
      "--productsBackgroundColor",
      " #eaeaea"
    );
    document.documentElement.style.setProperty("--footerBgColor", " #f8f8f8");
  });
}
if (!darkModeOn) {
  darkLabel.addEventListener("click", () => {
    localStorage.setItem("DarkMode", true);
    location.reload();

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
}
///
window.addEventListener("load", () => {
  if (darkModeOn) {
    ball.classList.add("activeBall");
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
  }
});
