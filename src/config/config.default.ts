export = (appInfo: any) => {
  const config: any = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1562893699185_4075';

  // add your config here
  config.middleware = [
  ];
  config.view = {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.nj',
  };
  config.mongoose = {
    url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1/nlna',
    options: {}
  };
  config.email = {
    user: "932812871@qq.com",
    password: "rpevghyhruyhbbah",
    host: 'smtp.qq.com',
    sender: '932812871@qq.com'
  }

  return config;
};
