module.exports = app => {
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Businesstravel = app.model.define('businesstravel', {
        btid: {type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        did: {type: INTEGER, allowNull:false},
        pid: {type: INTEGER, allowNull:false},
        sid: {type: INTEGER, allowNull:false},
        btdata:{type: DATE,allowNull:false},
        btstart:{type: DATE,allowNull:false},
        btend:{type: DATE,allowNull:false},
        btdays:{type:STRING(20),allowNull:false},
        btreason: {type: STRING, allowNull:false},
        // btprovince:{type:STRING(10),allowNull:false},
        // btcity:{type:STRING(10),allowNull:false},
        // btcounty:{type:STRING(10),allowNull:false},
        btaddress:{type:STRING,allowNull:false},
        btremarks: {type: STRING, allowNull:false},
        btcheck:{type:INTEGER(1),allowNull:false,defaultValue:0}
    },{
        tableName:'businesstravel',
        timestamps: false
    });

    Businesstravel.associate = function() {
        app.model.Businesstravel.belongsTo(app.model.Position, {
            as: 'position',
            foreignKey: 'pid',
            targetKey: 'pid'
        })
        app.model.Businesstravel.belongsTo(app.model.Department, {
            as: 'department',
            foreignKey: 'did',
            targetKey: 'did'
        })
        app.model.Businesstravel.belongsTo(app.model.Staff, {
            as: 'staff',
            foreignKey: 'sid',
            targetKey: 'sid'
        })
    }

    return Businesstravel;
}