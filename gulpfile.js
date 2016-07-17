var gulp = require('gulp');
var pug = require('gulp-pug');
var changed = require('gulp-changed');

var paths = {
    pug_templates: ['templates/**/*.pug'],
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
        .pipe(changed(paths.destination))
        .pipe(pug())
        .pipe(gulp.dest(paths.destination));
});

gulp.task('copy-to-destination', function() {
    gulp.src(paths.scripts)
        .pipe(changed(paths.destination + '/assets/js'))
        .pipe(gulp.dest(paths.destination + '/assets/js'));
    gulp.src(paths.images)
        .pipe(changed(paths.destination + '/assets/images'))
        .pipe(gulp.dest(paths.destination + '/assets/images'));
    gulp.src(paths.css)
        .pipe(changed(paths.destination + '/assets/css'))
        .pipe(gulp.dest(paths.destination + '/assets/css'));
});

gulp.task('watch', function() {
    gulp.watch(paths.pug_templates, ['compile-templates']);
    gulp.watch(assets_paths, ['copy-to-destination']);
});
