'use strict';

const Service = require('egg').Service;

class QuitService extends Service {
  async create(data) {
    let {app} = this;
    let result = await app.model.Quit.create(data)
    return result;
  }
  async findAndCountAll(options) {
    let { app } = this;
    let result = await app.model.Quit.findAndCountAll(options);
    return result;
  }
  async findOne(qid){
    let {app} = this;
    let result = await app.model.Quit.findOne({where:{qid}});
    return result;
  }
  async update(qid,data){
    let {app} = this;
    let result = await app.model.Quit.update(data,{where:{qid}});
    return result;
  }
  async deleteOne(qid) {
    let { app } = this;
    let result = await app.model.Quit.destroy({where: {qid}});
    return result;
  }
}

module.exports = QuitService;
