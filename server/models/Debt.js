const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Debt = sequelize.define('Debt', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    remainingAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    interestRate: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    minimumPayment: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
});

module.exports = Debt;
