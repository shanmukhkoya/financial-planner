const express = require('express');
const router = express.Router();
const PlannedEvent = require('../models/PlannedEvent');

// Get all planned events
router.get('/', async (req, res) => {
    try {
        const events = await PlannedEvent.findAll({ order: [['date', 'ASC']] });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add an event
router.post('/', async (req, res) => {
    try {
        const event = await PlannedEvent.create(req.body);
        res.json(event);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        await PlannedEvent.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
