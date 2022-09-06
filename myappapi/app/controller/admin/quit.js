'use strict';

const Controller = require('egg').Controller;

class QuitController extends Controller {
  async create() {
    let { ctx,app,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let postData = ctx.request.body;
    try{
        // let qname = await service.staff.findOne({where:{sname:postData.qname}})

        let result = await service.quit.create(postData)
            if(result) {
                ctx.body = {
                    code: SUCCESS,
                    msg: '离职申请添加成功'
                }
            }else{
                ctx.body = {
                    code: FAIL,
                    msg: '离职申请添加失败'
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
    let { page,limit,did,qname,qnumber } = ctx.query;
    let { Op } = app.Sequelize;
    let ops = {
        include:[
            {
                model:app.model.Department,
                as:'department',
                attributes: ['dname']
            }
        ]
    }
    ops.where = {};
    if(qname){
        ops.where.qname = {
            [Op.substring]: qname
        }
    }
    if(qnumber){
        ops.where.qnumber = qnumber;
    }
    if(did){
        ops.where.did = did;
    }
    if(page && limit) {
        ops.offset = (page - 1)*limit;
    }
    if(limit) {
        ops.limit = limit*1;
    }
    try {
        let result = await service.quit.findAndCountAll(ops);
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
      let qid = ctx.params.id;
      try{
          let result = await service.quit.findOne(qid);
        //   console.log(result);
          if(result){
              ctx.body ={
                  code:SUCCESS,
                  msg:'离职申请获取成功',
                  data:result
              }
          }else{
              ctx.body = {
                  code:FAIL,
                  msg:'离职申请获取失败'
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
    let qid = ctx.params.id;
    let formData = ctx.request.body;
    
    if(!(qid && Number.isInteger(qid*1))){
        ctx.body = {
            code:FAIL,
            msg:'id不能为空且必须是数字'
        }
        return ;
    }
    try{
        let result = await service.quit.update(qid,formData._value);
        
        if(result){
            ctx.body ={
                code:SUCCESS,
                msg:'离职申请编辑成功'
            }
        }else{
            ctx.body ={
                code:FAIL,
                msg:'离职申请编辑失败'
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
    let qid = ctx.params.id;
    if(!(qid && Number.isInteger(qid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.quit.deleteOne(qid);
        if(result) {
            ctx.body = {
                code: SUCCESS,
                msg: '员工删除成功'
            }
        }else{
            ctx.body = {
                code: FAIL,
                msg: '员工删除失败'
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

module.exports = QuitController;
