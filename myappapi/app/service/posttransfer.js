'use strict';

const Service = require('egg').Service;

class PosttransferService extends Service {
  async create(data) {
    const { app } = this;
    const result = await app.model.Posttransfer.create(data);
    return result;
  }

  async findOne(ptid) {
    const { app } = this;
    const result = await app.model.Posttransfer.findOne({ where: { ptid } });
    return result;
  }

  async findAndCountAll(options) {
    const { app } = this;
    const result = await app.model.Posttransfer.findAndCountAll(options);
    return result;
  }

  async deleteOne(ptid) {
    const { app } = this;
    const result = await app.model.Posttransfer.destroy({ where: { ptid } });
    return result;
  }

  async updateOne(data, ptid) {

    const { app } = this;
    const result = await app.model.Posttransfer.update(data, { where: { ptid } });
    return result;
  }
}

module.exports = PosttransferService;
