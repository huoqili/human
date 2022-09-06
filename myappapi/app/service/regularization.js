'use strict';

const Service = require('egg').Service;

class RegularizationService extends Service {
  async create(data) {
    let {app} = this;
    console.log(data);
    let result=await app.model.Regularization.create(data);
    return result
  }
  async findAndCountAll(options) {
    console.log(1);
    let { app } = this;
    let result = await app.model.Regularization.findAndCountAll(options);
    return result;
  }
  async deleteOne(rid) {
    let { app } = this;
    let result = await app.model.Regularization.destroy({where: {rid}});
    return result;
  }
  async findOne(rid) {
    let { app } = this;
    let result = await app.model.Regularization.findOne({where: {rid}});
    return result;
  }
  async updateOne(rid,dataObj) {
    let { app } = this;
    let result = await app.model.Regularization.update(dataObj,{where: {rid}});
    return result;
  }
}

module.exports = RegularizationService;
