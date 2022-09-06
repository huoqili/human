'use strict';

const Controller = require('egg').Controller;

class SalarybackController extends Controller {
  async index() {
    let { app,ctx,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let { page,limit } = ctx.query;
    let ops = {};
    if(page && limit) {
      ops.offset = (page - 1)*limit;
    }
    if(limit) {
        ops.limit = limit*1;
    }
    try {
        let result = await service.salayback.findAndCountAll(ops);
        let {rows,count} = result;
        if(rows.length) {
          ctx.body = {
            code: SUCCESS,
            msg: '数据获取成功',
            data: rows,
            count
          }
        }else{
          ctx.body = {
            code: SUCCESS,
            msg: '暂无数据'
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
    let { app,ctx,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let { snumber } = ctx.query;
    try {
        let hasSnumber = await service.salayback.hasSnumber(snumber);
        if(hasSnumber) {
          ctx.body = {
            code: SUCCESS,
            msg: '数据获取成功',
            data: hasSnumber
          }
        }else {
          ctx.body = {
            code: FAIL,
            msg:'请输入正确得职工编号'
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

  async create() {
    let { ctx,app,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let formData = ctx.request.body;
    delete formData.pname;
    delete formData.dname;
    try {
      let result = await service.salayback.create(formData);
      if(result.fid>0) {
        ctx.body = {
          code: SUCCESS,
          msg:'数据添加成功'
        }
      }else {
        ctx.body = {
          code: FAIL,
          msg:'数据添加失败'
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
    let fid = ctx.params.id;
    try {
      let result = await service.salayback.updateState(fid,formData);
      if(result[0] > 0) {
        ctx.body = {
          code: SUCCESS,
          msg: '操作成功'
        }
      }else {
        ctx.body = {
          code: FAIL,
          msg: '操作失败'
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

module.exports = SalarybackController;
