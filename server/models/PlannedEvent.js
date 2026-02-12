const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlannedEvent = sequelize.define('PlannedEvent', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    isRecurring: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    frequency: {
        type: DataTypes.ENUM('monthly', 'yearly', 'once'),
        defaultValue: 'once',
    },
});

module.exports = PlannedEvent;
