//copy
module.exports = function (gulp, config, $, args) { 
    // config -- config.js
    // $ -- plugins
    // args --- yargs
    
    gulp.task('html2copy', function () {
        return gulp.src(config.htmlPath)
            .pipe($.plumber(config.handleErrors)) 
            .pipe($.newer(config.ftl))    
            .pipe(gulp.dest(config.ftl))
    });

    //移动端ftl输出
    gulp.task('ftl2copy', function () {
        // return gulp.src('door/*.js')
        return gulp.src(config.mobileFtlPath)
            .pipe($.plumber(config.handleErrors)) //报错
            .pipe($.newer(config.distFtl))    //更新
            .pipe(gulp.dest(config.distFtl))//输出
    });

        //pc ftl输出
    gulp.task('pcftlcopy', function () {
            // return gulp.src('door/*.js')
            return gulp.src(config.pcFtlPath)
            .pipe($.plumber(config.handleErrors)) //报错
            .pipe($.newer(config.distFtl))    //更新
            .pipe(gulp.dest(config.distFtl))//输出
    });

    gulp.task('img2copy', function () {
        return gulp.src([config.imagePath, '!' + config.spriteChildPath])
            .pipe($.plumber(config.handleErrors))     
            .pipe($.newer(config.ftl))    
            .pipe($.gulpif(config.env === 'dev',$.imagemin()))
            .pipe(gulp.dest(config.static))
    });
    //css js copy到公共目录
    gulp.task('csscopy', function () {
        return gulp.src(config.csscopysrc)
        .pipe($.plumber(config.handleErrors)) //报错
        .pipe($.newer(config.csscopydest))    //更新
        .pipe(gulp.dest(config.csscopydest))//输出
    });
}
 
