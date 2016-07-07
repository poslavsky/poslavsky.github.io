

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var jade = require('gulp-jade');


gulp.task('templates', function() {
  gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('src/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

var dist = '../napishem.github.io/napishem/views/page/others/partner2';
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src',
			index: 'index1.html'
    },
  })
})

// Компилим из LESS in CSS
gulp.task('less', function () {
  return gulp.src('src/styles/common.less')
    .pipe(less())
    .pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Компилим из LESS in CSS с сорсмапой
gulp.task('lessSourcemaps', function () {
  return gulp.src('src/styles/common.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('autoprefixer', function () {
	return gulp.src('src/css/common.css')
		.pipe(autoprefixer({
			browsers: ['last 3 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('src/css'));
});

gulp.task('copyhtml', function() {
   gulp.src('src/*.html')
   .pipe(gulp.dest(dist+'/dist'));
});

gulp.task('copysrc', function() {
   gulp.src('src/**/*')
   .pipe(gulp.dest(dist+'/src'));
});

gulp.task('copyroot', function() {
   gulp.src(['gulpfile.js', 'package.json', 'Readme.md'])
   .pipe(gulp.dest(dist));
});

// Следим за изменениями в файлах
gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.less', ['less']);
  gulp.watch('src/*.jade', ['templates']);
	gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
})

gulp.task('compress', function() {
  return gulp.src('src/js/scripts.js')

    .pipe(gulp.dest(dist+'/dist/js'));
});

gulp.task('cssnano', function() {
    return gulp.src('src/css/common.css')
        .pipe(cssnano())
        .pipe(gulp.dest(dist + '/dist/css'));
});

// Чистим папку продакшена
gulp.task('clean', function() {
del([dist + '/**'])
});

//Билд на продакшен (запуск в консоли gullp build)
gulp.task('build', function (callback) {
  runSequence('clean','less', 'autoprefixer', 'cssnano', 'templates', 'compress', 'copyhtml', 'copysrc', 'copyroot',
    callback
  )
})

//При разработке (запуск в консоли gulp)
gulp.task('default', function (callback) {
  runSequence('lessSourcemaps', 'autoprefixer', 'templates', 'browserSync', 'watch',
    callback
  )
})
