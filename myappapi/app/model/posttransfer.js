module.exports = app => {
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Posttransfer = app.model.define('Posttransfer', {
        ptid: {type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        sname: {type: STRING, allowNull:false},
        did: {type: INTEGER, allowNull:false},
        pid: {type: INTEGER, allowNull:false},
        newdid: {type: INTEGER, allowNull:false},
        newpid: {type: INTEGER, allowNull:false},
        snumber:{type: STRING,allowNull:false,unique:true},
        sinduction:{type: DATE,allowNull:false},
        sinduction:{type: DATE,allowNull:false},
        filingdate:{type: DATE,allowNull:false},
        ptreason:{type: STRING,allowNull:false},
        ptstate:{type:INTEGER ,allowNull:false,defaultValue:0}
    },{
        tableName:'posttransfer',
        timestamps: false
    });

    Posttransfer.associate = function() {
        app.model.Posttransfer.belongsTo(app.model.Position, {
            as: 'position',
            foreignKey: 'pid',
            targetKey: 'pid'
        })
        app.model.Posttransfer.belongsTo(app.model.Department, {
            as: 'department',
            foreignKey: 'did',
            targetKey: 'did'
        })
        app.model.Posttransfer.belongsTo(app.model.Position, {
            as: 'newposition',
            foreignKey: 'newpid',
            targetKey: 'pid'
        })
        app.model.Posttransfer.belongsTo(app.model.Department, {
            as: 'newdepartment',
            foreignKey: 'newdid',
            targetKey: 'did'
        })
    }

    return Posttransfer;
}