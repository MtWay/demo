module.exports = function (gulp, config, $, args) {
    // config -- config.js
    // $ -- plugins
    // args --- yargs
    //clean目录 /dist/(pc||web),/resourece/(pc||web)
    gulp.task('clean:views', function () {
        $.util.log($.util.colors.green('清空 "' + config.ftl + '" 和 "' + config.static + '"  目录'));
        return $.del([config.ftl, config.static, config.rev, '!' + config.resoureceJs]);
    });
    //clean目录 /resourece/(pc||web)下的js
    gulp.task('clean:webpack', function () {
        $.util.log($.util.colors.green('清空 "' + config.static + '" 下的js'));
        return $.del(config.resoureceJs);
    });
};