module.exports = function (gulp, config, $, args) {
    // config -- config.js
    // $ -- plugins
    // args --- yargs
    gulp.task('webpack', ['clean:webpack'], function () {
        // webpack作为一个普通的node模块使用
        return $.webpack($.webpackConfigFun(config.env), function (err, stats) {
            err && console.log('错误：' + err + '------stats：' + stats);
        });
    });
}
