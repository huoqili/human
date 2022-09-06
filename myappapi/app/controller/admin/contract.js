'use strict';

const Controller = require('egg').Controller;

class ContractController extends Controller {
  async create() {
    const { ctx,app,service } = this;
    const { SUCCESS,FAIL } = app.config.code;
    let postData = ctx.request.body;
    let result=await service.contract.create(postData)
    if(result) {
        ctx.body = {
            code: SUCCESS,
            msg: '合同添加成功'
        }
    }else{
        ctx.body = {
            code: FAIL,
            msg: '合同添加失败'
        }
  }
}
async index() {
    let { app,ctx,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let { page,limit,cid,cname } = ctx.query;
    let { Op } = app.Sequelize;
    let ops = {
        include: [
            {
              model: app.model.Staff,
              as: 'staff',
              attributes: ['sname']
          }
        ]
    };
    ops.where = {};
    if(cname) {
      ops.where.cname = {
          [Op.substring]: cname
      }
    }
    
    if(cid) {
        ops.where.cid = cid;
    }
    if(page && limit) {
        ops.offset = (page - 1)*limit;
    }
    if(limit) {
        ops.limit = limit*1;
    }
    try {
        let result = await service.contract.findAndCountAll(ops);
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
  let cid = ctx.params.id;
  if(!(cid && Number.isInteger(cid*1))) {
      ctx.body = {
          code: FAIL,
          msg: 'id不能为空且必须是数字'
      }
      return ;
  }
  try {
      let result = await service.contract.deleteOne(cid);
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

async show() {
  const { ctx,app,service } = this;
  const { SUCCESS,FAIL } = app.config.code;
  let cid = ctx.params.id;
  if(!(cid && Number.isInteger(cid*1))) {
      ctx.body = {
          code: FAIL,
          msg: 'id不能为空且必须是数字'
      }
      return ;
  }
  try {
      let result = await service.contract.findOne(cid);
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
  let cid = ctx.params.id;
  let formData = ctx.request.body;
  if(!(cid && Number.isInteger(cid*1))) {
      ctx.body = {
          code: FAIL,
          msg: 'id不能为空且必须是数字'
      }
      return ;
  }
  try {
      let result = await service.contract.updateOne(cid,formData);
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
module.exports = ContractController;
