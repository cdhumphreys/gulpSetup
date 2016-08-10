var gulp = require('gulp');

var less = require('postcss-less-engine');

var autoprefixer = require('autoprefixer');

var postcss = require('gulp-postcss');

var browserSync = require('browser-sync').create();

var babel = require('gulp-babel');


gulp.task('less', function () {
    return gulp.src('./src/css/style.less')
    .pipe(
        postcss([
            less(),
            autoprefixer()
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
    return gulp.src('./src/js/scripts.js')
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

gulp.task('browsersync', ['less', 'js'], function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});




gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('css'))
                .pipe(bs.reload({stream: true}));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("src/css/*.less", ['less']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
