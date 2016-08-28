var gulp = require('gulp');

var less = require('gulp-less');

var autoprefixer = require('autoprefixer');

var postcss = require('gulp-postcss');

var browserSync = require('browser-sync').create();

var babel = require('gulp-babel');
var cssnano  = require('cssnano');

function errorHandler(error) {
  console.log(error.toString());
}
gulp.task('less', function () {
    return gulp.src('./src/css/*.less')
    .pipe(less())
    .on('error', errorHandler)
    .pipe(
        postcss([
            autoprefixer({browsers: ['> 0.5%']}),
            cssnano()
        ], { parser: less.parser })
    )
    .on('error', errorHandler)
    .pipe(
        gulp.dest('./dist/css')
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
    .on('error', errorHandler)
    .pipe(
        gulp.dest('./dist/js')
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

gulp.task('default', ['less', 'js']);

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("src/css/*.less", ['less']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
