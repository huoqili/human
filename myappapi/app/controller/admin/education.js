'use strict';

const Controller = require('egg').Controller;

class EducationController extends Controller {
  async index() {
    let { ctx,app,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let dataObj = [
        {id: 1,value:'硕士'},
        {id: 2,value:'学士'},
        {id: 3,value:'大专'},
        {id: 4,value: '其他'}
    ]
    ctx.body = {
        code: SUCCESS,
        msg: '数据获取成功',
        data: dataObj
    }
  }
}

module.exports = EducationController;
