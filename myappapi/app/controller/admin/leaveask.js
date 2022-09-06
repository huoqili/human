'use strict';

const Controller = require('egg').Controller;

class LeaveaskController extends Controller {
    //添加
    async create() {
        let {app,service,ctx} = this;
        let {SUCCESS,FAIL} = app.config.code;
        let postdata = ctx.request.body;
        postdata.alstart = postdata.alslot[0];
        postdata.alend = postdata.alslot[1];
        delete postdata.alslot;
        try{
            let result = await service.leaveask.create(postdata)
            if(result){
                ctx.body = {
                    code:SUCCESS,
                    msg:'请假申请添加成功'
                }
            }else{
                ctx.body = {
                    code:FAIL,
                    msg:'请假申请添加失败'
                }
            }
        }catch(error){
            console.log(error);
            ctx.body = {
                code:FAIL,
                msg:'服务器异常'
            }
            ctx.status = 500;
        }
        
    }
    //查看
    async index(){
        let {app,ctx,service} = this;
        let {SUCCESS,FAIL} = app.config.code;
        let {page,limit,did,sname,altype} = ctx.query;
        console.log(ctx.query);
        let {Op} = app.Sequelize;
        let ops = {
            include:[
                {
                    model:app.model.Department,
                    as:'department',
                    attributes:['dname']
                },
                {
                    model:app.model.Position,
                    as:'position',
                    attributes:['pname']
                },
                {
                    model:app.model.Staff,
                    as:'staff',
                    attributes:['sname']
                }
            ],
            raw:true
        };
        ops.where = {};
        if(did){
            ops.where.did = did;
        }
        if(altype){
            ops.where.altype = altype;
        }
        if(page && limit){
            ops.offset = (page - 1)*limit;
        }
        if(limit){
            ops.limit = limit * 1;
        }
        try{
            let result = await service.leaveask.findAndCountAll(ops);
            let {rows,count} = result;
            ctx.body = {
                code:SUCCESS,
                msg:'数据获取成功',
                data:rows,
                count
            }
        } catch(error){
            console.log(error);
            ctx.body = {
                code:FAIL,
                msg:'服务器异常'
            }
            ctx.status = 500;
        }
    }
    //编辑查看
    async show(){
        const { ctx,app,service } = this;
        const { SUCCESS,FAIL } = app.config.code;
        let alid = ctx.params.id;
        if(!(alid && Number.isInteger(alid*1))) {
            ctx.body = {
                code: FAIL,
                msg: 'id不能为空且必须是数字'
            }
            return ;
        }
        try {
            let result = await service.leaveask.findOne(alid);
            result.dname = result['department.dname'];
            delete(result['department.dname']);
            result.pname = result['position.pname'];
            delete(result['position.pname']);
            result.sname = result['staff.sname'];
            delete(result['staff.sname']);
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
    //修改
    async update(){
        const { ctx,app,service } = this;
        const { SUCCESS,FAIL } = app.config.code;
        let alid = ctx.params.id;
        let data = ctx.request.body;
        if(!(alid && Number.isInteger(alid*1))) {
            ctx.body = {
                code: FAIL,
                msg: 'id不能为空且必须是数字'
            }
            return ;
        }
        try{
            let result = await service.leaveask.updateOne(alid,data);
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
        }
        catch(error){
            console.log(error);
            ctx.body = {
                code:FAIL,
                msg:'服务器异常'
            }
            ctx.status = 500;
        }
    }
}

module.exports = LeaveaskController;
