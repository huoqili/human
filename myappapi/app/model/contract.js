module.exports=app=>{
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Contract=app.model.define('Contract',{
        cid:{type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        ctype:{type:INTEGER(1),allowNull:false},
        cname:{type:STRING,allowNull:false},
        start:{type:DATE,allowNull:false},
        end:{type:DATE,allowNull:false},
        try:{type:INTEGER(11),allowNull:false},
        Aparty:{type:STRING,allowNull:false},
        // Bparty:{type:STRING,allowNull:false},
        sid: {type: INTEGER, allowNull:false},
    },{
        tableName:'contract',
        timestamps: false
    })
    Contract.associate=function(){
        app.model.Contract.belongsTo(app.model.Staff,{
            as:'staff',
            foreignKey: 'sid',
            targetKey: 'sid'
        })
    }
    return Contract
}