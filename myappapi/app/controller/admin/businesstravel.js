'use strict';

const Controller = require('egg').Controller;

class BusinesstravelController extends Controller {
    //创建
    async create() {
        let {app,service,ctx} = this;
        let {SUCCESS,FAIL} = app.config.code;
        let postdata = ctx.request.body;
        //起止日期
        postdata.btstart = postdata.btslot[0];
        postdata.btend = postdata.btslot[1];
        delete postdata.btslot;
        //省市区
        // postdata.btprovince = postdata.btaddress[0];
        // postdata.btcity = postdata.btaddress[1];
        // postdata.btcounty = postdata.btaddress[2];
        // delete postdata.btaddress;
        try{
            let result = await service.businesstravel.create(postdata)
            if(result){
                ctx.body = {
                    code:SUCCESS,
                    msg:'出差申请添加成功'
                }
            }else{
                ctx.body = {
                    code:FAIL,
                    msg:'出差申请添加失败'
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
        let {page,limit,did,btaddress,altype} = ctx.query;
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
        if(btaddress) {
                ops.where.btaddress = {
                    [Op.substring]: btaddress
                }
            }
        if(did){
            ops.where.did = did;
        }
        // if(altype){
        //     ops.where.altype = altype;
        // }
        if(page && limit){
            ops.offset = (page - 1)*limit;
        }
        if(limit){
            ops.limit = limit * 1;
        }
        try{
            let result = await service.businesstravel.findAndCountAll(ops);
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
    //修改
    async update(){
        const { ctx,app,service } = this;
        const { SUCCESS,FAIL } = app.config.code;
        let btid = ctx.params.id;
        let data = ctx.request.body;
        if(!(btid && Number.isInteger(btid*1))) {
            ctx.body = {
                code: FAIL,
                msg: 'id不能为空且必须是数字'
            }
            return ;
        }
        try{
            let result = await service.businesstravel.updateOne(btid,data);
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
    //编辑查看
    async show(){
        const { ctx,app,service } = this;
        const { SUCCESS,FAIL } = app.config.code;
        let btid = ctx.params.id;
        if(!(btid && Number.isInteger(btid*1))) {
            ctx.body = {
                code: FAIL,
                msg: 'id不能为空且必须是数字'
            }
            return ;
        }
        try {
            let result = await service.businesstravel.findOne(btid);
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
}

module.exports = BusinesstravelController;
