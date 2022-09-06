module.exports = app => {
    let { INTEGER,STRING } = app.Sequelize;
    const Admin = app.model.define('Admin', {
        id: {type: INTEGER.UNSIGNED,autoIncrement:true,primaryKey: true},
        username: {type: STRING(11), allowNull:false},
        password: {type: STRING,allowNull: false}
    }, {
        tableName:'admin',
        timestamps: false
    });
    return Admin;
}