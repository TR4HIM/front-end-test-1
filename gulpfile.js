var gulp 							= require('gulp');
var sass 							= require('gulp-sass');
var sourcemaps 				= require('gulp-sourcemaps');
var autoprefixer 			= require('gulp-autoprefixer');
var minify 						= require('gulp-minify');
var plumber 					= require('gulp-plumber');
var browserSync 			= require('browser-sync').create();

//Vars
var input 		= 'assets/**/*.scss';
var output 		= 'css';

function showError (error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('sass', function () {
	return gulp.src('assets/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({errLogToConsole: true , outputStyle: 'expanded'}))
	.on('error', showError)
	.pipe(autoprefixer({browsers: ['last 2 versions', '> 5%', 'Firefox ESR']}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(output))
	.pipe(browserSync.stream());
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '.'
    },
  })
});

gulp.task('compress-js', function() {
  gulp.src('app/js/app.js')
  	.pipe(plumber())
    .pipe(minify())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('build-css',['sass']);

gulp.task('build-js',['compress-js']);

gulp.task('watch',['sass','browserSync'],function(){
	gulp.watch('assets/**/*.scss', ['build-css','browserSync']);
  gulp.watch('*.html', ['browserSync']);
});

gulp.task('default',['watch']);