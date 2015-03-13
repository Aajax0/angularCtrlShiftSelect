var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
 
gulp.task('build', function() {
  gulp.src('src/*.js')
    .pipe(uglify({mangle: false}))
	.pipe(rename({
		extname: '.min.js'
	}))
    .pipe(gulp.dest('dist'))
});

gulp.task('lint', function() {
  gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});