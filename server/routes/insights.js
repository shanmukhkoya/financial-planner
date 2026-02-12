const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

router.get('/', async (req, res) => {
    try {
        const insights = [];

        // 1. Check spending vs budget
        const budgets = await Budget.findAll();
        const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM

        for (const budget of budgets) {
            // Find expenses for this category in current month
            // Note: This matches string date YYYY-MM-DD
            const expenses = await Transaction.findAll({
                where: {
                    category: budget.category,
                    type: 'expense',
                    date: { [Op && Op.like || 'like']: `${currentMonth}%` } // SQLite like
                }
            });

            const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);

            if (totalSpent > budget.limit) {
                insights.push({
                    type: 'danger',
                    message: `You have exceeded your ${budget.category} budget by ₹${(totalSpent - budget.limit).toFixed(2)}!`
                });
            } else if (totalSpent > budget.limit * 0.8) {
                insights.push({
                    type: 'warning',
                    message: `Caution: You have used ${((totalSpent / budget.limit) * 100).toFixed(0)}% of your ${budget.category} budget.`
                });
            }
        }

        // 2. General savings tip
        // (Simple logic: if no specific insights, encourage saving)
        if (insights.length === 0) {
            insights.push({
                type: 'success',
                message: 'You are staying within your budgets! Consider allocating surplus to standard savings.'
            });
        }

        res.json(insights);
    } catch (err) {
        // Fallback for Op.like issue in simple setup
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
