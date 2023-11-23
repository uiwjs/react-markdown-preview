import path from 'path';
import webpack from 'webpack';
import { LoaderConfOptions, WebpackConfiguration } from 'kkt';
import lessModules from '@kkt/less-modules';
import scopePluginOptions from '@kkt/scope-plugin-options';
import pkg from '@uiw/react-markdown-preview/package.json';
import { mdCodeModulesLoader } from 'markdown-react-code-preview-loader';

export default (conf: WebpackConfiguration, env: 'production' | 'development', options: LoaderConfOptions) => {
  conf = lessModules(conf, env, options);
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
  conf.ignoreWarnings = [
    {
      module: /node_modules[\\/]parse5[\\/]/,
    },
  ];
  conf = mdCodeModulesLoader(conf);
  // https://github.com/kktjs/kkt/issues/336#issue-1097660932
  conf.module!.exprContextCritical = false;
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
  return conf;
};
