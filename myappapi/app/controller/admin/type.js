'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
  async index() {
    let {ctx,app}=this;
    let {SUCCESS}=app.config.code;
    let type=[
        {id:1,value:'固定期限'},
        {id:2,value:'非固定期限'},
        {id:3,value:'以完成一定工作任务为限'},
        {id:4,value:'外聘合同'},
        {id:5,value:'劳务派遣合同'},

    ]
    ctx.body={
        code: SUCCESS,
        msg: '类型获取成功',
        data: type
    }
  }
}

module.exports = TypeController;
