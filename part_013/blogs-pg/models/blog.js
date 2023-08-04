const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db');

class Blog extends Model { }
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING(255),
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            customValidator(value) {
                if (value === undefined || value === null || value < 1991 || value > new Date().getFullYear()) {
                    throw new Error(`year can't be null, less than 1991, or greater than current year ${new Date().getFullYear()}`);
                }
            }
        }
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog'
})

module.exports = Blog