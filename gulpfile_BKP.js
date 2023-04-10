"use strict";

const gulp = require("gulp");

const sass = require("gulp-sass")(require("sass"));

sass.compiler = require("node-sass");

// gulp.task("default", watchFunction);
// gulp.task("sass", compileSass);

function compileSass() {
  return gulp
    .src("css/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(gulp.dest("css/dist/css"));
}

function watchFunction() {
  gulp.watch("css/*.scss", compileSass);
}

const imagemin = require("gulp-imagemin");

function imgSquash() {
  return gulp
    .src("./images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./images/images_compress"));
}

gulp.task("imgSquash", imgSquash);

gulp.task("watch", () => {
  gulp.watch("./images/*", imgSquash);
});

gulp.task("default", gulp.series("imgSquash", "watch"));
