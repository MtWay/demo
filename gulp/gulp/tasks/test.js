module.exports = function (gulp, config, $, args) { 
//尝试将一个文件夹的单个html生成一个ftl

var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// var scriptsPath = 'src/new';
var scriptsPath = 'web/ftl';

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        // console.log(fs.statSync(path.join(dir, file)).isDirectory())
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('modeFtl', function() {
   var folders = getFolders(scriptsPath);

   loop(folders,scriptsPath);
   function loop(folders,scriptsPath){
    folders.map(function(folder) {
       console.log(folder)

      //遍历下一级目录
        if(folder){
            var scriptsPathNext= scriptsPath+'/'+folder;
            var folders = getFolders(scriptsPathNext);
            loop(folders,scriptsPathNext)
        }
      return gulp.src(path.join(scriptsPath, folder, '/'+folder+'.*(html|ftl)'))
      .on('data',function(file){
        console.log(file.history[0]) 
            })
        // .pipe(concat(folder + '.html'))
        // .pipe(gulp.dest(scriptsPath))
        // .pipe(uglify())
        .pipe(rename(folder + '.ftl'))
        // .pipe(rename(folder + '.min.js'))
        .pipe(gulp.dest(scriptsPath));
   });
}

//    return merge(tasks);
});
gulp.task("ftl",['modeFtl']);

}