'use strict';

const Controller = require('egg').Controller;

class StaffListController extends Controller {
    async show() {
    let {ctx,app,service} = this;
    let { SUCCESS,FAIL } = app.config.code;
    let pid = ctx.params.id;
    if(!(pid && Number.isInteger(pid*1))) {
        ctx.body = {
            code: FAIL,
            msg: '请选择部门'
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

module.exports = StaffListController;
