'use strict';

const Controller = require('egg').Controller;

class RegularizationController extends Controller {
  async create() {
    const { ctx,app,service } = this;
    const { SUCCESS,FAIL } = app.config.code;
    let postData = ctx.request.body;
    let result=await service.regularization.create(postData)
    if(result) {
        ctx.body = {
            code: SUCCESS,
            msg: '转正添加成功'
        }
    }else{
        ctx.body = {
            code: FAIL,
            msg: '转正添加失败'
        }
  }
    
  }
  async index() {
    let { app,ctx,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let { page,limit,sid,rid} = ctx.query;
    let { Op } = app.Sequelize;
    let ops = {
        include: [
            {
                model: app.model.Position,
                as: 'position',
                attributes: ['pname']
            },
            {
                model: app.model.Department,
                as: 'department',
                attributes: ['dname']
            },
            {
                model: app.model.Staff,
                as: 'staff',
                attributes: ['sname']
            },
        ]
    };
    ops.where = {};
    if(rid) {
      ops.where.rid = {
          [Op.substring]: rid
      }
    }
    if(sid) {
        ops.where.sid = sid;
    }
    if(page && limit) {
        ops.offset = (page - 1)*limit;
    }
    if(limit) {
        ops.limit = limit*1;
    }

    try {
        let result = await service.regularization.findAndCountAll(ops);
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
async destroy() {
    const { ctx,app,service } = this;
    const { SUCCESS,FAIL } = app.config.code;
    let rid = ctx.params.id;
    if(!(rid && Number.isInteger(rid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.regularization.deleteOne(rid);
        if(result) {
            ctx.body = {
                code: SUCCESS,
                msg: '转正删除成功'
            }
        }else{
            ctx.body = {
                code: FAIL,
                msg: '转正删除失败'
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
  async show() {
    const { ctx,app,service } = this;
    const { SUCCESS,FAIL } = app.config.code;
    let rid = ctx.params.id;
    // console.log('rid在这'+rid);
    if(!(rid && Number.isInteger(rid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.regularization.findOne(rid);
        console.log(result);
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
    const { ctx,app,service } = this;
    const { SUCCESS,FAIL } = app.config.code;
    let rid = ctx.params.id;
    let formData = ctx.request.body;
    if(!(rid && Number.isInteger(rid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.regularization.updateOne(rid,formData);
        console.log(result);
        if(result) {
            ctx.body = {
                code: SUCCESS,
                msg: '信息编辑成功'
            }
        }else{
            ctx.body = {
                code: FAIL,
                msg: '信息编辑失败'
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

module.exports = RegularizationController;
