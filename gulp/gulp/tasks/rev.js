
module.exports = function (gulp, config, $, args) {
    // config -- config.js
    // $ -- plugins
    // args --- yargs
    //clean目录 /dist/(pc||web),/resourece/(pc||web)
    gulp.task('rev', function () {
        return gulp.src([config.revJsonPath, config.ftlHtmlPath])     
            .pipe($.plumber(config.handleErrors))     
            .pipe($.revCollector())
            .pipe(gulp.dest(config.ftl))
    });
}