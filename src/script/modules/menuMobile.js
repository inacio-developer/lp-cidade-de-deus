class MenuMobile {
  constructor(btn, menu, icons) {
    this.btn = document.querySelector(`.${btn}`);
    this.icons = document.querySelectorAll(`.${icons}`);
    this.menu = document.querySelector(`.${menu}`);
    this.links = this.menu.querySelectorAll(`li`);
  }

  toggle() {
    this.icons.forEach((icon) =>
      icon.classList.toggle("menu__mobile__icon--active")
    );

    this.menu.classList.toggle("menu__mobile--open");
  }

  close() {}

  addEvent() {
    this.btn.addEventListener("click", this.toggle);
    this.links.forEach((link) => link.addEventListener("click", this.toggle));
  }

  bind() {
    this.toggle = this.toggle.bind(this);
  }

  init() {
    if (this.btn && this.icons && this.menu) {
      this.bind();
      this.addEvent();
    }
  }
}
