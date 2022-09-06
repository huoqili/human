'use strict';

const Controller = require('egg').Controller;

class PeopleController extends Controller {
  async index() {
        let { ctx,app } = this;
        let { SUCCESS,FAIL } = app.config.code;
        let people = [
            {id: 1, value:'非常融洽'},
            {id: 2, value: '比较友好'},
            {id: 3, value:'沟通不畅'},
            {id: 4, value: '比较紧张'}
        ];
        ctx.body = {
            code: SUCCESS,
            msg: '获取成功',
            data: people
        }
  }
}

module.exports = PeopleController;
