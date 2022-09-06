'use strict';

const Service = require('egg').Service;

class PositionService extends Service {
  async findAll() {
    let { app } = this;
    let result = await app.model.Position.findAll({
        include: [
            {
                model:app.model.Department,
                as: 'department',
                attributes: ['dnum','dname']
            }
            
        ]
        
    });
    
    return result;
  }

  async findPositionList(did) {
    let { app } = this;
    let result = await app.model.Position.findAll({where: {did}});
    return result;
  }
  async findNamesList(pid) {
    let { app } = this;
    let ops = {
      where: {
        pid
      },
      include: [
        {
          model: app.model.Staff,
          as: 'staff',
          attributes: ['sname']
        }
      ]
    }
    let result = await app.model.Position.findOne(ops);
    
    return result;
  }
  async findpositionAll() {
    let { app } = this;
    let result = await app.model.Position.findAll();
    return result; 
}
}

module.exports = PositionService;
