module.exports = {
	entry: "./public/jsx/main.jsx",
    output: {
        path: "./.build/js",
        filename: "main.js"
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [
            { test: /\.jsx$/,   loader: "babel" },
            { test: /\.less$/,  loader: "style!css!less"}
        ]
    }
}
