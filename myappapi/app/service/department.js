'use strict';

const Service = require('egg').Service;

class DepartmentService extends Service {
  async createOne(dataObj) {
        let { app } = this;
        let result = await app.model.Department.create(dataObj);
        return result;
  }

  async findOne(did) {
    let { app } = this;
    let result = await app.model.Department.findByPk(did);
    return result; 
}


  async findAll() {
      let { app } = this;
      let result = await app.model.Department.findAll();
      return result; 
  }

  async findAndCountAll(ops) {
        let { app } = this;
        let result = await app.model.Department.findAndCountAll(ops);
        return result;
  }

  async deleteOne(did) {
        let { app } = this;
        let result = await app.model.Department.destroy({where:{did}});
        return result;
  }

  async updateOne(dataObj,did) {
    
    let { app } = this;
    let result = await app.model.Department.update(dataObj,{where: {did}});
    return result;
  }
}

module.exports = DepartmentService;
