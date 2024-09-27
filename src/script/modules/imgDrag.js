class Drag {
  constructor() {
    this.imgs = document.querySelectorAll("img");
  }

  noDrag() {
    this.imgs.forEach((img) => (img.draggable = false));
  }

  init() {
    this.noDrag();
  }
}
