module.exports = app => {
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Audition = app.model.define('Audition', {
        aid: {type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        times:{type: DATE,allowNull:false},
        aname: {type: STRING, allowNull:false},
        rid: {type: INTEGER(11),allowNull:false},
        aphone:{type: STRING(20),allowNull:false,unique:true},
        resume: {type: STRING, allowNull:false},
        rqualified: {type: INTEGER(1)},
        rfeedback: {type: STRING},
        atimes:{type: DATE},
        aresult:{type: INTEGER(1)},
        emresult:{type: INTEGER(1)},
        cevaluate: {type: STRING},
        emfeedback: {type: STRING}
    },{
        tableName: 'audition',
        timestamps: false
    })
    Audition.associate = function() {
        app.model.Audition.belongsTo(app.model.Recruit, {
            as: 'recruit',
            foreignKey: 'rid',
            targetKey: 'rid'
        })
    }
    return Audition;
}