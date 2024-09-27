import { src, dest, watch, series } from "gulp";
import htmlmin from "gulp-htmlmin";
import imagemin from "gulp-imagemin";
import flatten from "gulp-flatten";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import GulpCleanCss from "gulp-clean-css";
import rename from "gulp-rename";
import htmlReplace from "gulp-html-replace";
import replace from "gulp-replace";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import order from "gulp-order";
import gulpIf from "gulp-if";

let isProduction = false;
let destiny = "dev/";

const path = {
  html: "src/index.html",
  sass: "src/styles/main.scss",
  font: "src/assets/fonts/**/*",
  images: "src/assets/img/**/*.{png,jpg,jpeg,gif,svg}",
  videos: "src/assets/videos/*.mp4",
  js: "src/script/**/*.js",
};

const sass = gulpSass(dartSass);

const buildHTML = () => {
  return src(path.html)
    .pipe(
      gulpIf(
        isProduction,
        htmlReplace({
          css: "styles.min.css",
          js: "main.min.js",
        })
      )
    )
    .pipe(
      replace(/\.\/assets\/img\/(photos|logos|characters|icons)\//g, "img/")
    )
    .pipe(replace(/\.\/assets\/videos\//g, "videos/"))
    .pipe(gulpIf(isProduction, htmlmin({ collapseWhitespace: true })))
    .pipe(dest(destiny));
};

const buildStyle = () => {
  return src(path.sass)
    .pipe(gulpIf(!isProduction, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpIf(isProduction, rename("styles.min.css")))
    .pipe(gulpIf(isProduction, GulpCleanCss()))
    .pipe(sourcemaps.write())
    .pipe(dest(destiny));
};

const buildFont = () => {
  return src(path.font, { encoding: false }).pipe(dest(destiny + "fonts"));
};

const buildImg = () => {
  return src(path.images, { encoding: false })
    .pipe(gulpIf(isProduction, imagemin()))
    .pipe(flatten())
    .pipe(dest(destiny + "img"));
};

const buildVideo = () => {
  return src(path.videos, { encoding: false })
    .pipe(flatten())
    .pipe(dest(destiny + "videos"));
};

const buildJs = () => {
  return src(path.js)
    .pipe(sourcemaps.init())
    .pipe(
      order(["src/script/modules/**/*.js", "src/script/index.js"], {
        base: "./",
      })
    )
    .pipe(gulpIf(isProduction, uglify()))
    .pipe(gulpIf(!isProduction, concat({ path: "main.js" })))
    .pipe(gulpIf(isProduction, concat({ path: "main.min.js" })))
    .pipe(sourcemaps.write())
    .pipe(dest(destiny));
};

const changeEnv = (done) => {
  isProduction = true;
  destiny = "dist/";
  done();
};

const build = series(
  changeEnv,
  buildHTML,
  buildStyle,
  buildFont,
  buildImg,
  buildVideo,
  buildJs
);

export { build };
export default () => {
  watch([path.html], { ignoreInitial: false }, series(buildHTML));
  watch([path.font], { ignoreInitial: false }, series(buildFont));
  watch(["src/styles/**"], { ignoreInitial: false }, series(buildStyle));
  watch([path.images], { ignoreInitial: false }, series(buildImg));
  watch([path.videos], { ignoreInitial: false }, series(buildVideo));
  watch([path.js], { ignoreInitial: false }, series(buildJs));
};
