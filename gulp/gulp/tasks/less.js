
module.exports = function (gulp, config, $, args) {
    // config -- config.js
    // $ -- plugins
    // args --- yargs
    let aa = $.glob.sync(config.newcssLessPath);

    let revCssPath = $.path.join(config.ph1, 'css');
    console.log(11112);
    console.log(config.env)
    let cssFiles = $.glob.sync($.path.join(config.newsrc, '/**/'))
    console.log("华丽丽")
    console.log(config.newsrc)
    console.log(cssFiles);
    
    gulp.task('myless', function () {
        // console.log(111)
        // console.log(spriteFiles)
        let tasks = Object.keys(cssFiles).map((index) => {
            var outpath = revCssPath+($.path.resolve(cssFiles[index]).replace(config.newsrc,''));
            console.log(outpath);
            return gulp.src($.path.join(cssFiles[index], '*.*(css|less)'))
            .pipe($.less())
            .pipe($.postcss([$.autoprefixer({browsers: ['last 2 versions'], cascade: false})]))
            // .pipe($.base64({
            //     baseDir: '',
            //     extensions: ['svg', 'png', /\.jpg#datauri$/i],
            //     exclude: ['sprite.png'],
            //     maxImageSize: 20 * 1024, // bytes
            //     debug: true
            // }))
            // .pipe($.concat(foldername+'.css'))   //合并
            .pipe($.gulpif(config.env !== 'dev', $.cssmin())) //压缩
            .pipe($.gulpif(config.env !== 'dev', $.rev())) //版本号
            .pipe(gulp.dest(outpath))//css目录
            .pipe($.gulpif(config.env !== 'dev',$.rev.manifest({ pwd_base: '${staticServer}/' }))) //替换文件json
            .pipe($.gulpif(config.env !== 'dev', gulp.dest(cssFiles[index])))//替换文件json位置
              
        });
        return $.merge(tasks);
    });


var  k  ='${staticServer}/web/dist/static/'; //添加头

    gulp.task('less', function (cb) {
        // return gulp.src([config.cssLessPath, '!' + config.spriteCssPath])
        return gulp.src(config.lesssrc)
        .on('data',function(file){
            console.log(file.history[0]) 
        })
            //.pipe($.plumber(config.handleErrors))     
            //.pipe($.newer(config.static))    
            .pipe($.plumber())    
            .pipe($.less())
            .pipe($.postcss([$.autoprefixer({browsers: ['last 2 versions'], cascade: false})]))//加前缀
            // .pipe($.base64({
            //     baseDir: '',
            //     extensions: ['svg', 'png', /\.jpg#datauri$/i],
            //     exclude: ['sprite.png'],
            //     maxImageSize: 20 * 1024, // bytes
            //     debug: true
            // }))
            // .pipe($.concat('a.css'))   //合并
            .pipe($.gulpif(config.env !== 'dev', $.cssmin({compatibility: 'ie7'}))) //压缩
            .pipe($.gulpif(config.env !== 'dev', $.rev())) //版本号
            .pipe(gulp.dest(config.resourecedest))//css目录
            .pipe($.gulpif(config.env !== 'dev',$.rev.manifest({ pwd_base: k }))) //替换文件json
            .pipe($.gulpif(config.env !== 'dev', gulp.dest(config.manifestPath+'/css')))//替换文件json位置 
    });

    gulp.task('revs', function() {
        console.log(config.lastftlPath)
        console.log(config.ftldest)
        // gulp.src([config.manifestPath+'/**/rev-manifest.json', $.path.join(config.newsrc, '**/*.html')])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        return gulp.src([config.manifestPath+'/**/rev-manifest.json', config.lastftlPath])   //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
            .on('data',function(file){
            console.log(file.history[0]) 
                })
            .pipe($.revCollector())                                   //- 执行文件内css名的替换
            // .pipe(gulp.dest('./application/'));                     //- 替换后的文件输出的目录
            .pipe(gulp.dest(config.ftldest));                     //- 替换后的文件输出的目录
    });
}