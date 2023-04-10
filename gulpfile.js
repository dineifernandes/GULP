"use strict";

const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");

// compilar css
function compileCss() {
  return src("./css/*.scss")
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest("./css/dist"));
}

//JS
function jsMin() {
  return src("./js/*.js").pipe(terser()).pipe(dest("./js/dist/"));
}

// Otimizar images
function optimizeImg() {
  return src("./images/*.{jpg,png}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("./images/images_compress"));
}

// Otimizar images WEBP
function webpImage() {
  return src("./images/*.{jpg,png}")
    .pipe(imagewebp())
    .pipe(dest("./images/images_compress"));
}

function watchTask() {
  watch("./css/*.scss", compileCss);
  watch("./js/*.js", jsMin);
  watch("./images/*.{jpg,png}", optimizeImg);
  watch("./images/dist/*.{jpg,png}", webpImage);
}

exports.default = series(compileCss, jsMin, optimizeImg, webpImage, watchTask);
