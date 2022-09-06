'use strict';

const Controller = require('egg').Controller;

class WorkController extends Controller {
  async index() {
        let { ctx,app } = this;
        let { SUCCESS,FAIL } = app.config.code;
        let work = [
            {id: 1, value:'非常满意'},
            {id: 2, value: '还可以'},
            {id: 3, value:'需要改进'},
            {id: 4, value: '不满意'}
        ];
        ctx.body = {
            code: SUCCESS,
            msg: '获取成功',
            data: work
        }
  }
}

module.exports = WorkController;
