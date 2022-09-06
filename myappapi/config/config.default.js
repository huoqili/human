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
  config.keys = appInfo.name + '_1636514990378_7931';

  // add your middleware config here


  // add your user config here

  config.middleware = ['adminauth'];
  config.adminauth = {
    enable: true,
    match: "/admin"
  }
  config.security = {
    csrf: false,
    domainWhiteList: ['http://localhost:8080']
  }

  config.multipart = {
    fileSize: '50mb',
    mode: 'stream',
    fileExtensions: ['.xls','.txt','.doc','.docx']
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  config.jwt = {
    secret: 'humanresources'
  }
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'humanresources'
    },
    app: true 
  }
  config.validate = {
    convert: true,
    validateRoot:true
  }
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'humanresources',
    // define: {
    //   freezeTableName: true
    // }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    code: {
      SUCCESS: 200,
      FAIL: 404
    }
  };



  return {
    ...config,
    ...userConfig,
  };
};
