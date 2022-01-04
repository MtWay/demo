
var fs = require("fs");
const opt = {
    inputPath: 'screenSys',//文件输入目录
    scale: 0.31875, //
    replaceStart: ' ', //以" "开头
    replaceEnd: 'px', // 以px结尾进行切割
    joinEnd: 'rem', // 以rem结尾进行拼接
    outDir: 'out',//输出目录

}

// console.log(data);
function replaceDw(path) {
    var data = fs.readFileSync(path, "utf-8");
    let arr = data.split(opt.replaceEnd);
    let scale = opt.scale;
    let outs = arr.map((n, i) => {
        let t = n.split(opt.replaceStart);
        let st = t[t.length - 1];
        if (i < arr.length - 1 && !isNaN(st))
            t[t.length - 1] = (st * scale).toFixed(2);
        return t.join(opt.replaceStart)
    })
    let str = outs.join(opt.joinEnd);
    let outPath = path.replace(opt.inputPath, opt.outDir);
    console.log(outPath)
    fs.writeFileSync(outPath, str)
    // fs.writeFileSync(path,str)
}

var path = require("path"); //解析需要遍历的文件夹
var filePath = path.resolve(opt.inputPath);
//调用文件遍历方法
fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err);
        } else {
            //遍历读取到的文件列表
            files.forEach(function (filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn("获取文件stats失败");
                    } else {
                        var isFile = stats.isFile(); //是文件
                        var isDir = stats.isDirectory(); //是文件夹
                        if (isFile) {
                            //   console.log(filedir); // 读取文件内容
                            //   var content = fs.readFileSync(filedir, "utf-8");
                            //   console.log(content);
                            mkdirPath(filePath.replace(opt.inputPath, opt.outDir))
                            replaceDw(filePath + "\\" + filename)
                            //   console.log(filePath,filename);
                        } else if (isDir) {
                            console.log(filePath)
                            
                            fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                });
            });
        }
    });
}


/**
 * 判读路径是否存在,如不存在创建文件夹
 * @param pathStr 参数要用path.join()拼接,项目下的相对路径
 * @return projectPath 返回绝对路径,可要可不要
 */
function mkdirPath(pathStr) {
    // console.log(pathStr, fs.existsSync(pathStr))
    // if (!fs.existsSync(pathStr)) {
    //     fs.mkdirSync(pathStr);
    // }
    //     return;
    var projectPath = path.join(process.cwd());
        // console.log(projectPath,86)
        var tempDirArray = pathStr.split(projectPath)[1].split('\\');
    for (var i = 0; i < tempDirArray.length; i++) {
        projectPath = projectPath + '/' + tempDirArray[i];
        // console.log(projectPath)
        if (fs.existsSync(projectPath)) {
            var tempstats = fs.statSync(projectPath);
            if (!(tempstats.isDirectory())) {
                fs.unlinkSync(projectPath);
                fs.mkdirSync(projectPath);
            }
        }
        else {
            fs.mkdirSync(projectPath);
        }
    }
    return projectPath;

}
