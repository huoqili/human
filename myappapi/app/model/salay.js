module.exports = app => {
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Salay = app.model.define('Salay', {
        sid: {type: INTEGER(11).UNSIGNED,autoIncrement:true,primaryKey: true},
        sname: {type: STRING, allowNull:false},
        sphone:{type: STRING(20),allowNull:false,unique:true},
        pid: {type: INTEGER, allowNull:false},
        sbasicsalay: {type:INTEGER(10),allowNull:false},
        sovertimesalay: {type:INTEGER(10),allowNull:false},
        sprizesalay: {type:INTEGER(10),allowNull:false},
        ssubsidysalay: {type:INTEGER(10),allowNull:false},
        attendancesalay: {type:INTEGER(10),allowNull:false},
        fivesalay: {type:INTEGER(10),allowNull:false},
        taxsalay: {type:INTEGER(10),allowNull:false},
        factsalay: {type:INTEGER(10),allowNull:false},
        ssure: {type:INTEGER(1),defaultValue:0},
        stime:{type: DATE,allowNull:false}
    }, {
        tableName: 'salay',
        timestamps: false
    });
    Salay.associate = function() {
        app.model.Salay.belongsTo(app.model.Position, {
            as: 'position',
            foreignKey: 'pid',
            targetKey: 'pid'
        })
    }

    return Salay;
}