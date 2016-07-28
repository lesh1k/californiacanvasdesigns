var gulp = require('gulp');
var pug = require('gulp-pug');
var changed = require('gulp-changed');

var paths = {
    pug_templates: ['templates/**/*.pug'],
    scripts: ['assets/js/**/*.js'],
    images: ['assets/images/**/*'],
    css: ['assets/css/**/*.css'],
    node_modules: ['node_modules/purecss/**/*', 'node_modules/jquery/**/*', 'node_modules/icono/**/*'],
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
    gulp.src(assets_paths, {base: 'assets'})
        .pipe(changed(assets_paths + '/assets'))
        .pipe(gulp.dest(paths.destination + '/assets'));

    gulp.src(paths.node_modules, {base: 'node_modules'})
        .pipe(changed(paths.destination + '/assets/libs'))
        .pipe(gulp.dest(paths.destination + '/assets/libs'))
        .pipe(changed('assets/libs'))
        .pipe(gulp.dest('assets/libs'));
});

gulp.task('watch', function() {
    gulp.watch(paths.pug_templates, ['compile-templates']);
    gulp.watch(assets_paths, ['copy-to-destination']);
});
