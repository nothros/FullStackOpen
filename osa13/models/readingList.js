const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingList extends Model{}
ReadingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: null
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
      },
      readed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readingList'
})

module.exports = ReadingList