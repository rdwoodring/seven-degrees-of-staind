process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const path = require('path');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const config = require('react-scripts/config/webpack.config.js');

// removes react-dev-utils/webpackHotDevClient.js at first in the array
const initialConfig = config('development'),
    entry = initialConfig.entry.filter((fileName) => {
        return !fileName.match(/webpackHotDevClient/);
    }),
    plugins = initialConfig.plugins.filter((plugin) => {
        return !(plugin instanceof webpack.HotModuleReplacementPlugin);
    }),
    builtConfig = {
        ...initialConfig,
        entry: entry,
        plugins: plugins
    },
    buildDir = path.join(__dirname, '../dist'),
    outputDir = path.join(__dirname, '../../public');

webpack(builtConfig).watch({}, (err, stats) => {
    if (err) {
        console.error(err);
    } else {
        copyPublicFolder();
    }
    // console.error(stats.toString({
    //     chunks: false,
    //     colors: true
    // }));
    console.log(stats.toString('minimal'));
});

console.log(path.join(__dirname, '../dist'));

function copyPublicFolder() {
    fs.copySync(buildDir, outputDir, {
        overwrite: true
    });
    // fs.copySync(paths.appPublic, paths.appBuild, {
    //     dereference: true,
    //     // recursive: true
    //     // filter: file => file === paths.appHtml
    // });

    // // fs.copySync(path.join(paths.appPublic, 'static'), path.join(outputDir, 'static'), {
    // //     dereference: true
    // // });
}