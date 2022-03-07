const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('@fullhuman/postcss-purgecss');
const autoprefixer = require('autoprefixer');

function styles() {
  const processors = [
    purgecss({
      content: ['./views/**/*.handlebars'],
      keyframes: true,
      safelist: ['is-active', 'active'],
    }),
    autoprefixer,
  ];
  return gulp
    .src(['./src/scss/styles.scss'])
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./public/css'));
}

function watchTask() {
  gulp.watch(['./src/scss/**/*.scss', './views/**/*.handlebars'], styles);
}

exports.production = styles;
exports.default = gulp.series(styles, watchTask);
