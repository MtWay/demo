const argv = require('yargs').argv;
const path = require('path');
const config = require('./config.js')(path, argv);
const glob = require('glob');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
let getEntry = (env) => {
    // let entryFiles = glob.sync(config.jsPath);
    
    let entryFiles = glob.sync(config.js1);
    let newEntry = {
        'common': './web/src/libs/jquery/jquery.js'
    };
    Object.keys(entryFiles).map((index) => {
        let entry = entryFiles[index];
        let match = entry.match(config.entryRegExp);
        let pageName = match && match[1];
        newEntry[pageName] =  entry;
    });
    return newEntry;
};
let getOutput = (env) => {
    return {
        filename: env === 'production' ? '[name]-[chunkhash:8].js' : '[name].js',
        path:config.ph1,
    }
};
let getPlugins = (env) => {
    let plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        })
    ];
    if (env === 'production') {
        plugins.push(
            new WebpackMd5Hash()
        )
        plugins.push(new ManifestPlugin({
            fileName: path.resolve(__dirname, config.rev, 'js/js-manifest.json')
        })); 
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                parallel: true,
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false,
                compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    warnings: false,
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            })
        )
    }
    return plugins;
};
// 别名配置
let getAlias = (env) => {
    return {
        // 特殊
        'jquery': path.resolve(__dirname, './web/src/libs/jquery/jquery.js'),
        '$': path.resolve(__dirname, './web/src/libs/jquery/jquery.js'),
    };
};
// loaders配置
let getLoaders = function (env) {
    // return {
    //     rules: [{
    //         test: /\.js$/,
    //         loader: 'babel-loader'
    //     }]
    // }
};
module.exports = (env) => {
    return {
        entry: getEntry(env),
        output: getOutput(env),
        devtool: env !== 'production' && 'source-map',
        //watch: env !== 'production',
        // profile: true,
        // cache: true,
        resolve: {
            alias: getAlias(env)
        },
        module: getLoaders(env),
        plugins: getPlugins(env)
    }
};

