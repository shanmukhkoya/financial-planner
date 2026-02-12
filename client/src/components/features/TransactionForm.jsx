import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import axios from 'axios';

const TransactionForm = ({ onTransactionAdded }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        type: 'expense',
        category: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:3001/api/transactions', formData);
            onTransactionAdded();
            setFormData({
                date: new Date().toISOString().split('T')[0],
                amount: '',
                type: 'expense',
                category: '',
                description: ''
            });
        } catch (error) {
            console.error('Error adding transaction:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Add Transaction">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        label="Amount (₹)"
                        type="number"
                        step="0.01"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Select
                        label="Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </Select>
                    <Input
                        label="Category"
                        name="category"
                        placeholder="e.g. Food, Rent"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Input
                    label="Description"
                    name="description"
                    placeholder="Optional notes"
                    value={formData.description}
                    onChange={handleChange}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Transaction'}
                </Button>
            </form>
        </Card>
    );
};

export default TransactionForm;
