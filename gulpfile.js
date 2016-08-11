var gulp = require('gulp');

var less = require('gulp-less');

var autoprefixer = require('autoprefixer');

var postcss = require('gulp-postcss');

var browserSync = require('browser-sync').create();

var babel = require('gulp-babel');
var cssnano  = require('cssnano');

gulp.task('less', function () {
    return gulp.src('./src/css/*.less')
    .pipe(less())
    .pipe(
        postcss([
            autoprefixer({browsers: ['> 0.5%']}),
            cssnano()
        ], { parser: less.parser })
    )
    .pipe(
        gulp.dest('./dist')
    )
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
    .pipe(babel({
          presets: ['es2015']
        }))
    .pipe(
        gulp.dest('./dist')
    )
    .pipe(
      browserSync.reload({
        stream:true
      })
    );
});

gulp.task('browser-sync', ['less', 'js'], function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});


gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("src/css/*.less", ['less']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
