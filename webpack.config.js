module.exports = {
	entry: "./public/jsx/main.jsx",
    output: {
        path: "./.build/js",
        filename: "main.js"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: "jsx-loader" }
        ]
    }
}