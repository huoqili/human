module.exports = app => {
    let { STRING,INTEGER } = app.Sequelize;
    let Position = app.model.define('Position', {
        pid: {type:INTEGER(11).UNSIGNED,autoIncrement: true,primaryKey: true},
        pname: { type: STRING,allowNull: false},
        did:{type:INTEGER(11).UNSIGNED,allowNull: false}
    }, {
        tableName: 'position',
        timestamps: false
    })
    Position.associate = function() {
        app.model.Position.belongsTo(app.model.Department, {
            as:'department',
            foreignKey: 'did',
            targetKey: 'did'
        })
        app.model.Position.hasMany(app.model.Staff, {
            as:'staff',
            foreignKey: 'pid',
            targetKey: 'pid'
        })
    }
    return Position;
 }