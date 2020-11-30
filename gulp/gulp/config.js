module.exports = function (path, argv) {
    let menu = 'pc';
    let env = 'dev';
    if (argv.p) {
        menu = 'pc';
    } else if (argv.m) { 
        menu = 'mobile';
    }
    if (argv.dev && false) {
        env = 'dev';
    } else { 
        env = 'production';
    }
    console.log(__dirname)

    let src = path.resolve(__dirname,'../web/src/', menu);//g:\gulp57\web\src\pc
    let ftl = path.resolve(__dirname,'../web/dist/ftl', menu);
    let static = path.resolve(__dirname,'../web/dist/static', menu);
    let mobileftl = path.resolve(__dirname,'../web');//g:\gulp57\web

    console.log(ftl)

    let component = path.resolve(__dirname,'../web/src/', menu, 'component');//g:\gulp57\web\src\pc\component
    let rev = path.resolve(__dirname,'../web/src/', menu, 'rev');
    let views = path.resolve(__dirname,'../src/', menu, 'views');//g:\gulp57\src\pc\views

    let resoureceJs = path.resolve(__dirname, static, '**/*.js');

    let ftlPath= path.resolve('src/mobile/', '**/*.ftl');//g:\gulp57\src\mobile\**\*.ftl
    console.log('ftlPath:'+ftlPath)

    let imagePath = path.resolve(__dirname,views, '**/*.*(png|jpg|gif)');
    let spriteChildPath = path.resolve(__dirname,views, '/**/images/sprite/*.png');
    let htmlPath = path.resolve(__dirname,views, '**/*.html');
    let cssLessPath = path.resolve(__dirname,views, '**/*.*(less|css)');
    let jsPath = path.resolve(__dirname,views, '**/*.js');
    let spriteCssPath = path.resolve(__dirname,views, '/**/sprite.*(less|css)');

    let revJsonPath = path.resolve(__dirname,rev, '**/*.json');
    let distHtmlPath = path.resolve(__dirname, ftl, '**/*.html');
    let mobileHtmlPath = path.resolve(__dirname, ftl, '**/*.ftl');
    let entryRegExp = new RegExp('/web/src/' + menu + '/views/(.*/*).js');

    let handleErrors = require('./util/handleErrors');

    //目前需要的变量
    let distFtl = path.resolve(__dirname,'../web/ftl'); //g:\gulp57\web\ftl 输出ftl
    let mobileFtlPath = path.resolve(__dirname, '../src/mobile/', '**/*.ftl');  //移动端ftl入口
    let pcFtlPath = path.resolve(__dirname, '../src/pc/', '**/*.ftl');  //pc ftl入口
    
    let js1= path.resolve(__dirname, '../src/new/', '**/*.js') //g:\gulp57\src\new\**\*.js
    let ph1 = path.resolve(__dirname, '../web/static/') //g:\gulp57\web\static
    let newsrc = path.resolve(__dirname,'../src/', 'new'); //"g:\gulp57\web\src\new"
    let newcssLessPath = path.resolve(__dirname,'../src/', '**/*.*(less|css)');
    // let newstatic = path.resolve(__dirname,'../web/dist/static', menu);

    //20180716

    //用来把就近的css js copy到公共（中转）目录下
    let csscopysrc = path.resolve(__dirname,'../web/ftl/', '**/*.*(less|css|js)'); 
    let csscopydest = path.resolve(__dirname,'../web/static/');

    //获取所有的css，js
    let lesssrc = path.resolve(__dirname,'../web/static/', '**/*.*(less|css)');
    let jssrc = path.resolve(__dirname,'../web/static/', '**/*.js');

    //替换文件的json目录
    let manifestPath = path.resolve(__dirname,'../web/manifest');

    //ftl路径
    let lastftlPath=path.resolve(__dirname,'../web/ftl','**/*.ftl');

    //最终输出ftl目录
    let ftldest = path.resolve(__dirname,'../dist/ftl');
    let resourecedest = path.resolve(__dirname,'../dist/static')


    //上面添加的变量，也要加到config里面
    let config = {
        lastftlPath,
        manifestPath,
        resourecedest,
        ftldest,
        jssrc,
        lesssrc,
        env,
        menu,
        src,
        ftl,
        rev,
        static,
        views,
        component,
        imagePath,
        jsPath,
        spriteChildPath,
        htmlPath,
        resoureceJs,
        cssLessPath,
        spriteCssPath,
        revJsonPath,
        distHtmlPath,
        entryRegExp,
        handleErrors,
        mobileftl,
        ftlPath,
        distFtl,
        mobileFtlPath,
        pcFtlPath,
        js1,
        ph1,
        newsrc,
        newcssLessPath,
        csscopysrc,
        csscopydest
    };
    return config;
};