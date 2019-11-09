/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1572622785941_6390';
  config.security = {
    csrf: false,
  };

  // add your middleware config here
  config.middleware = [ 'init', 'auth' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // session
  config.session = {
    maxAge: 365 * 24 * 3600 * 1000,
  };

  // connect mongodb
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017',
    options: {
      dbName: 'weekly-report',
      // user: 'cherishSmile',
      // pass: 'cherishSmile',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
