const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const replace = require('gulp-replace')
const dateformat = require('dateformat')
const del = require('del')

let cachebuster = ''
const updateCachebuster = function(){
	cachebuster = dateformat(new Date(), 'yymmddHHMMssl')
}
const insertCachebuster = function(stream){
	return replace(/%CACHEBUSTER%/g, cachebuster)
}
updateCachebuster()

gulp.task('clean', ()=>{
	return del(['./dist'])
})

gulp.task('build-cafesheet', ()=>{
	return gulp.src([
		'./src/js/csnode.js',
		'./src/js/cafesheet.js'
	])
	.pipe(concat(`cafesheet-${cachebuster}.js`))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-main', ()=>{
	return gulp.src([
		'./src/js/cafesheet.views.js',
		'./src/js/main.js'
	])
	.pipe(concat(`main-${cachebuster}.js`))
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
	.pipe(concat(`styles-${cachebuster}.css`))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-html', ()=>{
	return gulp.src([
		'./src/*.html'
	])
	.pipe(insertCachebuster())
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
	updateCachebuster()
	gulp.watch('./src/**/*', {ignoreInitial: false}, gulp.task('build'))
})
