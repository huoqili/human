module.exports = app => {
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Staff = app.model.define('Staff', {
        sid: {type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        sname: {type: STRING, allowNull:false},
        did: {type: INTEGER, allowNull:false},
        pid: {type: INTEGER, allowNull:false},
        phone:{type: STRING(20),allowNull:false,unique:true},
        email:{type: STRING,allowNull:false,unique:true},
        snumber:{type: STRING,allowNull:false,unique:true},
        sinduction:{type: DATE,allowNull:false},
        ssex: {type: INTEGER(1),allowNull:false},
        spolitical: {type: INTEGER(1),allowNull:false},
        seducation: {type: INTEGER(1),allowNull:false},
        school: {type: STRING, allowNull:false},
        smajor: {type: STRING, allowNull:false},
        sgraduation:{type: DATE,allowNull:false}
    },{
        tableName:'staff',
        timestamps: false
    });

    Staff.associate = function() {
        app.model.Staff.belongsTo(app.model.Position, {
            as: 'position',
            foreignKey: 'pid',
            targetKey: 'pid'
        })
        app.model.Staff.belongsTo(app.model.Department, {
            as: 'department',
            foreignKey: 'did',
            targetKey: 'did'
        })
    }

    return Staff;
}