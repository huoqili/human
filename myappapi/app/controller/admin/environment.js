'use strict';

const Controller = require('egg').Controller;

class EnvironmentController extends Controller {
  async index() {
        let { ctx,app } = this;
        let { SUCCESS,FAIL } = app.config.code;
        let environment = [
            {id: 1, value:'很好'},
            {id: 2, value: '舒适'},
            {id: 3, value:'一般'},
            {id: 4, value: '较差'}
        ];
        ctx.body = {
            code: SUCCESS,
            msg: '获取成功',
            data: environment
        }
  }
}

module.exports = EnvironmentController;
