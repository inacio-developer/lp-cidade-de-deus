class CategoryPlan {
  constructor(btn, div) {
    this.btn = document.querySelectorAll(`.${btn}`);
    this.divs = document.querySelectorAll(`.${div}`);
  }

  removeActive() {
    this.btn.forEach((btn) => btn.classList.remove("btn__sign--active"));
    this.divs.forEach((div) => div.classList.remove("cards__plans--active"));
  }

  select(click) {
    this.removeActive();

    if (
      click.target.classList.contains("btn__sign__promotion") ||
      click.target.classList.contains("btn__sign__year")
    ) {
      this.btn[2].classList.add("btn__sign--active");
      this.divs[1].classList.add("cards__plans--active");
    } else {
      this.btn[1].classList.add("btn__sign--active");
      this.divs[0].classList.add("cards__plans--active");
    }
  }

  addEvent() {
    this.btn.forEach((btn) => btn.addEventListener("click", this.select));
  }

  bind() {
    this.select = this.select.bind(this);
  }

  init() {
    if (this.btn && this.divs) {
      this.bind();
      this.addEvent();
    }
  }
}
