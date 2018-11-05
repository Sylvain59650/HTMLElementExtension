const babel = require("gulp-babel");
const gulp = require("gulp");
const concat = require("gulp-concat");
const watch = require("gulp-watch");

const chemins = {
  sources: "./src/",
  distrib: "./distrib/",
  demo: "./docs/demo/modules/htmlelement-extension/"
};



gulp.task("htmlElement.min.js", () => {
  return gulp.src([
      "node_modules/isnotnull/distrib/isDef.js", "src/**.js"
    ])
    .pipe(concat("htmlElement.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: true,
      comments: false,
      minified: true
    }))
    //.pipe(uglify())
    //.on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // .pipe(umd())
    .pipe(gulp.dest(chemins.distrib))
});

gulp.task("release", () => {
  return gulp.src([
      "node_modules/isnotnull/distrib/isDef.js",
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
      "node_modules/isnotnull/distrib/isDef.js",
      "src/**.js"
    ])
    .pipe(concat("htmlElement.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: false,
      comments: false,
      minified: false
    }))
    .pipe(gulp.dest(chemins.demo))
});

gulp.task("watch:htmlElement.min.js", function() {
  watch("./src/**.js", function() {
    gulp.run("htmlElement.min.js");
  });
});



gulp.task("watch:demo", function() {
  watch("src/**.js", function() {
    gulp.run("demo");
  })
});

gulp.task("default", ["htmlElement.min.js", "demo", "watch"]);


gulp.task("all", ["default"]);

gulp.task("watch", ["watch:htmlElement.min.js"]);