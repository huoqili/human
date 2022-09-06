module.exports = app => {
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Induction = app.model.define('Induction', {
        inid: {type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
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
        snation: {type: STRING, allowNull:false},
        documenttype: {type: STRING, allowNull:false}, 
        documentphone: {type: STRING, allowNull:false}, 
        address: {type: STRING, allowNull:false}, 
        smarriage: {type: STRING, allowNull:false},
        socialsecurity: {type: STRING, allowNull:false}, 
        saccumulationfund: {type: STRING, allowNull:false},
        smajor: {type: STRING, allowNull:false},
        sgraduation:{type: DATE,allowNull:false},
        backcardnum:{type: STRING, allowNull:false},
        back:{type: STRING, allowNull:false},
        linkman:{type: STRING, allowNull:false},
        relation:{type: STRING, allowNull:false},
        linkmanphone:{type: STRING, allowNull:false},
        instate:{type:INTEGER ,allowNull:false,defaultValue:0}
    },{
        tableName:'induction',
        timestamps: false
    });
    Induction.associate = function() {
        app.model.Induction.belongsTo(app.model.Position, {
            as: 'position',
            foreignKey: 'pid',
            targetKey: 'pid'
        })
        app.model.Induction.belongsTo(app.model.Department, {
            as: 'department',
            foreignKey: 'did',
            targetKey: 'did'
        })

    
    }
    return Induction;
}
