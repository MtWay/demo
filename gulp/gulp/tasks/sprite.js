module.exports = function (gulp, config, $, args) {
    // config -- config.js
    // $ -- plugins
    // args --- yargs
    //clean目录 /dist/(pc||web),/resourece/(pc||web)
    let spriteFiles = $.glob.sync($.path.join(config.newsrc, '/**/images/sprite'))
    gulp.task('sprite', function () {
        // console.log(111)
        // console.log(spriteFiles)
        let tasks = Object.keys(spriteFiles).map((index) => {
            let spriteData = gulp.src($.path.join(spriteFiles[index], '*.*(png|jpg)'))
                .pipe($.plumber(config.handleErrors))     
                .pipe($.spritesmith({
                    imgName: 'sprite.png',  //保存合并后图片的地址
                    cssName: 'sprite.less',   //保存合并后对于css样式的地址
                    padding: 20,
                    algorithm: 'binary-tree',
                    cssTemplate: (data) => {
                        // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
                        let arr = [],
                            width = data.spritesheet.px.width,
                            height = data.spritesheet.px.height,
                            url = $.path.join('./images', data.spritesheet.image);
                        data.sprites.forEach(function (sprite) {
                            arr.push(
                                ".icon-" + sprite.name + "{" +
                                "background: url('" + url + "') no-repeat " + sprite.px.offset_x + " " + sprite.px.offset_y + ";" +
                                "background-size: " + width + " " + height + ";" +
                                "width: " + sprite.px.width + ";" +
                                "height: " + sprite.px.height + ";" +
                                "}\n"
                            )
                        });
                        // return "@fs:108rem;\n"+arr.join("")
                        //console.log(arr.join(""));
                        return arr.join("")
                    }
                }));
            let imgStream = spriteData.img
                .pipe($.plumber(config.handleErrors))     
                // DEV: We must buffer our stream into a Buffer for `imagemin`
                .pipe(gulp.dest($.path.join(spriteFiles[index], '../../', '/images')));//输出精灵图
                console.log($.path.join(spriteFiles[index], '../../', '/images'))
            // Pipe CSS stream through CSS optimizer and onto disk
            let cssStream = spriteData.css
                .pipe($.plumber(config.handleErrors))     
                .pipe(gulp.dest($.path.join(spriteFiles[index], '../../')));//输出css
            // console.log(cssStream)

            // Return a $.merged stream to handle both `end` events
            return $.merge(imgStream, cssStream); //合并流
        });
        return $.merge(tasks);
    });
}