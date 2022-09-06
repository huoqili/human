'use strict';

const Service = require('egg').Service;

class SalayService extends Service {
  async index() {
    
  }

  async findAndCountAll(options) {
    let { app } = this;
    let result = await app.model.Salay.findAndCountAll(options);
    return result;
  }

  async createOne(data) {
    let { app } = this;
    let result = await app.model.Salay.create(data);
    return result;
  }

  async everyTypeSum() {
    let { app } = this;
    let { Op } = app.Sequelize;
    let { Sequelize } = app;
    let ops = {
        attributes: [
          [Sequelize.fn('SUM',Sequelize.col('sbasicsalay')), 'sbasicsalay'],
          [Sequelize.fn('SUM',Sequelize.col('sovertimesalay')), 'sovertimesalay'],
          [Sequelize.fn('SUM',Sequelize.col('sprizesalay')), 'sprizesalay'],
          [Sequelize.fn('SUM',Sequelize.col('ssubsidysalay')), 'ssubsidysalay'],
          [Sequelize.fn('SUM',Sequelize.col('attendancesalay')), 'attendancesalay'],
          [Sequelize.fn('SUM',Sequelize.col('fivesalay')), 'fivesalay'],
          [Sequelize.fn('SUM',Sequelize.col('taxsalay')), 'taxsalay'],
          [Sequelize.fn('SUM',Sequelize.col('factsalay')), 'factsalay']
        ]
    };
    let result = await app.model.Salay.findAll(ops);
    return result;
  }

  async findOne(sid) {
    let { app } = this;
    let ops = {
      where: {sid},
      include: [
        {
          model: app.model.Position,
          as: 'position',
          attributes: ['pname'] 
        }
      ],
      raw: true
    }
    let result = await app.model.Salay.findOne(ops);
    return result;
  }

  async updateOne(sid,dataObj) {
    let { app } = this;
    let result = await app.model.Salay.update(dataObj, {
      where: {sid}
    });
    return result;
  }
}

module.exports = SalayService;
