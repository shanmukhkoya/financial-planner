const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Transaction = require('../models/Transaction');
const PlannedEvent = require('../models/PlannedEvent');
const { addMonths, startOfMonth, endOfMonth, format } = require('date-fns');

router.get('/', async (req, res) => {
    try {
        // 1. Calculate current balance
        const transactions = await Transaction.findAll();
        let currentBalance = 0;

        // Simple average calculation
        let totalIncome = 0;
        let totalExpense = 0;
        const monthsSet = new Set();

        transactions.forEach(t => {
            if (t.type === 'income') {
                currentBalance += t.amount;
                totalIncome += t.amount;
            } else {
                currentBalance -= t.amount;
                totalExpense += t.amount;
            }
            monthsSet.add(t.date.substring(0, 7)); // YYYY-MM
        });

        const monthsCount = monthsSet.size || 1;
        const avgMonthlyIncome = totalIncome / monthsCount;
        const avgMonthlyExpense = totalExpense / monthsCount;
        const netMonthlyFlow = avgMonthlyIncome - avgMonthlyExpense;

        // 2. Get future events
        const today = new Date();
        const futureEvents = await PlannedEvent.findAll({
            where: {
                date: { [Op.gte]: today }
            }
        });

        // 3. Generate forecast for next 6 months
        const forecast = [];
        let runningBalance = currentBalance;

        for (let i = 0; i < 6; i++) {
            const forecastDate = addMonths(today, i);
            const monthStr = format(forecastDate, 'MMM yyyy');

            // Add net flow
            runningBalance += netMonthlyFlow;

            // Subtract specific planned events for this month
            const monthEvents = futureEvents.filter(e => {
                const eDate = new Date(e.date);
                return eDate.getMonth() === forecastDate.getMonth() && eDate.getFullYear() === forecastDate.getFullYear();
            });

            monthEvents.forEach(e => {
                runningBalance -= e.amount;
            });

            forecast.push({
                month: monthStr,
                balance: Math.round(runningBalance * 100) / 100,
                events: monthEvents.map(e => e.name)
            });
        }

        res.json({ currentBalance, avgMonthlyIncome, avgMonthlyExpense, forecast });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
