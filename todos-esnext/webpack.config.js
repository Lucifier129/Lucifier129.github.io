var webpack = require('webpack')
var path = require('path')

module.exports = {
    cache: false,
    watch: true,
    entry: 'app',
    output: {
        path: path.join(__dirname, 'dest'),
        filename: '[name].js',
        publicPath: '/js/dest/',
        chunkFilename: '[name].js',
        jsonpFunction: '__'
    },
    externals: {
        Handlebars: true
    },
    module: {
        loaders: [{
            test: /\.js|\.tag$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                stage: 0,
                optional: ['runtime']
            }
        }]
    },
    plugins: [

        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
    ],
    resolve: {
        extensions: ["", ".js", ".jsx", '.es6', '.json'],
        root: path.join(__dirname, 'src'),
        modulesDirectories: ["node_modules"],
        alias: {
            helper: 'helper',
            component: 'component'
        }
    }
}
