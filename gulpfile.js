var babel = require("gulp-babel");
var gulp = require('gulp');
var concat = require("gulp-concat");
//var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var debug = require('gulp-debug');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

var webserver = require('gulp-webserver');
var browserSync = require('browser-sync').create();

var express = require('express');
var app = express();

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
      compact: false
    }))
    //.pipe(uglify())
    //.on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // .pipe(umd())
    .pipe(gulp.dest(chemins.distrib))
});


gulp.task('watch:htmlElement.min.js', function() {
  watch("./src/**.js", function() {
    gulp.run('htmlElement.min.js');
  });
});


gulp.task('serve', function() {
  var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
    app.use(express.static('tests'));
    console.log("listening at http://%s:%s", host, port)
  })
});


gulp.task('webserver', function() {
  gulp.src('tests')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('sass', function() {
  return gulp.src('./styles/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./distrib'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('default', ['htmlElement.min.js']);


gulp.task('all', ['default']);

gulp.task("watch", ["watch:htmlElement.min.js"]);