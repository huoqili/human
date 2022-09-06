'use strict';

const Controller = require('egg').Controller;

class RecruitController extends Controller {
  async index() {
      let { app,ctx,service } = this;
      let { SUCCESS,FAIL } = app.config.code;
      let { page,limit,pid,did,minTimes,maxTimes } = ctx.query;
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
          ],
          raw: true
      };
      ops.where = {};
    
      if(minTimes && maxTimes) {
        ops.where.rtimes = {
          [Op.between]: [minTimes,maxTimes]
        }
      }else {
          if(minTimes) {
            ops.where.rtimes = {
              [Op.gte]: minTimes
            }
          }
  
          if(maxTimes) {
            ops.where.rtimes = {
              [Op.lte]: maxTimes
            }
          }
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
        ops.limit = limit*1 ;
      }

      try {
          let result = await service.recruit.findAndCountAll(ops);
          let { rows,count } = result;
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
  async create() {
      let { app,ctx,service } = this;
      let { SUCCESS,FAIL } = app.config.code;
      let formData = ctx.request.body;
      try {
          let result = await service.recruit.createOne(formData);
          if(result.rid > 0) {
              ctx.body = {
                  code: SUCCESS,
                  msg: '数据提交成功'
              }
          }else{
              ctx.body = {
                  code: FAIL,
                  msg: '数据提交失败'
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
    if(!(rid && Number.isInteger(rid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.recruit.findOne(rid);
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
    let formData = ctx.request.body;
    let rid = formData.rid;
    delete formData.rid;
    if(!(rid && Number.isInteger(rid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.recruit.updateOne(rid,formData);
        
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
        let result = await service.recruit.deleteOne(rid);
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

  async new() {
      let { app,ctx,service } = this;
      let { SUCCESS,FAIL } = app.config.code;
      let { page,limit } = ctx.query;
      let ops = {
            attributes: ['rid','rduty','rcondition'],
            include: [
                {
                    model: app.model.Position,
                    as: 'position',
                    attributes: ['pname']
                }
            ],
            raw: true    
      };
      if(page && limit) {
        ops.offset = (page - 1)*limit;
      }
      if(limit) {
        ops.limit = limit*1 ;
      }
      try {
        let result = await service.recruit.findAndCountAll(ops);
        let { rows,count } = result;
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

}

module.exports = RecruitController;
