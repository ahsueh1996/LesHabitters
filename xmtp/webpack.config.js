
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    // plugins: [
    //     // Work around for Buffer is undefined:
    //     // https://github.com/webpack/changelog-v5/issues/10
    //     new webpack.ProvidePlugin({
    //         Buffer: ['buffer', 'Buffer'],
    //     }),
    // ],
    // resolve: {
    //     extensions: [ '.ts', '.js' ],
    //     fallback: {
    //         "buffer": require.resolve("buffer")
    //     }
    // },
};