'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
    async create() {
        let { ctx,app,service } = this;
        let { SUCCESS,FAIL } = app.config.code;
        // 用户名 密码
        let postData = ctx.request.body;
        // 校验参数
        // ctx.validate();        
        let rules = {
            username: {type: 'string', required: true,min:3,max:10},
            password: {type: 'string', required: true,min:6,max:8}
        }
        let validateData =  app.validator.validate(rules, postData);
        if(validateData) {
            ctx.body = {
                code: FAIL,
                msg: validateData[0].field+'  '+ validateData[0].code
            }
            return;
        }

        let userInfo = await service.login.find(postData.username);
        if(!userInfo) {
            ctx.body = {
                code: FAIL,
                msg: '该用户不存在'
            }
        } else {
            let pass = ctx.setPassword(postData.password);
            console.log(22222222222222,pass)
            if(pass === userInfo.password) {
                let payload = {id: userInfo.id, username: userInfo.username};
                let token = app.jwt.sign(payload, app.config.jwt.secret);
                ctx.body = {
                    code: SUCCESS,
                    msg: '登陆成功',
                    token,
                    userInfo: payload
                }
                console.log(1111111111,payload)
            }else {
                ctx.body = {
                    code: FAIL,
                    msg: '密码错误'
                }
            }
        }
    }
}

module.exports = LoginController;
