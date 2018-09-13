const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const del = require('del')

gulp.task('clean', ()=>{
	return del(['./dist'])
})

gulp.task('build-cafesheet', ()=>{
	return gulp.src([
		'./src/js/csnode.js',
		'./src/js/cafesheet.js'
	])
	.pipe(concat('cafesheet.js'))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-main', ()=>{
	return gulp.src([
		'./src/js/cafesheet.views.js',
		'./src/js/main.js'
	])
	.pipe(concat('main.js'))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-tests', ()=>{
	return gulp.src([
		'./tests/*.js'	
	])
	.pipe(concat('tests.js'))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-modules', ()=>{
	return gulp.src([
		'./node_modules/mithril/mithril.min.js',
		'./node_modules/mithril/ospec/ospec.js'
	])
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
		'./src/*.html'
	])
	.pipe(gulp.dest('./dist'))
})

gulp.task('build', gulp.series([
	'clean',
	'build-modules',
	'build-cafesheet',
	'build-main',
	'build-tests',
	'build-css',
	'build-html'
]))

gulp.task('watch', ()=>{
	gulp.watch('./src/**/*', {ignoreInitial: false}, gulp.task('build'))
})
