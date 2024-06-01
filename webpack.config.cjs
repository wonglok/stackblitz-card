const TerserPlugin = require("terser-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const path = require("path");
const webpack = require("webpack");

const configWebpack = {
    entry: {
        ui: "./components/entry/UI.jsx",
    },
    output: {
        clean: true,
        library: {
            // do not specify a `name` here
            type: 'module',
        },
        path: path.resolve(__dirname, "./public/js-build"),
        filename: "build.[name].[hash].js",
    },
    experiments: {
        outputModule: true,
    },
    resolve: {
        alias: {
            ['@']: path.resolve(__dirname, './'),
            ['components']: path.resolve(__dirname, './components'),
        },
        extensions: ['.js', '.jsx', '.mjs'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                loader: "file-loader",
            }
        ],
    },
    plugins: [
        new WebpackManifestPlugin(),
    ],
    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             extractComments: false,
    //         }),
    //     ],
    // },
    watchOptions: {
        ignored: /(node_modules|extensions|js-build)/,
    },
};

configWebpack.module.rules.push({
    test: /\.(glb|gltf|hdr|exr|fbx)$/,
    // exclude: config.exclude,
    use: [
        {
            //${config.assetPrefix}
            loader: 'file-loader',
            options: {
                // limit: Infinity,//,config.inlineImageLimit,
            },
        },
    ],
})

// shader support
configWebpack.module.rules.push({
    test: /\.(glsl|vs|fs|vert|frag)$/,
    exclude: /node_modules/,
    use: ['raw-loader', 'glslify-loader'],
})

module.exports = configWebpack;