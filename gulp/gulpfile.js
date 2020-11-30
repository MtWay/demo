let gulp = require('gulp');
let args = require('yargs').argv;
let $ = {
    path: require('path'),
    glob: require('glob'),
    merge: require('merge-stream'),
    del: require('del'),

    runSequence: require('run-sequence'),
    gulpif: require('gulp-if'),
    util:require('gulp-util'),
    less: require('gulp-less'),
    spritesmith: require('gulp.spritesmith'),
    newer: require('gulp-newer'),
    plumber:require('gulp-plumber'),
    imagemin: require('gulp-imagemin'),
    base64: require('gulp-base64'),
    cssmin: require('gulp-clean-css'),
    concat:require('gulp-concat'),//- 多个文件合并为一个；
    rev: require('gulp-rev'),//- 对文件名加MD5后缀
    revCollector:require('gulp-rev-collector'),//- 路径替换
    webpack: require('webpack'),
    autoprefixer: require('autoprefixer'),
    postcss: require('gulp-postcss'),
    browserSync: require('browser-sync').create(),
    webpackConfigFun:require('./gulp/webpack.config'),
    fs:require('fs'),
    uglify:require('gulp-uglify'),
    rename:require('gulp-rename')
};
let config = require('./gulp/config')($.path, args);
let taskList = require('fs').readdirSync('./gulp/tasks/');
// let taskList = require('fs').readdirSync('./tasks/');
taskList.forEach(function (file) {
    // console.log(file)
    require('./gulp/tasks/' + file)(gulp, config, $, args);
});
// gulp.task('test',['ftl2copy','pcftlcopy'])

gulp.task('dev', function () {
    $.runSequence('clean:views', ['img2copy', 'html2copy','ftl2copy', 'sprite', 'less', 'webpack'])
});
gulp.task('build', function () {
    $.runSequence('clean:views', ['img2copy', 'html2copy', 'sprite', 'less', 'webpack'], 'rev')
});

gulp.task('part1',['modeFtl','csscopy'])  //第一步将就近维护的css，js导出为放到公共目录,将html转为ftl输出到上一级

gulp.task("part2",['less','jsmin']) //压缩css，js，生成版本号，输出到项目目录（最终目录）

gulp.task('part3',['revs'])//第三步替换版本号

gulp.task("default",function(){
    $.runSequence('part1','part2','part3')
})