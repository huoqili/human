module.exports = app => {
    let { INTEGER,STRING,DATE } = app.Sequelize;
    const Salayback = app.model.define('Salayback', {
        fid: {type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        sname: {type: STRING, allowNull:false},
        snumber:{type: STRING,allowNull:false,unique:true},
        freason: {type: STRING, allowNull:false},
        ftimes: {type: DATE,allowNull:false},
        fstate: {type: INTEGER(1),allowNull:false, defaultValue: 0}
    }, {
        tableName: 'salayback',
        timestamps: false
    })
    return Salayback;
}