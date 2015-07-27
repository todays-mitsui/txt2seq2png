var gulp       = require('gulp');

//var browserify = require('browserify');
//var source     = require('vinyl-source-stream');

var bower      = require('main-bower-files');
var filter     = require('gulp-filter');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');

var sass       = require('gulp-ruby-sass');
var csscomb    = require('gulp-csscomb');
var please     = require('gulp-pleeease');

gulp.task('default', ['bower', 'watch:sass']);

/*
gulp.task('build', function() {
  return browserify({entries: ['./src/index.js']})
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./js/'));
});
*/

gulp.task('bower', function() {
  return gulp.src(bower())
    .pipe(filter('**/*.js'))
    .pipe(concat('init.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('watch:sass', ['sass'], function() {
  gulp.watch('./sass/*.{sass,scss}', ['sass']);
});

gulp.task('sass', function() {
  return sass('sass/', {style: 'compact', sourcemap: false})
//    .pipe(please({minifier: false}))
//    .pipe(csscomb())
    .pipe(gulp.dest('./css/'));
});
