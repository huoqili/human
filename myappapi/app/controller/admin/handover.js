'use strict';

const Controller = require('egg').Controller;

class HandoverController extends Controller {
  async create() {
    let { ctx,app,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let postData = ctx.request.body;
    try{
        let result = await service.handover.create(postData)
            if(result) {
                ctx.body = {
                    code: SUCCESS,
                    msg: '交接添加成功'
                }
            }else{
                ctx.body = {
                    code: FAIL,
                    msg: '交接添加失败'
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
  async index(){
    let { app,ctx,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let { page,limit,did,pid,sname,snumber } = ctx.query;
    let { Op } = app.Sequelize;
    let ops = {
        include:[
            {
                model:app.model.Department,
                as:'department',
                attributes: ['dname']
            },
            {
                model:app.model.Position,
                as:'position',
                attributes: ['pname']
            },

        ]
    }
    ops.where = {};
    if(sname){
        ops.where.sname = {
            [Op.substring]: sname
        }
    }
    if(snumber){
        ops.where.snumber = snumber;
    }
    if(did){
        ops.where.did = did;
    }
    if(pid){
      ops.where.pid = pid;
    }
    if(page && limit) {
        ops.offset = (page - 1)*limit;
    }
    if(limit) {
        ops.limit = limit*1;
    }
    try {
        let result = await service.handover.findAndCountAll(ops);
        let {rows,count} = result;
        
        ctx.body = {
            code: SUCCESS,
            msg: '数据获取成功',
            data: rows,
            count: count
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
  async show(){
      let {ctx,app,service} =this;
      const { SUCCESS,FAIL } = app.config.code;
      let hid = ctx.params.id;
      try{
          let result = await service.handover.findOne(hid);
          console.log(result);
          if(result){
              ctx.body ={
                  code:SUCCESS,
                  msg:'交接获取成功',
                  data:result
              }
          }else{
              ctx.body = {
                  code:FAIL,
                  msg:'交接获取失败'
              }
          }
      }catch(err){
          console.log(err);
          ctx.body = {
              code:FAIL,
              msg:'服务器错误'
          }
          ctx.status = 500;
      }
  }
  async update(){
    const { ctx,app,service } = this;
    const { SUCCESS,FAIL } = app.config.code;
    let hid = ctx.params.id;
    let formData = ctx.request.body;
    
    if(!(hid && Number.isInteger(hid*1))){
        ctx.body = {
            code:FAIL,
            msg:'id不能为空且必须是数字'
        }
        return ;
    }
    try{
        let result = await service.handover.update(hid,formData._value);
        
        if(result){
            ctx.body ={
                code:SUCCESS,
                msg:'交接编辑成功'
            }
        }else{
            ctx.body ={
                code:FAIL,
                msg:'交接编辑失败'
            }
        }
    }catch(err){
        console.log(err);
        ctx.body = {
            code:FAIL,
            msg:'服务器异常'
        }
        ctx.status = 500;
    }
  }
  async destroy() {
    const { ctx,app,service } = this;
    const { SUCCESS,FAIL } = app.config.code;
    let hid = ctx.params.id;
    if(!(hid && Number.isInteger(hid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.handover.deleteOne(hid);
        if(result) {
            ctx.body = {
                code: SUCCESS,
                msg: '交接删除成功'
            }
        }else{
            ctx.body = {
                code: FAIL,
                msg: '交接删除失败'
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

module.exports = HandoverController;
