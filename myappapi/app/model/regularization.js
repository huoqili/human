module.exports=app=>{
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Regularization=app.model.define('Regularization',{
        rid:{type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        did: {type: INTEGER, allowNull:false},
        pid: {type: INTEGER, allowNull:false},

        sid: {type: INTEGER, allowNull:false},
        applydate:{type:DATE,allowNull:false},
        result:{type:STRING,allowNull:false},
        appraise:{type:STRING,allowNull:false},
        plan:{type:STRING,allowNull:false},
        forwork: {type: INTEGER(1),allowNull:false},
        forpeople: {type: INTEGER(1),allowNull:false},
        forstrength: {type: INTEGER(1),allowNull:false},
        forworkload: {type: INTEGER(1),allowNull:false},
        forenvironment: {type: INTEGER(1),allowNull:false},
        forpay: {type: INTEGER(1),allowNull:false},
    },{
        tableName:'regularization',
        timestamps: false
    })
    Regularization.associate=function(){
        app.model.Regularization.belongsTo(app.model.Staff,{
            as:'staff',
            foreignKey:'sid',
            targetKey:'sid'
        }),
        app.model.Regularization.belongsTo(app.model.Department,{
            as:'department',
            foreignKey:'did',
            targetKey:'did'
        }),
        app.model.Regularization.belongsTo(app.model.Position,{
            as:'position',
            foreignKey:'pid',
            targetKey:'pid'
        })
    }
    return Regularization
}