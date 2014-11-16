var gulp = require('gulp'),
  connect = require('gulp-connect'),
  bowerFiles = require('main-bower-files'),
  inject = require('gulp-inject');
  less = require('gulp-less');
  path = require('path');

// inject bower packages into index.html
gulp.task('bower-install', function(){
  gulp.src('./index.html')
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
    .pipe(gulp.dest('./'))
})

gulp.task('less', function () {
  gulp.src('./less/base_style.less')
    .pipe(less())
    .pipe(gulp.dest('./styles'));
});

// connect web server
gulp.task('connect', function(){
  connect.server({
    root: [__dirname],
    livereload: true
  })
})

// reload index.html
gulp.task('htmlReload', function(){
  gulp.src('./index.html').pipe(connect.reload())
})

// reload js files
gulp.task('jsReload', function(){
  gulp.src('scripts/*.js').pipe(connect.reload())
})

// watch files for changes
gulp.task('watch', function(){
  gulp.watch([
    './index.html',
    'scripts/**/*.js',
    'less/overrides.less',
  ], ['htmlReload', 'jsReload', 'less'])  // run reload onchange
})

// register default tasks
gulp.task('default', [
  'bower-install',
  'less',
  'connect',
  'watch'
])

