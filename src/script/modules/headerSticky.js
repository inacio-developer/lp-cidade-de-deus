class Sticky {
  constructor(header) {
    this.header = document.querySelector(`${header}`);
  }

  addSticky() {
    if (window.scrollY > 300)
      this.header.style.backgroundColor = "rgba(143, 9, 5, 1)";
    else this.header.style.backgroundColor = "transparent";
  }

  addEvent() {
    document.addEventListener("scroll", this.addSticky);
  }

  bind() {
    this.addSticky = this.addSticky.bind(this);
  }

  init() {
    if (this.header) {
      this.bind();
      this.addEvent();
    }
  }
}
