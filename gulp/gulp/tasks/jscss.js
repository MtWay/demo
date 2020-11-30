
module.exports = function (gulp, config, $, args) {
    // config -- config.js
    // $ -- plugins
    // args --- yargs
    var scriptsPath = config.newsrc;

    function getFolders(dir) {
        return $.fs.readdirSync(dir)
          .filter(function(file) {
            return $.fs.statSync($.path.join(dir, file)).isDirectory();
          });
    }
    
    gulp.task('jscss', function() {
       var folders = getFolders(scriptsPath);
    
       var tasks = folders.map(function(folder) {
           console.log(folder)
          // 拼接成 foldername.js
          // 写入输出
          // 压缩
          // 重命名为 folder.min.js
          // 再一次写入输出
          var jstask =  gulp.src($.path.join(scriptsPath, folder, '/*.js'))
            .pipe($.concat(folder + '.js'))
            .pipe(gulp.dest(scriptsPath))
            .pipe($.uglify())
            .pipe($.rename(folder + '.min.js'))
            .pipe(gulp.dest(scriptsPath));

            var csstask =  gulp.src($.path.join(scriptsPath, folder, '/*.*(less|css)'))
            .pipe($.concat(folder + '.css'))
            .pipe(gulp.dest(scriptsPath))
            .pipe($.cssmin())
            .pipe($.rename(folder + '.min.css'))
            .pipe(gulp.dest(scriptsPath));

            return $.merge(jstask,csstask);
       });
    
       return $.merge(tasks);
    });

    var  k  ='${staticServer}/web/dist/static/'; //添加头
    
    gulp.task("jsmin",function(){
      return gulp.src(config.jssrc)
      .on('data',function(file){
          console.log(file.history[0]) 
      })
      .pipe($.plumber())    
      .pipe($.uglify())
      .pipe($.rev())//版本号
      .pipe(gulp.dest(config.resourecedest))//js目录
      .pipe($.rev.manifest({ pwd_base: k })) //替换文件json
      .pipe(gulp.dest(config.manifestPath+'/js'))
    })
}