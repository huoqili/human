'use strict';

const Controller = require('egg').Controller;

class SalayController extends Controller {
  async index() {
    let { app,ctx,service } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let { page,limit,sname,minSalay,maxSalay,minTimes,maxTimes } = ctx.query;
    let { Op } = app.Sequelize;
    let ops = {
      include: [
        {
          model: app.model.Position,
          as: 'position',
          attributes: ['pname']
        }
      ]
    };
    ops.where = {};
    if(sname) {
      ops.where.sname = {
          [Op.substring]: sname
      }
    }
    if(minSalay && maxSalay) {
      ops.where.factsalay = {
        [Op.between]: [minSalay,maxSalay]
      }
    }else {
        if(minSalay) {
          ops.where.factsalay = {
            [Op.gte]: minSalay
          }
        }

        if(maxSalay) {
          ops.where.factsalay = {
            [Op.lte]: maxSalay
          }
        }
    }

    if(minTimes && maxTimes) {
      ops.where.stime = {
        [Op.between]: [minTimes,maxTimes]
      }
    }else {
        if(minTimes) {
          ops.where.stime = {
            [Op.gte]: minTimes
          }
        }

        if(maxTimes) {
          ops.where.stime = {
            [Op.lte]: maxTimes
          }
        }
    }
  
    if(page && limit) {
        ops.offset = (page - 1)*limit;
    }
    if(limit) {
        ops.limit = limit*1;
    }
    try {
        let result = await service.salay.findAndCountAll(ops);
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

  async create() {
    let { app,service,ctx } = this;
    const { SUCCESS,FAIL } = app.config.code;
    let formData = ctx.request.body;
    let ops = {
        where: {
          sname: formData.sname,
          pid: formData.pid,
          did: formData.did
        },
        attributes: ['phone']
    }
    delete formData.did;
    
    try {
      // 验证手机号码
        let staffPhone = await service.staff.findOneStaff(ops);
        if(staffPhone.phone !== formData.sphone) {
          ctx.body = {
            code: FAIL,
            msg: '手机号码错误,请重新输入'
          }
          return;
        }
        let result = await service.salay.createOne(formData);
        if(result) {
          if(result) {
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
    let { app,service,ctx } = this;
    const { SUCCESS,FAIL } = app.config.code;
    try {
      let line = await service.salay.everyTypeSum();
      console.log(line);
      ctx.body = {
        code: SUCCESS,
        msg: 'success',
        data: line
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
    let { app,service,ctx } = this;
    const { SUCCESS,FAIL } = app.config.code;
    let sid = ctx.params.id;
    if(!(sid && Number.isInteger(sid * 1))) {
      ctx.body = {
        code: FAIL,
        msg: '请传入当前信息的关键标识'
      }
      return;
    }
    try {
      let result = await service.salay.findOne(sid);
      if(result) {
        ctx.body = {
          code: SUCCESS,
          msg: '数据获取成功',
          data: result
        }
      }else{
        ctx.body = {
          code: FAIL,
          msg: '查询失败'
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
    let { app,service,ctx } = this;
    const { SUCCESS,FAIL } = app.config.code;
    console.log(ctx.params.id);
    let formData = ctx.request.body;
    console.log(formData)
    let sid = formData.sid;
    delete formData.sid;
    delete formData.pid;
    delete formData.sphone;
    delete formData.ssure;
    delete formData.stime;
    try {
      let result = await service.salay.updateOne(sid,formData);
      console.log(result);
      if(result > 0) {
        ctx.body = {
          code: SUCCESS,
          msg: '数据编辑成功'
        }
      }else {
        ctx.body = {
          code: FAIL,
          msg: '数据编辑失败'
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

module.exports = SalayController;
