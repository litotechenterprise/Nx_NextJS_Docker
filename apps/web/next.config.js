// // eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require('path');
const { withNativebase } = require('@native-base/next-adapter');
// /**
//  * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
//  **/
const nextConfig = {
  transpilePackages: [
    'native-base',
    '@native-base/next-adapter',
    'react-native-safe-area-context',
    '@react-native-aria/slider',
    'react-native-svg',
    '@react-native-aria',
    // '@react-native-aria/checkbox',
    // '@react-native-aria/radio',
    // '@react-native-aria/utils',
    // '@react-native-aria/overlays'
  ],
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      loader: 'url-loader', // or directly file-loader
      include: path.resolve(__dirname, 'node_modules/@native-base/icons'),
    });
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    return config;
  },
};

//   // Add more Next.js plugins to this list if needed.
const plugins = [withNx];

const createConfig = composePlugins(...plugins)(nextConfig);

module.exports = async (phase, context) => {
  const baseConfig = await createConfig(phase, context);
  const configWithNativeBase = await withNativebase({
    nextConfig: baseConfig,
  })(phase, context);
  return configWithNativeBase;
};
