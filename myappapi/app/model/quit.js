module.exports = app =>{
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Quit = app.model.define('Quit',{
        qid:{type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        qname: {type: STRING, allowNull:false},
        qapplication:{type: DATE,allowNull:false},
        qnumber:{type: STRING,allowNull:false,unique:true},
        did: {type: INTEGER, allowNull:false},
        qinduction:{type: DATE,allowNull:false},
        qlasttime:{type: DATE,allowNull:false},
        qreason:{type: INTEGER(1),allowNull:false},
        qnote:{type: STRING, allowNull:false}
    },{
        tableName:'quit',
        timestamps: false
    });
    Quit.associate = function() {
        app.model.Quit.belongsTo(app.model.Department, {
            as: 'department',
            foreignKey: 'did',
            targetKey: 'did'
        })
    }
    return Quit;
}