const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Session extends Model{}
Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: null
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'session'
})

module.exports = Session