'use strict';

const Controller = require('egg').Controller;

class PosttransferController extends Controller {
  async create() {
    const { ctx,app,service } = this;
    const { SUCCESS,FAIL } = app.config.code;
    let postData = ctx.request.body;
    // 数据校验
    // 业务验证  工号   姓名  入职时间  所属部门  岗位
    try {
        let snumber =postData.snumber;
        let option={
            where:{
                snumber
            }
        }
        let hasSnumber = await service.staff.findAddOne(option);
        if(!hasSnumber) {
            hasSnumber = {};
        }
        let hasOne = JSON.stringify(hasSnumber) === '{}';   
        let myRules=[
            {
                condition:hasOne,
             
                msg:`该员工编号不存在`
            },
            {
                condition:postData.sname!= hasSnumber.sname,
           
                msg: '该员工姓名不正确'
            },
            // {
            //     condition:postData.sinduction== hasSnumber.sinduction,
              
            //     msg:`该入职时间不对`
            // },
            {
                condition:postData.did!= hasSnumber.did,
             
                msg:    `该员工原部门错误`
            },
        ]
        
        console.log(postData.sinduction, hasSnumber.sinduction);

        let resultBack=null
        for(let i in  myRules){
            let r=myRules[i]
            let val=r.condition
            if(val){
                resultBack=r
                break
            }
        }
       
        if(resultBack){
            ctx.body = {
                code: FAIL,
                msg: resultBack.msg
              }
              return
        }


        let result = await service.posttransfer.create(postData);
        if(result) {
            ctx.body = {
                code: SUCCESS,
                msg: '添加成功'
            }
        }else{
            ctx.body = {
                code: FAIL,
                msg: '添加失败'
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
      let { page,limit,did,pid,sname,snumber,ptstate = 0} = ctx.query;
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
                model: app.model.Position,
                as: 'newposition',
                attributes: ['pname']
            },
            {
              model: app.model.Department,
              as: 'newdepartment',
              attributes: ['dname']
          }

          ]
      };
      ops.where = { };
     ops.where.ptstate =ptstate
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
          let result = await service.posttransfer.findAndCountAll(ops);
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
    let ptid = ctx.params.id;
    if(!(ptid && Number.isInteger(ptid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.posttransfer.deleteOne(ptid);
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
    let ptid = ctx.params.id;
    if(!(ptid && Number.isInteger(ptid*1))) {
        ctx.body = {
            code: FAIL,
            msg: 'id不能为空且必须是数字'
        }
        return ;
    }
    try {
        let result = await service.posttransfer.findOne(ptid);
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
    let ptid = ctx.params.id;
    let formData = ctx.request.body;
    if(!(ptid && Number.isInteger(ptid*1))) {
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
        let result = await service.posttransfer.updateOne(formData,ptid);
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
     let result = await service.posttransfer.updateOne({ptstate:1},ptid);
     let ptdata = await service.posttransfer.findOne(ptid);
  
     ptdata=ptdata.dataValues
    let did=ptdata.newdid
    let pid=ptdata.newpid
    
    let snumber=ptdata.snumber
    let op={
        where:{
            snumber:snumber
        }
    }
    let sdata = await service.staff.findAddOne(op);
    sdata=sdata.dataValues
    let sid = sdata.sid
     let sdataone = await service.staff.updateOne(sid,{did:did,pid:pid});
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

module.exports = PosttransferController;
