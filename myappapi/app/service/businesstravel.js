'use strict';

const Service = require('egg').Service;

class BusinesstravelService extends Service {
    async create(data) {
        let { app } = this;
        let result = await app.model.Businesstravel.create(data);
        return result;
    }
    async findAndCountAll(options){
        let result = await this.app.model.Businesstravel.findAndCountAll(options);
        return result;
    }
    async updateOne(btid,data){
        let { app } = this;
        let result = await app.model.Businesstravel.update(data,{where:{btid}});
        return result;
    }
    async findOne(btid){
        let { app } = this;
        let result = await app.model.Businesstravel.findOne({where:{btid},
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

module.exports = BusinesstravelService;
