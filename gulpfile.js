var gulp = require('gulp');
var pug = require('gulp-pug');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var concatCSS = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');

var paths = {
    pug_templates: ['templates/**/*.pug'],
    scripts: ['assets/js/**/*.js'],
    images: ['assets/images/**/*'],
    css: ['assets/css/**/*.css'],
    node_modules: [
        'node_modules/purecss/**/*',
        'node_modules/jquery/**/*',
        'node_modules/icono/**/*',
        'node_modules/ideal-image-slider/**/*'
    ],
    destination: 'dist'
};
var assets_paths = paths.scripts.concat(paths.images, paths.css);

gulp.task('defaut', function() {

});

gulp.task('compile-templates', function buildHTML() {
    return gulp.src(paths.pug_templates)
        .pipe(changed(paths.destination))
        .pipe(pug())
        .pipe(gulp.dest(paths.destination));
});

gulp.task('copy-to-destination', function() {
    gulp.src(assets_paths, {
            base: 'assets'
        })
        .pipe(changed(assets_paths + '/assets'))
        .pipe(gulp.dest(paths.destination + '/assets'));

    gulp.src(paths.node_modules, {
            base: 'node_modules'
        })
        .pipe(changed(paths.destination + '/assets/libs'))
        .pipe(gulp.dest(paths.destination + '/assets/libs'))
        .pipe(changed('assets/libs'))
        .pipe(gulp.dest('assets/libs'));
});

gulp.task('compress-js', function() {
    gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.destination + '/assets/bundles'));
});

gulp.task('compress-images', function() {
    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.destination + '/assets/images'));
});

gulp.task('compress-css', function() {
    gulp.src(paths.css)
        .pipe(sourcemaps.init())
        .pipe(concatCSS('bundle.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.destination + '/assets/bundles'));
});

gulp.task('compress-html', function() {
    gulp.src('dist/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('dist'));
});

gulp.task('compress-assets', ['compress-js', 'compress-css', 'compress-images']);

gulp.task('watch', function() {
    gulp.watch(paths.pug_templates, ['compile-templates']);
    // gulp.watch(assets_paths, ['copy-to-destination']);
});
