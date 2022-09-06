'use strict';

const Controller = require('egg').Controller;

class StaffController extends Controller {
  async create() {
    const { ctx,app,service } = this;
    const { SUCCESS,FAIL } = app.config.code;
    let postData = ctx.request.body;
    // 数据校验

    // 业务验证 手机号
    try {
        let hasSnumber = await service.staff.findOne({where:{snumber:postData.snumber}});
        if(hasSnumber) {
            ctx.body = {
                code: FAIL,
                msg: '该员工编号已经存在'
            }
            return ;
        }
        let hasPhone = await service.staff.findOne({where:{phone:postData.phone}});
        if(hasPhone) {
            ctx.body = {
                code: FAIL,
                msg: '该手机号已经注册'
            }
            return ;
        }
        let hasEmail = await service.staff.findOne({where:{email:postData.email}});
        if(hasEmail) {
            ctx.body = {
                code: FAIL,
                msg: '该邮箱已经注册'
            }
            return ;
        }
        let result = await service.staff.create(postData);
        if(result) {
            ctx.body = {
                code: SUCCESS,
                msg: '员工添加成功'
            }
        }else{
            ctx.body = {
                code: FAIL,
                msg: '员工添加失败'
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
      let { page,limit,did,pid,sname,snumber } = ctx.query;
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
            }
          ]
      };
      ops.where = {};
      if(sname) {
        ops.where.sname = {
            [Op.substring]: sname
        }
      }
      if(snumber) {
          ops.where.snumber = snumber;
      }
      if(did) {
          ops.where.did = did;
      }
      if(pid) {
          ops.where.pid = pid;
      }
      if(page && limit) {
          ops.offset = (page - 1)*limit;
      }
      if(limit) {
          ops.limit = limit*1;
      }
      try {
          let result = await service.staff.findAndCountAll(ops);
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
    let sid = ctx.params.id;
    if(!(sid && Number.isInteger(sid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.staff.deleteOne(sid);
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
    let sid = ctx.params.id;
    if(!(sid && Number.isInteger(sid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.staff.findOne(sid);
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
    let sid = ctx.params.id;
    let formData = ctx.request.body;
    if(!(sid && Number.isInteger(sid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.staff.updateOne(sid,formData);
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
  async new() {
    let { ctx,app,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    try {
        let result = await service.staff.findAll();
        ctx.body = {
            code: SUCCESS,
            msg: '数据获取成功',
            data: result
        }
    } catch (error) {
        console.log(error);

    }  
  }

  async edit(){
  let {ctx,app,service} = this;
  let { SUCCESS,FAIL } = app.config.code;
  let pid = ctx.params.id;
  console.log(pid);
  if(!(pid && Number.isInteger(pid*1))) {
    ctx.body = {
      code: FAIL,
      msg: '请选择姓名'
    }
    return;
  }
  try {
    let result = await service.staff.findStaffList(pid);
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


}

module.exports = StaffController;
