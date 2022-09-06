'use strict';

const Controller = require('egg').Controller;

class SexController extends Controller {
  async index() {
        let { ctx,app } = this;
        let { SUCCESS,FAIL } = app.config.code;
        let sex = [
            {id: 1, value:'男'},
            {id: 2, value: '女'}
        ];
        ctx.body = {
            code: SUCCESS,
            msg: '性别获取成功',
            data: sex
        }
  }
}

module.exports = SexController;
