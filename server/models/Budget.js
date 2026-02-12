const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Budget = sequelize.define('Budget', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    limit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = Budget;
