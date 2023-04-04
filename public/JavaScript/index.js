const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    let offset = btn.dataset.carouselButton;
    const slides = btn
      .closest("[data-carousel]")
      .querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide);
    buttons.forEach((button) => {
      button.classList.remove("active_btn");
    });

    btn.classList.add("active_btn");

    if (offset == newIndex) return;
    newIndex = offset;
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

// NAV BAR SEARCH
const searchBarIcon = document.getElementById("search_icon");
const OverlaySection = document.getElementById("Hero__carousel");
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

// ------------ DARK MODE
// Check if dark mode is in LocalStorage
const darkModeOn = localStorage.getItem("DarkMode");

///
window.addEventListener("load", () => {
  if (darkModeOn) {
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
