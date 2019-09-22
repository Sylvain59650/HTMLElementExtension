const babel = require("gulp-babel");
const gulp = require("gulp");
const concat = require("gulp-concat");
const watch = require("gulp-watch");
const git = require("gulp-git");
const replace = require("gulp-replace");
const tap = require("gulp-tap");
const runCommand = require("gulp-run-command");
const shell = require('gulp-shell');

const chemins = {
  sources: "./src/",
  distrib: "./distrib/",
  demo: "./docs/demo/modules/htmlelement-extension/",
  vspublish: "\"C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Community\\MSBuild\\15.0\\Bin\\msbuild.exe\" C:\\Projets\\diageris2\\Syngenta.Diageris.WEB\\Syngenta.Diageris.MVC.csproj /p:DeployOnBuild=true /p:PublishProfile=Publication"
};

const args = (argList => {
  let arg = {},
    a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, "");
    if (opt === thisOpt) {
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    } else {
      curOpt = opt;
      arg[curOpt] = true;
    }
  }
  return arg;
})(process.argv);



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
  watch("./src/*.js", gulp.series("htmlElement.min.js"));
});



gulp.task("watch:demo", function() {
  watch("src/**.js", gulp.series("demo"));
});

gulp.task("watch", gulp.parallel("watch:htmlElement.min.js"));

gulp.task("default", gulp.parallel("htmlElement.min.js", "demo", "watch"));

gulp.task("tag", function() {
  git.tag("0.8.14", "Version 0.8.14", { signed: true }, function(err) {
    if (err) { throw err; }
  });
});



gulp.task("replace-version", function() {
  return gulp.src(["./**/Properties/AssemblyInfo.cs"])
    .pipe(replace(/\d.\d.\d.\d/g, args.vers))
    // .pipe(replace(/AssemblyFileVersion(\".*\")/, function(match) {
    //   return "AssemblyFileVersion(\"1.9.0.3\")";
    // }))
    .pipe(gulp.dest(function(file) {
      console.log(file.path);
      console.log(args);
      return file.base;
    }));
});

gulp.task("vspublish", shell.task(chemins.vspublish));