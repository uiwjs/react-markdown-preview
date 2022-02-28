import path from 'path';
import webpack from 'webpack';
import { LoaderConfOptions, WebpackConfiguration } from 'kkt';
import lessModules from '@kkt/less-modules';
import rawModules from '@kkt/raw-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';
import pkg from './package.json';

export default (conf: WebpackConfiguration, env: 'production' | 'development', options: LoaderConfOptions) => {
  conf = lessModules(conf, env, options);
  if (options.bundle) {
    conf.output!.library = '@uiw/react-markdown-preview';
    conf.externals = {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    };
  } else {
    conf = rawModules(conf, env, { ...options });
    conf = scopePluginOptions(conf, env, {
      ...options,
      allowedFiles: [path.resolve(process.cwd(), 'README.md')],
    });
    // Get the project version.
    conf.plugins!.push(
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(pkg.version),
      }),
    );
    if (env === 'production') {
      conf.output = { ...conf.output, publicPath: './' };
      conf.optimization = {
        ...conf.optimization,
        splitChunks: {
          cacheGroups: {
            reactvendor: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react-vendor',
              chunks: 'all',
            },
            prismjs: {
              test: /[\\/]node_modules[\\/](refractor)[\\/]/,
              name: 'refractor-vendor',
              chunks: 'all',
            },
          },
        },
      };
    }
  }

  return conf;
};
