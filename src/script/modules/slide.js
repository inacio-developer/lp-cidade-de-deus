class Slide {
  constructor(slide, btnPrevious, btnNext, cards) {
    this.slide = document.querySelector(`.${slide}`);
    this.btnPrevious = document.querySelector(`.${btnPrevious}`);
    this.btnNext = document.querySelector(`.${btnNext}`);
    this.cards = document.querySelectorAll(`.${cards}`);
    this.count = 0;
  }

  counter(btn) {
    const distance = this.cards[1].offsetLeft - this.cards[0].offsetLeft;
    btn === "next" ? (this.count -= distance) : (this.count += distance);
    return this.count;
  }

  nextInfinite() {
    if (this.count === -this.cards[7].offsetLeft) {
      this.count = 0;
      this.slide.style = `transform: translate3d(${this.count}px, 0px, 0px);`;
      return true;
    }
  }

  previousInfinite() {
    if (this.count === 0) {
      this.count = -this.cards[7].offsetLeft;
      this.slide.style = `transform: translate3d(${this.count}px, 0px, 0px);`;
      return true;
    }
  }

  next() {
    if (!this.nextInfinite()) {
      const value = this.counter("next");
      this.slide.style = `transform: translate3d(${value}px, 0px, 0px);`;
    }
  }

  previous() {
    if (!this.previousInfinite()) {
      const value = this.counter("previous");
      this.slide.style = `transform: translate3d(${value}px, 0px, 0px);`;
    }
  }

  addEvent() {
    this.btnPrevious.addEventListener("click", this.previous);
    this.btnNext.addEventListener("click", this.next);
  }

  bind() {
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  init() {
    if (this.slide && this.btnPrevious && this.btnNext && this.cards) {
      this.bind();
      this.addEvent();
    }
  }
}
