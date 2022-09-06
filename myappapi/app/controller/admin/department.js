'use strict';

const Controller = require('egg').Controller;

class DepartmentController extends Controller {
  async create() {
    let { ctx,app,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let formData = ctx.request.body;
    let rules = {
        dnum: {type:'string',min:0,max:20,required: true},
        dname: {type:'string',min:3,max:10,required: true}
    };
    let validateData = app.validator.validate(rules,formData);
    if(validateData) {
        ctx.body = {
            code: FAIL,
            msg: validateData[0].field+'  '+ validateData[0].code
        }
        return;
    }
    try {
        let result = await service.department.createOne(formData);
        if(result.did > 0) {
            ctx.body = {
                code: SUCCESS,
                msg: '数据添加成功'
            }
        }else {
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
      let { ctx,app,service } = this;
      let { SUCCESS,FAIL } = app.config.code;
      let { page,limit,dnum,dname } = ctx.query;
      const Sequelize = require('sequelize');
      const Op = Sequelize.Op;
      let ops = {};
      ops.where = {};
      if(dnum) {
          ops.where.dnum = dnum;
      }
      if(dname) {
          ops.where.dname = {
            [Op.substring]: dname
          }
      }
      if(page && limit) {
          ops.offset = (page - 1)*limit;
      }
      if(limit) {
          ops.limit = limit*1;
      }
      try {
          let result = await service.department.findAndCountAll(ops);
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

  async show() {
      let { ctx,app,service } = this;
      let { SUCCESS,FAIL } = app.config.code;
      let did = ctx.params.id;
      try {
        let result = await service.department.findOne(did);
        if(result) {
            ctx.body = {
                code: SUCCESS,
                msg: '数据添加成功',
                data: result
            }
        }else {
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

  async update() {
      let { ctx,app,service } = this;
      let { SUCCESS,FAIL } = app.config.code;
      let did = ctx.params.id;
      let formData = ctx.request.body;
      try {
        let result = await service.department.updateOne(formData,did);
        if(result.length) {
            ctx.body = {
                code: SUCCESS,
                msg: '数据更新成功'
            }
        }else {
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

  async destroy() {
      let { ctx,app,service } = this;
      let { SUCCESS,FAIL } = app.config.code;
      let did = ctx.params.id;
      try {
        let result = await service.department.deleteOne(did);
        console.log(result);
        if(result > 0) {
            ctx.body = {
                code: SUCCESS,
                msg: '数据添加成功'
            }
        }else {
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

  async new() {
    let { ctx,app,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    try {
        let result = await service.department.findAll();
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

module.exports = DepartmentController;
