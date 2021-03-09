module.exports = {
  env: {
    API_KEY: process.env.FIREBASE_API_KEY
  },
  webpack(config) {
    config.module.rules.push({ // 웹팩설정에 로더 추가함
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};