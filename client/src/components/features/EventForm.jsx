import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import axios from 'axios';

const EventForm = ({ onEventAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        amount: '',
        isRecurring: false,
        frequency: 'once'
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:3001/api/events', formData);
            onEventAdded();
            setFormData({
                name: '',
                date: '',
                amount: '',
                isRecurring: false,
                frequency: 'once'
            });
        } catch (error) {
            console.error('Error adding event:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Plan Future Expense" className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Event Name"
                    name="name"
                    placeholder="e.g. Summer Vacation"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Estimated Amount (₹)"
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isRecurring"
                        id="isRecurring"
                        checked={formData.isRecurring}
                        onChange={handleChange}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="isRecurring" className="text-sm text-slate-700">Recurring Event?</label>
                </div>
                {formData.isRecurring && (
                    <Select
                        label="Frequency"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                    >
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </Select>
                )}
                <Button type="submit" className="w-full" variant="secondary" disabled={loading}>
                    Add to Plan
                </Button>
            </form>
        </Card>
    );
};

export default EventForm;
