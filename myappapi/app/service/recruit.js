'use strict';

const Service = require('egg').Service;

class RecruitService extends Service {
  async createOne(dataObj) {
        let { app } = this;
        let result = await app.model.Recruit.create(dataObj);
        return result;
  }

  async findAndCountAll(ops) {
      let { app } = this;
      let result = await app.model.Recruit.findAndCountAll(ops);
      return result;
  }

  async findOne(rid) {
    let { app } = this;
    let result = await app.model.Recruit.findOne({where: {rid}});
    return result;
  }

  async updateOne(rid,dataObj) {
    let { app } = this;
    let result = await app.model.Recruit.update(dataObj,{where: {rid}});
    return result;
  }
  async deleteOne(rid) {
    let { app } = this;
    let result = await app.model.Recruit.destroy({where: {rid}});
    return result;
  }
}

module.exports = RecruitService;
