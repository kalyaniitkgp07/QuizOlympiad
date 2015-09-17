module.exports = {
	entry: "./public/jsx/helloworld.jsx",
    output: {
        path: "./.build/js",
        filename: "master.js"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: "jsx-loader" }
        ]
    }
}