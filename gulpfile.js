///////////////////////////////////////////////////////
// VARIABLES
///////////////////////////////////////////////////////
var gulp = require('gulp'),
del = require('del'),
sass = require('gulp-sass'),
//csso = require('gulp-csso'),
//inject = require('gulp-inject'),
//wiredep = require('wiredep').stream,
watch = require('gulp-watch'),
notify = require("gulp-notify") ,
cssmin = require('gulp-cssmin'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
order = require("gulp-order"),
//pump = require('pump'),
strip = require('gulp-strip-comments'),
autoprefixer = require('gulp-autoprefixer'),
browserSync = require('browser-sync').create(),
concat = require('gulp-concat'),
concatCss = require('gulp-concat-css'),
babel = require('gulp-babel'),
config = {
  sassPath: './assets/scss',
  jsPath: './assets/js',
  cssPath: './assets/css',
  imgPath: './assets/img',
  fontPath: "./assets/fonts",
  basePath: './assets',
  cssDest: './src/css',
  jsDest: './src/js'
};

///////////////////////////////////////////////////////
// MOVE IMAGES TO CSS DIR
///////////////////////////////////////////////////////
gulp.task('move-img', function() {
  return gulp.src(['./assets/img/sfyd/**/*'])
    .pipe(gulp.dest('./src/img/'));
});


///////////////////////////////////////////////////////
// Concatonate Styles and Compile SCSS
///////////////////////////////////////////////////////
gulp.task('css', function(){
  return gulp
    .src('assets/scss/**.scss')
    .pipe(sass({
        outputStyle: 'expanded'
      })
      .on("error", notify.onError(function(error) {
        return "Error: " + error.message;
      })))
    .pipe(concatCss('custom.min.css'))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest("./src/css"));
});

gulp.task('concat-css', function(){
  return gulp
    .src('assets/css/**.css')
    // .pipe(order([

    // ]))
    .pipe(concatCss('main.min.css'))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(config.cssDest))
});

///////////////////////////////////////////////////////
// Concatonate Builds and Compile JS
///////////////////////////////////////////////////////

gulp.task('concat-js', function () {
  return gulp
    .src('assets/js/**.js')
    // .pipe(order([

    // ]))
    .pipe(concat('main.min.js'))
    .pipe(strip())
    .pipe(uglify())
    .pipe(gulp.dest(config.jsDest))
});

// gulp.task('ctrl-js', () => {
//     return gulp.src('src/construct.js')
//       .pipe(babel({
//           presets: ['es2015']
//       }))
//       .pipe(strip())
//       .pipe(uglify())
//       .pipe(gulp.dest('src/construct.min.js'));
// });


///////////////////////////////////////////////////////
// Browser Sync for Quick Updates + Proxies [Mobile]
///////////////////////////////////////////////////////
// var site_map = "localhost/8888";
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: site_map
//     });
// });

///////////////////////////////////////////////////////
// TASKS
///////////////////////////////////////////////////////

//Add or Remove Tasks from Array
var default_tasks = ['css'];
gulp.task('default', default_tasks, function(){
  gulp.watch(["assets/scss/**.scss"], ['default']);
});

gulp.task('move', ['move-img'], function(){
  gulp.watch([config.basePath + '/**/*'], ['move']);
});




