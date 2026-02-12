const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.findAll({ order: [['date', 'DESC']] });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a transaction
router.post('/', async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.json(transaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
    try {
        await Transaction.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
