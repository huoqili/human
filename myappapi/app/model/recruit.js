module.exports = app => {
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Recruit = app.model.define('Recruit', {
        rid: {type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        did: {type: INTEGER, allowNull:false},
        pid: {type: INTEGER, allowNull:false},
        rname: {type: STRING, allowNull:false},
        rnum: {type: INTEGER, allowNull: false},
        rsalayarea:{type: STRING, allowNull:false},
        rreason: {type: STRING, allowNull:false},
        rduty: {type: STRING, allowNull:false},
        rcondition: {type: STRING, allowNull:false},
        urgent: {type: INTEGER(1), allowNull: false},
        rtimes: {type: DATE,allowNull:false},
        arrive: {type: DATE,allowNull:false}
    },{
        tableName: 'recruit',
        timestamps: false
    })
    Recruit.associate = function() {
        app.model.Recruit.belongsTo(app.model.Position, {
            as: 'position',
            foreignKey: 'pid',
            targetKey: 'pid'
        })
        app.model.Recruit.belongsTo(app.model.Department, {
            as: 'department',
            foreignKey: 'did',
            targetKey: 'did'
        })
    }
    return Recruit
}