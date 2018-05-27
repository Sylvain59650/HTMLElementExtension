const babel = require("gulp-babel");
const gulp = require("gulp");
const concat = require("gulp-concat");
const debug = require("gulp-debug");
const watch = require("gulp-watch");
const autoRestart = require("gulp-auto-restart");

const chemins = {
  sources: "./src/",
  distrib: "./distrib/",
  demo: "./docs/node_modules/htmlelement-extension/"
};



gulp.task("htmlElement.min.js", () => {
  return gulp.src([
      "node_modules/isnotnull/distrib/isDef.js", "src/**.js"
    ])
    .pipe(concat("htmlElement.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: false,
      comments: false,
      minified: false
    }))
    //.pipe(uglify())
    //.on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // .pipe(umd())
    .pipe(gulp.dest(chemins.distrib))
});

gulp.task("release", () => {
  return gulp.src([
      "src/**.js"
    ])
    .pipe(concat("htmlElement.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: true,
      comments: false,
      minified: true
    }))
    .pipe(gulp.dest(chemins.distrib))
});

gulp.task("demo", () => {
  return gulp.src([
      "distrib/htmlElement.min.js"
    ])
    .pipe(gulp.dest(chemins.demo))
});

gulp.task("watch:htmlElement.min.js", function() {
  watch("./src/**.js", function() {
    gulp.run("htmlElement.min.js");
  });
});





autoRestart({ "task": "watch" });

gulp.task("default", ["htmlElement.min.js", "watch"]);


gulp.task("all", ["default"]);

gulp.task("watch", ["watch:htmlElement.min.js"]);