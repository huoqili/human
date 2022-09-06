'use strict';

const Controller = require('egg').Controller;

class InductionController extends Controller {
    async create() {
        console.log('--------------------');
        const { ctx,app,service } = this;
        const { SUCCESS,FAIL } = app.config.code;
        let postData = ctx.request.body;
        // 数据校验
    
        // 业务验证 手机号
        try {
            let snumber=postData.snumber
            let param={where:{snumber:snumber}}
            let hasSnumber = await service.staff.findAddOne(param)
            if(hasSnumber) {
                ctx.body = {
                    code: FAIL,
                    msg: '该员工编号已经存在'
                }
                return ;
            }
            let hasPhone = await service.staff.findAddOne({where:{phone:postData.phone}});
            if(hasPhone) {
                ctx.body = {
                    code: FAIL,
                    msg: '该手机号已经注册'
                }
                return ;
            }
            let hasEmail = await service.staff.findAddOne({where:{email:postData.email}});
            if(hasEmail) {
                ctx.body = {
                    code: FAIL,
                    msg: '该邮箱已经注册'
                }
                return ;
            }
            let result = await service.induction.create(postData);
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
        let { page,limit,did,pid,sname,snumber,instate= 0,} = ctx.query;
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
        ops.where = { };
       ops.where.instate =instate
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
            let result = await service.induction.findAndCountAll(ops);
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
        let inid = ctx.params.id;
        if(!(inid && Number.isInteger(inid*1))) {
            ctx.body = {
                code: FAIL,
                msg: 'id不能为空且必须是数字'
            }
            return ;
        }
        try {
            let result = await service.induction.deleteOne(inid);
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
    let inid = ctx.params.id;
    if(!(inid && Number.isInteger(inid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.induction.findOne(inid);
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
        let inid = ctx.params.id;
        let formData = ctx.request.body;
        if(!(inid && Number.isInteger(inid*1))) {
            ctx.body = {
                code: FAIL,
                msg: 'id不能为空且必须是数字'
            }
            return ;
        }
        try {
        //通过键的数量判断对象是否为空
        let keyLen=Object.keys(formData).length
        if(keyLen>0){
            let result = await service.induction.updateOne(inid,formData);
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
        }else{
         let result = await service.induction.updateOne(inid,{instate:1});
         let indata = await service.induction.findOne(inid);
       
         indata=indata.dataValues
         console.log(indata);
        let {did, pid,snumber,sname,phone,email,sinduction,ssex,spolitical,seducation,school,smajor,sgraduation }=indata
        let staff={did, pid,snumber,sname,phone,email,sinduction,ssex,spolitical,seducation,school,smajor,sgraduation}
         let sdataone = await service.staff.create(staff);
          ctx.body = {
            code: SUCCESS,
            msg: '信息编辑成功'
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

module.exports = InductionController;
