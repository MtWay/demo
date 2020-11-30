module.exports = function (gulp, config, $, args) {
    // config -- config.js
    // $ -- plugins
    // args --- yargs
    //clean目录 /dist/(pc||web),/resourece/(pc||web)
    gulp.task('showhelp', function () {
        process.stdout.write(`
            gulp dev -dev [-p pc 目录] [-m mobile 目录] 
            gulp build  [-p pc 目录] [-m mobile 目录] -production
            gulp server  本地server 端口3000 监听 js,css,img,html文件变化 自动刷新 
            gulp sprite  [-p pc 目录] [-m mobile 目录]
    `);
    });
};