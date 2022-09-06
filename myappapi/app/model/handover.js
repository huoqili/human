module.exports = app =>{
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Handover = app.model.define('Handover',{
        hid:{type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        sname:{type: STRING, allowNull:false},
        snumber:{type: STRING,allowNull:false,unique:true},
        pid:{type: INTEGER, allowNull:false},
        did:{type: INTEGER, allowNull:false},
        sinduction:{type: DATE,allowNull:false},
        qapplication:{type: DATE,allowNull:false},
        hactual:{type: DATE,allowNull:false},
        hwork:{type: INTEGER(1),allowNull:false},
        hstate:{type: INTEGER(1),allowNull:false},
        hperson:{type: STRING, allowNull:false},
        htime:{type: DATE,allowNull:false},
    },{
        tableName:'handover',
        timestamps: false
    })
    Handover.associate = function() {
        app.model.Handover.belongsTo(app.model.Position, {
            as: 'position',
            foreignKey: 'pid',
            targetKey: 'pid'
        })
        app.model.Handover.belongsTo(app.model.Department, {
            as: 'department',
            foreignKey: 'did',
            targetKey: 'did'
        })
    }
    return Handover
}