const { VueLoaderPlugin } = require("vue-loader");


module.exports = {
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public/js',
        filename: 'bundle.js'
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                  {
                    loader: 'vue-style-loader'
                  },
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      localIdentName: '[local]_[hash:base64:8]'
                    }
                  }
                ]
              }
        ]
    },
    // plugins: [
    //     new VueLoaderPlugin()
    // ]
};

