'use strict';
 
 // Incluir gulp
var gulp = require('gulp');

// Incluir plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

// Variáveis
const pastaScss = './scss/**/*.scss';
const saidaScss = './root/css';

const pastaJs = './js/**/*.js';
const saidaJS = './root/js';

const sassConfig = {
  outputStyle: 'compressed'
}
//uncompressed


// Alterações nos arquivos SCSS
gulp.task('sass', function () {
  return gulp.src(pastaScss)
    .pipe(rename('main.min.css'))
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(saidaScss))
})

// Arquivos JS
gulp.task('scripts', function() {
	return gulp.src(pastaJs)
    //.pipe(concat('all.js'))
    //.pipe(gulp.dest(saidaJS))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(saidaJS))
})

// Tarefa default que aciona os watches
gulp.task('default', ['sass', 'scripts'], function () {
  gulp.watch([pastaScss], ['sass'])
  gulp.watch([pastaJs], ['scripts'])
})