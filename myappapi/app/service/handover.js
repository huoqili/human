'use strict';

const Service = require('egg').Service;

class HandoverService extends Service {
  async create(data) {
    let {app} = this;
    let result = await app.model.Handover.create(data)
    return result;
  }
  async findAndCountAll(options) {
    let { app } = this;
    let result = await app.model.Handover.findAndCountAll(options);
    return result;
  }
  async findOne(hid){
    let {app} = this;
    let result = await app.model.Handover.findOne({where:{hid}});
    return result;
  }
  async update(hid,data){
    let {app} = this;
    let result = await app.model.Handover.update(data,{where:{hid}});
    return result;
  }
  async deleteOne(hid) {
    let { app } = this;
    let result = await app.model.Handover.destroy({where: {hid}});
    return result;
  }
}

module.exports = HandoverService;
