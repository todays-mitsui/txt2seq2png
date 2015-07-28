var gulp       = require('gulp');

var bower      = require('main-bower-files');
var filter     = require('gulp-filter');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');

var sass       = require('gulp-ruby-sass');
var plumber    = require('gulp-plumber');
var csscomb    = require('gulp-csscomb');
var please     = require('gulp-pleeease');

gulp.task('default', ['bower', 'watch:sass']);

gulp.task('bower', function() {
  return gulp.src(bower())
    .pipe(filter('**/*.js'))
    .pipe(concat('init.js'))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./js/'));
});

gulp.task('watch:sass', ['sass'], function() {
  gulp.watch('./sass/*.{sass,scss}', ['sass']);
});

gulp.task('sass', function() {
  return sass('sass/', {style: 'expanded', sourcemap: false})
    .pipe(plumber({errorHandler: function(err) {
      console.log(err);
    }}))
    .pipe(filter('**/*.css'))
    .pipe(csscomb())
    .pipe(please())
    .pipe(gulp.dest('./css/'));
});
