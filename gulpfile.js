var babel = require("gulp-babel");
var gulp = require('gulp');
var concat = require("gulp-concat");
//var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var debug = require('gulp-debug');
var watch = require('gulp-watch');
var gutil = require('gulp-util');

var chemins = {
  sources: "./src/",
  distrib: './distrib/'
};



gulp.task("htmlElement.min.js", () => {
  return gulp.src([
      "src/**.js"
    ])
    .pipe(concat("htmlElement.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: true
    }))
    //.pipe(uglify())
    //.on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // .pipe(umd())
    .pipe(gulp.dest(chemins.distrib))
});


gulp.task('watch:htmlElement.min.js', function() {
  watch("./src**.js", function() {
    gulp.run('htmlElement.min.js');
  });
});



gulp.task('default', ['htmlElement.min.js']);


gulp.task('all', ['default']);

gulp.task("watch", ["watch:htmlElement.min.js"]);