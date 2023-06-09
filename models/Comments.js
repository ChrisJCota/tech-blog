const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model { }

Comments.init({
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
});

module.exports = Comments;