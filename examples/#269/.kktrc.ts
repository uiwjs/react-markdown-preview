import { LoaderConfOptions, WebpackConfiguration } from 'kkt';

export default (conf: WebpackConfiguration, env: 'production' | 'development', options: LoaderConfOptions) => {
  conf.ignoreWarnings = [{ module: /node_modules[\\/]parse5[\\/]/ }];
  // https://github.com/kktjs/kkt/issues/336#issue-1097660932
  conf.module!.exprContextCritical = false;
  if (env === 'production') {
    conf.output = { ...conf.output, publicPath: './' };
  }
  return conf;
};
