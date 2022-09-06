'use strict';

const Controller = require('egg').Controller;

class AuditionController extends Controller {
  async create() {
    let { app,ctx,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let formData = ctx.request.body;
    try {
      let result = await service.audition.createOne(formData);
      if(result.aid > 0) {
        ctx.body = {
          code: SUCCESS,
          msg: '数据添加成功'
        }
      }else{
        ctx.body = {
          code: FAIL,
          msg: '数据添加失败'
        }
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: FAIL,
        msg: '服务器异常'
      }
      ctx.status = 500;
    }
  }

  async index() {
    let { app,ctx,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let {page,limit} = ctx.query;
    let ops = {
      include: [
        {
          model: app.model.Recruit,
          as: 'recruit',
          include:[
            {
              model: app.model.Position,
              as: 'position',
              attributes: ['pname']
            },
            {
              model: app.model.Department,
              as: 'department',
              attributes: ['dname']
            }
          ]
        }
      ],
      raw: true
    };
    if(page && limit) {
      ops.offset = (page - 1)*limit;
    }
    if(limit) {
        ops.limit = limit*1;
    }
    try {
      let result = await service.audition.findAndCountAll(ops);
      let { rows,count } = result;
      ctx.body = {
        code: SUCCESS,
        msg: '数据获取成功',
        data: rows,
        count
      }
    } catch(error){
      console.log(error);
      ctx.body = {
        code: FAIL,
        msg: '服务器异常'
      }
      ctx.status = 500;
    }
  }

  async show() {
    let { app,service,ctx } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let aid = ctx.params.id;
    if(!(aid && Number.isInteger(aid*1))) {
      ctx.body = {
        code: FAIL,
        msg: 'aid不能为空且必须是数字'
      }
      return ;
    }
    let ops = {
      where: {aid}
    }
    try {
      let result = await service.audition.findOne(ops);
      if(result) {
        ctx.body = {
          code: SUCCESS,
          msg: '数据获取成功',
          data: result
        }
      }else{
        ctx.body = {
          code: FAIL,
          msg: '数据获取失败'
        }
      } 
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: FAIL,
        msg: '服务器异常'
      }
      ctx.status = 500;
    }
  }

  async update() {
    let { app,ctx,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let formData = ctx.request.body;
    try {
      let result = await service.audition.updateOne(formData);
      if(result) {
        ctx.body = {
          code: SUCCESS,
          msg: '数据更新成功'
        }
      }else{
        ctx.body = {
          code: FAIL,
          msg: '数据更新失败'
        }
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: FAIL,
        msg: '服务器异常'
      }
      ctx.status = 500;
    }
  }

  async new() {
    let {app,ctx,service} = this;
    let { SUCCESS,FAIL } = app.config.code;
    try {
      let result = await service.audition.chartData();
      if(result) {
        ctx.body = {
          code: SUCCESS,
          msg: '数据获取成功',
          data: result
        }
      }else{
        ctx.body = {
          code: FAIL,
          msg: '数据获取失败'
        }
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: FAIL,
        msg: '服务器异常'
      }
      ctx.status = 500;
    }
  }
}

module.exports = AuditionController;
