
console.log(`--> Running in ${process.env.NODE_ENV} mode`);

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  async headers() {
    return [
      {
        source: '/js-build/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
      {
        source: '/cors/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  reactStrictMode: false,
  // env: {
  //   CONFIG_SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  //   CONFIG_SHOPIFY_APP_URL: process.env.SHOPIFY_APP_URL,
  // },
  // experimental: {
  //   images: {
  //     unoptimized: true
  //   }
  // },
  // image: {
  //   // unoptimized: true,
  //   loader: 'file-loader'
  // },
  webpack: (config, { isServer }) => {

    // let found = config.module.rules.filter(ru => {
    //   if (ru.use.some(u => u.includes('post'))) {
    //     return true
    //   }
    //   return false
    // })

    // console.log(found)

    // config.module.rules.push({
    //   test: /\.css$/i,
    //   use: ["style-loader", "css-loader", "postcss-loader"],
    // })

    // console.log(config.module.rules)

    config.module.rules = config.module.rules.filter((rule) => {
      return rule.loader !== 'next-image-loader'
    })

    // config.module.rules.push({
    //   test: /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i,
    //   exclude: /node_modules/,
    //   use: [
    //     {
    //       //${config.assetPrefix}
    //       loader: 'file-loader',
    //       options: {
    //         limit: 0, /// config.inlineImageLimit,
    //         fallback: 'file-loader',
    //         publicPath: `/_next/static/images/`,
    //         outputPath: `${isServer ? '../' : ''}static/images/`,
    //         name: '[name]-[hash].[ext]',
    //         esModule: config.esModule || false,
    //       },
    //     },
    //   ],
    // })

    config.module.rules.push({
      test: /\.(glb|gltf|hdr|exr|fbx|ttf|png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/,
      exclude: /node_modules/,
      use: [
        {
          //${config.assetPrefix}
          loader: 'file-loader',
          options: {
            limit: 0, /// config.inlineImageLimit,
            fallback: 'file-loader',
            publicPath: `/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    })

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    })

    return config
  }
};

module.exports = nextConfig;
