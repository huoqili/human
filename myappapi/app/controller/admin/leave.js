'use strict';

const Controller = require('egg').Controller;

class LeaveController extends Controller {
    async index() {
        let { ctx,app,service } = this;
        let { SUCCESS,FAIL } = app.config.code;
        let dataObj = [
            {id: 1,value:'病假'},
            {id: 2,value:'事假'},
            {id: 3,value:'婚假'},
            {id: 4,value: '产假'},
            {id: 5,value: '产检假'},
            {id: 6,value: '陪产假'}
        ]
        ctx.body = {
            code: SUCCESS,
            msg: '数据获取成功',
            data: dataObj
        }
    }
}

module.exports = LeaveController;
