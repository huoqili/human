'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
    async find(username) {
        let { app } = this;
        let result = await app.model.Admin.findOne({where: {username} });
        return result;
    }
}

module.exports = LoginService;
