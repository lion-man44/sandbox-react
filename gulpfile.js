const gulp = require('gulp');
const webServer = require('gulp-webserver');

gulp.task('server', () => {
  gulp.src('./')
    .pipe(webServer({
      livereload: true,
      port: 8001,
      fallback: 'index.html',
      open: true
    }));
});

gulp.task('default', ['server']);
