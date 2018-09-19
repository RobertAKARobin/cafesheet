const gulp = require('gulp')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const replace = require('gulp-replace')
const dateformat = require('dateformat')
const del = require('del')
const fs = require('fs')
const CSComponents = ['sheet', 'table', 'section', 'column', 'row', 'cell']
let ENV

const loadEnv = function(done){
	ENV = JSON.parse(fs.readFileSync('./env.json'))
	ENV.CSData = fs.readFileSync('./data.json')
	ENV.cachebuster = dateformat(new Date(), 'yymmddHHMMssl')
	done()
}
const insertEnv = function(stream){
	return replace(/\$([a-zA-Z0-9_-]+)\$/g, (nil, varname)=>{
		return ENV[varname]
	})
}

gulp.task('clean', ()=>{
	return del(['./dist'])
})

gulp.task('build-cafesheet', ()=>{
	return gulp.src(['csnode'].concat(CSComponents).map((component)=>{
		return `./src/${component}.js`
	}))
	.pipe(insertEnv())
	.pipe(concat(`cafesheet-${ENV.cachebuster}.js`))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-views', ()=>{
	return gulp.src(CSComponents.map((component)=>{
		return `./src/${component}.views.js`
	}))
	.pipe(insertEnv())
	.pipe(concat(`cafesheet.views-${ENV.cachebuster}.js`))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-main', ()=>{
	return gulp.src([
		'./web/main.js'
	])
	.pipe(insertEnv())
	.pipe(concat(`main-${ENV.cachebuster}.js`))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-tests', ()=>{
	return gulp.src(CSComponents.map((component)=>{
		return `./src/${component}.spec.js`
	}))
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
		'./web/styles.scss'
	])
	.pipe(sass({
		outputStyle: 'expanded',
		sourceMap: 'non'
	}))
	.pipe(insertEnv())
	.pipe(concat(`styles-${ENV.cachebuster}.css`))
	.pipe(gulp.dest('./dist'))
})

gulp.task('build-html', ()=>{
	return gulp.src([
		'./web/*.html'
	])
	.pipe(insertEnv())
	.pipe(gulp.dest('./dist'))
})

gulp.task('build', gulp.series([
	'clean',
	loadEnv,
	'build-modules',
	'build-cafesheet',
	'build-views',
	'build-main',
	'build-tests',
	'build-css',
	'build-html'
]))

gulp.task('watch', ()=>{
	gulp.watch([
		'./*.json',
		'./src/**/*',
		'./web/**/*'
	], {ignoreInitial: false}, gulp.task('build'))
})
