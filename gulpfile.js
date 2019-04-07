"use strict";

const {
  src,
  dest
} = require("gulp");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeComments = require("gulp-strip-css-comments");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rigger = require("gulp-rigger");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browsersync = require("browser-sync").create();
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const fileinclude = require("gulp-file-include");


/* Paths to source / build / watch files
=========================*/

var path = {
  build: {
    html: "dist/",
    js: "dist/js/",
    css: "dist/css/",
    images: "dist/images/",
    fonts: "dist/fonts/"
  },
  src: {
    html: "src/html/**/*.html",
    js: ["src/js/scripts.js"],
    css: ["src/css/reset.css", "src/css/bootstrap-reboot.min.css", "src/css/fonts.css", "src/scss/style.scss"],
    images: "src/images/**/*.{jpg,png,svg,gif,ico}",
    fonts: "src/fonts/**/*.{otf,eot,svg,ttf,woff,woff2}"
  },
  watch: {
    /* Все html файлы в папке html на любом уровне вложенности, когда что-то изменится - запустить task html. */
    html: "src/html/**/*.html",
    js: "src/js/**/*.js",
    css: "src/**/**/*.{scss,css}",
    images: "src/images/**/*.{jpg,png,svg,gif,ico}",
    fonts: "src/fonts/**/*.{otf,eot,svg,ttf,woff,woff2}"
  },
  clean: "./dist"
};


/* Tasks
=========================*/

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function html() {
  return src(path.src.html, {
      base: "./src/html/"
    })
    /* plumber нуже для обработки ошибок */
    .pipe(plumber())
    /* Для встройки одного файла HTML в другой.  @@include('blocks/test.html') */
    .pipe(fileinclude({
      prefix: '@@'
    }))
    /* Сохранить исходный файл */
    .pipe(dest(path.build.html))
    /* Обновить */
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css, {
      base: "./src/scss/"
    })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ["last 6 versions"],
      cascade: true
    }))
    .pipe(cssbeautify())
    .pipe(dest(path.build.css))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(removeComments())
    .pipe(concat("all.css"))
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(sourcemaps.write("../css/map"))
    .pipe(dest(path.build.css))
    /* Обновляем браузер, когда что-то изменилось. */
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js, {
      base: "./src/js/"
    })
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(rigger())
    .pipe(babel({
      presets: ["@babel/env"]
    }))
    .pipe(gulp.dest(path.build.js))
    .pipe(uglify())
    .pipe(concat("all.js"))
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(sourcemaps.write("../js/map"))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function images() {
  return src(path.src.images)
    .pipe(imagemin())
    .pipe(dest(path.build.images));
}

function fonts() {
  return src(path.src.fonts).pipe(dest(path.build.fonts));
}

function clean() {
  return del(path.clean);
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles, browserSync);


// export tasks
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;