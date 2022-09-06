'use strict';

const Service = require('egg').Service;

class AuditionService extends Service {
  async createOne(dataObj) {
    let { app } = this;
    let result = await app.model.Audition.create(dataObj);
    return result;
  }

  async findAndCountAll(ops) {
    let { app } = this;
    let result = await app.model.Audition.findAndCountAll(ops);
    return result;
  }

  async findOne(dataObj) {
    let { app } = this;
    let result = await app.model.Audition.findOne(dataObj);
    return result;
  }

  async updateOne(dataObj) {
    let { app } = this;
    let ops = {
      where: {aid: dataObj.aid}
    }
    let result = await app.model.Audition.update(dataObj,ops);
    return result;
  }

  async chartData() {
    let { app } = this;
    let { fn,col } = app.Sequelize;
    let ops = {
      where: {
        aresult: 0
      },
      attributes: [
          [fn('count',col('aid')),'pass']
      ],
      raw: true
    }
    let ops1 = {
      where: {
        aresult: 1
      },
      attributes: [
          [fn('count',col('aid')),'nopass']
      ],
      raw: true
    }
    let ops2 = {
      where: {
        emresult: 0
      },
      attributes: [
          [fn('count',col('aid')),'empass']
      ],
      raw: true
    }
    let ops3 = {
      where: {
        aresult: 0
      },
      attributes: [
          [fn('count',col('aid')),'emnopass']
      ],
      raw: true
    }
    let pass = await app.model.Audition.findAll(ops);
    let nopass = await app.model.Audition.findAll(ops1);
    let empass = await app.model.Audition.findAll(ops2);
    let emnopass = await app.model.Audition.findAll(ops3);
    let data = {
      pass: pass[0].pass,
      nopass: nopass[0].nopass,
      empass: empass[0].empass,
      emnopass: emnopass[0].emnopass

    }
    return data;
  }
}

module.exports = AuditionService;
