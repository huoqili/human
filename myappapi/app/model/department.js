module.exports = app => {
    let { STRING,INTEGER } = app.Sequelize;
    let Department = app.model.define('Department', {
        did: {type:INTEGER(11).UNSIGNED,autoIncrement: true,primaryKey: true},
        dnum: { type: STRING(20),allowNull: false,uniqueKey: true},
        dname: { type: STRING(10),allowNull: false,uniqueKey: true}
    }, {
        tableName: 'department',
        timestamps: false
    })
    Department.associate = function() {
        app.model.Department.hasMany(app.model.Position, {
            as: 'position',
            foreignKey: 'did',
            targetKey:'did'
        })
    }
    return Department;
 }