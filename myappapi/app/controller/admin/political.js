'use strict';

const Controller = require('egg').Controller;

class PoliticalController extends Controller {
  async index() {
    let { ctx,app,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let dataObj = [
        {id: 1,value:'党员'},
        {id: 2,value:'团员'},
        {id: 3,value:'群众'},
        {id: 4,value:'其他'}
    ]
    ctx.body = {
        code: SUCCESS,
        msg: '数据获取成功',
        data: dataObj
    }
  }
}

module.exports = PoliticalController;
