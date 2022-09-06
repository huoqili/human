'use strict';

const Controller = require('egg').Controller;

class WorkloadController extends Controller {
  async index() {
        let { ctx,app } = this;
        let { SUCCESS,FAIL } = app.config.code;
        let workload = [
            {id: 1, value:'太多'},
            {id: 2, value: '略多'},
            {id: 3, value:'刚好'},
            {id: 4, value: '太少'}
        ];
        ctx.body = {
            code: SUCCESS,
            msg: '获取成功',
            data: workload
        }
  }
}

module.exports = WorkloadController;
