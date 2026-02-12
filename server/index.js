const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Transaction = require('./models/Transaction');
const Debt = require('./models/Debt');
const PlannedEvent = require('./models/PlannedEvent');
const Budget = require('./models/Budget');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/debts', require('./routes/debts'));
app.use('/api/events', require('./routes/events'));
app.use('/api/forecast', require('./routes/forecast'));
app.use('/api/insights', require('./routes/insights'));

// Sync Database
sequelize.sync({ force: false }) // Set force: true to reset DB on restart
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

app.get('/', (req, res) => {
    res.send('Financial Planner API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
