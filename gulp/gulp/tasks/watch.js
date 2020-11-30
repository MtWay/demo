module.exports = function (gulp, config, $, args) { 
    // config -- config.js
    // $ -- plugins
    // args --- yargs
    let watchReload = (event) => {
        $.util.log($.util.colors.yellow(`File ${event.path}  was  ${event.type} , running tasks...`));
        $.browserSync.reload();
    };
    let watchTask = () => {
        gulp.watch(config.spriteChildPath, ['sprite']).on('change', watchReload);
        gulp.watch([config.imagePath, '!' + config.spriteChildPath], ['img2copy']).on('change', watchReload);
        gulp.watch([config.cssLessPath, '!' + config.spriteCssPath], ['less']).on('change', watchReload);
        gulp.watch(config.jsPath, ['webpack']).on('change', watchReload);
        gulp.watch(config.htmlPath, ['html2copy']).on('change', watchReload);
        $.util.log($.util.colors.green('已监听html, style, css,images文件改动'));
    }
    gulp.task('watch', watchTask);

    gulp.task('serve', ['dev'], function () {
        $.browserSync.init({
            server: {
                baseDir: [config.static, config.ftl]
            }
        });
        watchTask();
    });
}
