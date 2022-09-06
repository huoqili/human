module.exports = app => {
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Leaveask = app.model.define('Leaveask', {
        alid: {type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        did: {type: INTEGER, allowNull:false},
        pid: {type: INTEGER, allowNull:false},
        sid: {type: INTEGER, allowNull:false},
        aldata:{type: DATE,allowNull:false},
        altype: {type: INTEGER(1),allowNull:false},
        alreason: {type: STRING, allowNull:false},
        alstart:{type: DATE,allowNull:false},
        alend:{type: DATE,allowNull:false},
        aldays:{type:STRING(20),allowNull:false},
        alcheck:{type:INTEGER(1),allowNull:false,defaultValue:0}
    },{
        tableName:'leaveask',
        timestamps: false
    });

    Leaveask.associate = function() {
        app.model.Leaveask.belongsTo(app.model.Position, {
            as: 'position',
            foreignKey: 'pid',
            targetKey: 'pid'
        })
        app.model.Leaveask.belongsTo(app.model.Department, {
            as: 'department',
            foreignKey: 'did',
            targetKey: 'did'
        })
        app.model.Leaveask.belongsTo(app.model.Staff, {
            as: 'staff',
            foreignKey: 'sid',
            targetKey: 'sid'
        })
    }

    return Leaveask;
}