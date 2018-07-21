const gulp = require('gulp');
const postcss = require('gulp-postcss');
const { palette } = require('./lib');

const options = {
	palette: require('./fixtures/palette.json'),
};

gulp.task('test', () => {
	return gulp.src('./fixtures/*.css')
		.pipe(postcss([palette(options)]))
		.pipe(gulp.dest('./result'));
});