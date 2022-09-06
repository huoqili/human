'use strict';

const Service = require('egg').Service;

class LeaveaskService extends Service {
    async create(data) {
        let { app } = this;
        let result = await app.model.Leaveask.create(data);
        return result;
    }
    async findAndCountAll(options){
        let result = await this.app.model.Leaveask.findAndCountAll(options);
        return result;
    }
    async updateOne(alid,data){
        let { app } = this;
        let result = await app.model.Leaveask.update(data,{where:{alid}});
        return result;
    }
    async findOne(alid){
        let { app } = this;
        let result = await app.model.Leaveask.findOne({where:{alid},
            include:[
                {
                    model:app.model.Department,
                    as:'department',
                    attributes:['dname']
                },
                {
                    model:app.model.Position,
                    as:'position',
                    attributes:['pname']
                },
                {
                    model:app.model.Staff,
                    as:'staff',
                    attributes:['sname']
                }
            ],
            raw:true
            }
        );
        return result;
    }
}

module.exports = LeaveaskService;
