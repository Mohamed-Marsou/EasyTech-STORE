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
