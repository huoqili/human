'use strict';

const Controller = require('egg').Controller;

class HstateController extends Controller {
  async index() {
    let { ctx,app } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let hstate = [
        {id:1,value:'已交接'},
        {id:2,value:'未交接'},
    ];
    ctx.body = {
        code:SUCCESS,
        msg:'工作交接状态获取成功',
        data:hstate
    }
  }
}

module.exports = HstateController;
