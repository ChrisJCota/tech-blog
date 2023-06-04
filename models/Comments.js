const { Model, DataTypes } = require('sequalize');
const sequelize = require('../config/connections');

class Comments extends Model { }

Comments.init({
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_created: {
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