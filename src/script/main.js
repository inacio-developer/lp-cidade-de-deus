const header = new Sticky("header");
const menuMobile = new MenuMobile("menu__mobile", "menu", "menu__mobile__icon");
const noDrag = new Drag();
const plansSelect = new CategoryPlan("btn__sign", "cards__plans");
const slide = new Slide(
  "slide",
  "slide__btn__left",
  "slide__btn__right",
  "card"
);

header.init();
menuMobile.init();
noDrag.init();
plansSelect.init();
slide.init();
