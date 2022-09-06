//工作交接
'use strict';

const Controller = require('egg').Controller;

class HworkController extends Controller {
  async index() {
    let { ctx,app } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let hwork = [
        {id:1,value:'工作文件'},
        {id:2,value:'工作资料'},
        {id:3,value:'固定资产及日常办公用品等实物'}
    ];
    ctx.body = {
        code:SUCCESS,
        msg:'交接工作获取成功',
        data:hwork
    }
  }
}

module.exports = HworkController;
