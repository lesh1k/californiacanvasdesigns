var gulp = require('gulp');
var pug = require('gulp-pug');

var paths = {
    pug_templates: ['templates/*.pug'],
    scripts: ['assets/js/**/*.js'],
    images: ['assets/images/**/*'],
    css: ['assets/css/**/*.css'],
    destination: 'dist'
};
var assets_paths = paths.scripts.concat(paths.images, paths.css);

gulp.task('defaut', function() {

});

gulp.task('compile-templates', function buildHTML() {
    return gulp.src(paths.pug_templates)
        .pipe(pug())
        .pipe(gulp.dest(paths.destination));
});

gulp.task('copy-to-destination', function() {
    return gulp.src(assets_paths)
        .pipe(gulp.dest(paths.destination + '/assets'));
});

gulp.task('watch', function() {
    gulp.watch(paths.pug_templates, ['compile-templates']);
    gulp.watch(assets_paths, ['copy-to-destination']);
});
