const express = require('express');
const router = express.Router();
const Debt = require('../models/Debt');

// Get all debts
router.get('/', async (req, res) => {
    try {
        const debts = await Debt.findAll();
        res.json(debts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a debt
router.post('/', async (req, res) => {
    try {
        const debt = await Debt.create(req.body);
        res.json(debt);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a debt (e.g. payment made)
router.put('/:id', async (req, res) => {
    try {
        const debt = await Debt.findByPk(req.params.id);
        if (debt) {
            await debt.update(req.body);
            res.json(debt);
        } else {
            res.status(404).json({ error: 'Debt not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a debt
router.delete('/:id', async (req, res) => {
    try {
        await Debt.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Debt deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
