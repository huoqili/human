//离职原因
'use strict';

const Controller = require('egg').Controller;

class QuitreasonController extends Controller {
  async index() {
    let { ctx,app } = this;
    let { SUCCESS,FAIL } = app.config.code;
    let quitreason = [
        {id:1,value:'个人原因'},
        {id:2,value:'家庭原因'},
        {id:3,value:'发展原因'},
        {id:4,value:'薪资原因'},
        {id:5,value:'工作压力'},
        {id:6,value:'无晋升机会'},
        {id:7,value:'合同到期不续签'},
        {id:8,value:'协议解除'},
        {id:9,value:'试用期内辞退'},
        {id:10,value:'违反公司条例'},
        {id:11,value:'组织调整/裁员'},
        {id:12,value:'其他'}
    ];
    ctx.body = {
        code:SUCCESS,
        msg:'离职原因获取成功',
        data:quitreason
    }
  }
}

module.exports = QuitreasonController;
