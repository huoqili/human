'use strict';

const Service = require('egg').Service;

class ContractService extends Service {
  async create(data) {
    let { app } = this;
    let result = await app.model.Contract.create(data);
    return result;
  }
  async findOne(cid) {
    let { app } = this;
    let result = await app.model.Contract.findOne({where: {cid}});
    return result;
  }

  async findAndCountAll(options) {
    let { app } = this;
    let result = await app.model.Contract.findAndCountAll(options);
    return result;
  }

  async deleteOne(cid) {
    let { app } = this;
    let result = await app.model.Contract.destroy({where: {cid}});
    return result;
  }

  async updateOne(cid,dataObj) {
    let { app } = this;
    let result = await app.model.Contract.update(dataObj,{where: {cid}});
    return result;
  }
}

module.exports = ContractService;
