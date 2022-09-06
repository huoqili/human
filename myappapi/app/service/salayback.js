'use strict';

const Service = require('egg').Service;

class SalaybackService extends Service {
  async create(dataObj) {
      let { app } = this;
      let result = await app.model.Salayback.create(dataObj);
      return result;
  }

  async hasSnumber(snumber) {
    let { app } = this;
    let ops = {
      where: {snumber},
      attributes: ['sname'],
      include: [
        {
          model: app.model.Department,
          as: 'department',
          attributes: ['dname']
        },
        {
          model: app.model.Position,
          as: 'position',
          attributes: ['pname']
        }
      ]
    }
      let result = await app.model.Staff.findOne(ops);
      return result; 
  }

  async findAndCountAll(options) {
    let { app } = this;
    let result = await app.model.Salayback.findAndCountAll(options);
    return result;
  }

  async updateState(fid,dataObj) {
    let { app } = this;
    let result = await app.model.Salayback.update(dataObj, {where: {fid}});
    return result;
  }
}

module.exports = SalaybackService;
