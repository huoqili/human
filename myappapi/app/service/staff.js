'use strict';

const Service = require('egg').Service;

class StaffService extends Service {
  async create(data) {
    let { app } = this;
    let result = await app.model.Staff.create(data);
    return result;
  }

  async findOne(sid) {
    let { app } = this;
    let result = await app.model.Staff.findOne({where: {sid}});
    return result;
  }

  async findAddOne(options) {
    let { app } = this;
    let result = await app.model.Staff.findOne(options);
    console.log(result,2223);
    return result;
  }

  async findAndCountAll(options) {
    let { app } = this;
    let result = await app.model.Staff.findAndCountAll(options);
    return result;
  }

  async deleteOne(sid) {
    let { app } = this;
    let result = await app.model.Staff.destroy({where: {sid}});
    return result;
  }

  async updateOne(sid,dataObj) {
    let { app } = this;
    let result = await app.model.Staff.update(dataObj,{where: {sid}});
    return result;
  }

  async findOneStaff(ops) {
    let { app } = this;
    let result = await app.model.Staff.findOne(ops);
    return result;
  }
  async findAll() {
    let { app } = this;
    let result = await app.model.Staff.findAll();
    return result; 
  }
  async findStaffList(pid) {
    let { app } = this;
    let result = await app.model.Staff.findAll({where: {pid}});
    return result;
  }
}

module.exports = StaffService;
