const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

// Juntar todos JS
function gulpJS() {
  return gulp
    .src(["js/main/*.js"])
    .pipe(concat("main-decoskin.js"))
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("js/"));
}

gulp.task("mainjs", gulpJS);

// Plugins JS
function pluginsJS() {
  return gulp
    .src(["js/plugins/*.js"])
    .pipe(concat("plugins.js"))
    .pipe(gulp.dest("js/"));
}

gulp.task("pluginsjs", pluginsJS);

// Selecionando todos os arquivos SCSS
var scssFiles = "css/sass/**/*.scss";

// Destino do CSS
var cssDest = "css/";

// CSS para Desenvolvedores
var sassDevOptions = {
  outputStyle: "expanded"
};

// CSS para Producao
var sassProdOptions = {
  outputStyle: "compressed"
};

// Tarefa 'sassdev' - Execute com o comando 'gulp sassdev'
gulp.task("sassdev", function() {
  return gulp
    .src(scssFiles)
    .pipe(sass(sassDevOptions).on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: true
      })
    )
    .pipe(gulp.dest(cssDest));
});

// Tarefa 'sassprod' - Execute com o comando 'gulp sassprod'
gulp.task("sassprod", function() {
  return gulp
    .src(scssFiles)
    .pipe(sass(sassProdOptions).on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(rename("main-decoskin.min.css"))
    .pipe(gulp.dest(cssDest));
});

// Tarefa 'watch' - Execute com o comando 'gulp watch'
gulp.task("watch", function() {
  gulp.watch("js/main/*.js", gulpJS);
  gulp.watch("js/plugins/*.js", pluginsJS);
  gulp.watch(scssFiles, gulp.parallel("sassdev", "sassprod"));
});

// Tarefa padrão - Execute com o comando 'gulp'
gulp.task(
  "default",
  gulp.parallel("sassdev", "sassprod", "mainjs", "pluginsjs", "watch")
);
