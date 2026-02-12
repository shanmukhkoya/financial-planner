const sequelize = require('./config/database');
const Transaction = require('./models/Transaction');
const Debt = require('./models/Debt');
const Budget = require('./models/Budget');
const PlannedEvent = require('./models/PlannedEvent');

const clearData = async () => {
    try {
        await sequelize.sync({ force: true }); // This drops and recreates tables, effectively clearing them
        console.log('All data cleared successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error clearing data:', err);
        process.exit(1);
    }
};

clearData();
