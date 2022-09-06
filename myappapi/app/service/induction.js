'use strict';

const Service = require('egg').Service;

class InductionService extends Service {
    async create(data) {
        let { app } = this;
        let result = await app.model.Induction.create(data);
        return result;
    }
    async findOne(inid) {
        let { app } = this;
        let result = await app.model.Induction.findOne({where: {inid}});
        return result;
      }
    
      async findAndCountAll(options) {
        let { app } = this;
        let result = await app.model.Induction.findAndCountAll(options);
        return result;
      }
    
      async deleteOne(inid) {
        let { app } = this;
        let result = await app.model.Induction.destroy({where: {inid}});
        return result;
      }
    
      async updateOne(inid,dataObj) {
        let { app } = this;
        let result = await app.model.Induction.update(dataObj,{where: {inid}});
        return result;
      }
    }
module.exports = InductionService;
