const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const del = require('del')

gulp.task('clean', ()=>{
	return del(['./dist'])
})

gulp.task('build-js', ()=>{
	return gulp.src([
		'./src/js/csnode.js',
		'./src/js/cafesheet.js',
		'./src/js/cafesheet.views.js',
		'./src/js/main.js'
	])
	.pipe(concat('main.js'))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-css', ()=>{
	return gulp.src([
		'./src/styles.scss'
	])
	.pipe(sass({
		outputStyle: 'expanded',
		sourceMap: 'non'
	}))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-html', ()=>{
	return gulp.src([
		'./src/index.html'
	])
	.pipe(gulp.dest('./dist'))
})

gulp.task('build', gulp.series([
	'clean',
	'build-js',
	'build-css',
	'build-html'
]))

gulp.task('watch', ()=>{
	gulp.watch('./src/**/*', {ignoreInitial: false}, gulp.task('build'))
})
