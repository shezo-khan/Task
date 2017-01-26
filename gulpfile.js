var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gp_rename = require('gulp-rename');

gulp.task('concat',function(){
  gulp.src('./js/concat/**/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});
gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass({
      // includePaths: require('node-bourbon').with('other/path', 'another/path')
      // - or -
      includePaths: require('node-bourbon').includePaths
    }))
    .pipe(gulp.dest('./css'));
});
gulp.task('watch', function () {
  gulp.watch('./**/*.scss', ['sass']);
});
 gulp.task('default',['sass','concat','watch']);
