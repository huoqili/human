'use strict';

const Controller = require('egg').Controller;

class StrengthController extends Controller {
  async index() {
        let { ctx,app } = this;
        let { SUCCESS,FAIL } = app.config.code;
        let strength = [
            {id: 1, value:'轻松，可以承担更具挑战的工作'},
            {id: 2, value: '合适，可适当加大强度'},
            {id: 3, value:'刚好适合本人目前的能力'},
            {id: 4, value: '不太适应，略感吃力'}
        ];
        ctx.body = {
            code: SUCCESS,
            msg: '获取成功',
            data: strength
        }
  }
}

module.exports = StrengthController;
