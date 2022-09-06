'use strict';

const Controller = require('egg').Controller;

class PositionController extends Controller {
  async index() {
    let { app,service,ctx } = this;
    let { SUCCESS,FAIL } = app.config.code;
    try {
        let result = await service.position.findAll();
        ctx.body = {
            code: SUCCESS,
            msg: '数据获取成功',
            data: result
        }
    } catch (error) {
        console.log(error);
    }
    
  }

  async show() {
    let {ctx,app,service} = this;
    let { SUCCESS,FAIL } = app.config.code;
    let did = ctx.params.id;
    console.log(did);
    if(!(did && Number.isInteger(did*1))) {
      ctx.body = {
        code: FAIL,
        msg: '请选择部门'
      }
      return;
    }
    try {
      let  result = await service.position.findPositionList(did);
      console.log(result)
      if(result.length) {
        ctx.body = {
          code: SUCCESS,
          msg: '数据获取成功',
          data: result
        }
      }else{
        ctx.body = {
          code: FAIL,
          msg: '暂无数据',
          data: result
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
    let {ctx,app,service} = this;
    let { SUCCESS,FAIL } = app.config.code;
    let pid = ctx.params.id;
    
    if(!(pid && Number.isInteger(pid*1))) {
      ctx.body = {
        code: FAIL,
        msg: '请选择职位'
      }
      return;
    }
    try {
      let result = await service.position.findNamesList(pid);
      if(result) {
        ctx.body = {
          code: SUCCESS,
          msg: '数据获取成功',
          data: result
        }
      }else{
        ctx.body = {
          code: FAIL,
          msg: '暂无数据',
          data: result
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
    let { ctx,app,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    try {
        let result = await service.position.findpositionAll();
        ctx.body = {
            code: SUCCESS,
            msg: '数据获取成功',
            data: result
        }
    } catch (error) {
        console.log(error);

    }  
  }
}

module.exports = PositionController;
