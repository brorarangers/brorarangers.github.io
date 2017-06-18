// All the gulp plugins required

var gulp = require('gulp'); // Obviously
var sass = require('gulp-sass'); // Convert scss to css
var autoprefixer = require('gulp-autoprefixer'); // and sort out prefixes
var cssnano = require('gulp-cssnano');
var shell = require('gulp-shell'); // Allow shell commands to be run from Gulp
var browserSync = require('browser-sync').create(); // Reload browser
var responsive = require('gulp-responsive'); // Create responsive images
var pngquant = require('gulp-pngquant'); // for logo compression

// Plugin options

// Options for sass
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'nested'
};


// The tasks ....

// Process scss files and push to css
gulp.task('sass', function(){
  return gulp.src('_build/scss/**/*.scss')
    .pipe(sass(sassOptions)) // Using gulp-sass
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    //.pipe(cssnano())
    .pipe(gulp.dest('css'));
});

// Task for reloading after change in scss files:
gulp.task('watch', function(){
  gulp.watch('_build/scss/**/*.scss', ['sass']);
  // Other watchers
})


// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll build --watch']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});


// Task for creating responsive images for articles
gulp.task('article-images', function () {
  return gulp.src('_build/images/articles/*.{png,jpg}')
    .pipe(responsive({

      // Resize all post images and ensure jpeg format
      '*': [{
        width: 425,
        quality: 80,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-small' },
      }, {
        width: 520,
        quality: 70,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-med' },
      }, {
        width: 768,
        quality: 70,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-large' },
      }, {
        width: 90,
        height: 90,
        quality: 90,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-thumbnail' },
      }],
    }))
    .pipe(gulp.dest('images/articles'));
});

// Task for creating logos and badges
gulp.task('logo-images', function () {
  return gulp.src('_build/images/logos/*.{png,jpg}')
    .pipe(responsive({

      // Resize all badge images and compress
      '*': [{
        width: 90,
        format: 'png',
        compressionLevel: 9,
        errorOnEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
      }],
    }))
    .pipe(pngquant({
            quality: '65-85'
        }))
    .pipe(gulp.dest('images/logos'));
});

// Task for creating responsive images for people
gulp.task('people-images', function () {
  return gulp.src('_build/images/people/*.{png,jpg}')
    .pipe(responsive({

      // Resize all post images and ensure jpeg format
      '*': [{
        width: 425,
        quality: 80,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-small' },
      }, {
        width: 520,
        quality: 70,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-med' },
      }, {
        width: 768,
        quality: 70,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-large' },
      }, {
        width: 90,
        height: 90,
        quality: 90,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-thumbnail' },
      }],
    }))
    .pipe(gulp.dest('images/people'));
});

// Task for creating responsive images for merchandise
gulp.task('merchandise-images', function () {
  return gulp.src('_build/images/merchandise/*.{png,jpg}')
    .pipe(responsive({

      // Resize all post images and ensure jpeg format
      '*': [{
        width: 425,
        quality: 80,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-small' },
      }, {
        width: 520,
        quality: 70,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-med' },
      }, {
        width: 768,
        quality: 70,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-large' },
      }, {
        width: 90,
        height: 90,
        quality: 90,
        progressive: true,
        withoutEnlargement: false,
        errorOnUnusedConfig: false,
        withMetadata: false,
        rename: { suffix: '-thumbnail' },
      }],
    }))
    .pipe(gulp.dest('images/merchandise'));
});


gulp.task('default', ['watch','article-images','logo-images','people-images','merchandise-images','build','serve']);
