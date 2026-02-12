import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import axios from 'axios';

const DebtForm = ({ onDebtAdded, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        totalAmount: '',
        remainingAmount: '',
        interestRate: '',
        minimumPayment: ''
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
            // If remaining amount is not set, default to total amount
            const data = {
                ...formData,
                remainingAmount: formData.remainingAmount || formData.totalAmount
            };
            await axios.post('http://localhost:3001/api/debts', data);
            onDebtAdded();
            setFormData({
                name: '',
                totalAmount: '',
                remainingAmount: '',
                interestRate: '',
                minimumPayment: ''
            });
        } catch (error) {
            console.error('Error adding debt:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Add New Debt" className="mt-4 border-l-4 border-l-indigo-500">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Debt Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Total Amount (₹)"
                        type="number"
                        name="totalAmount"
                        value={formData.totalAmount}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Interest Rate (%)"
                        type="number"
                        name="interestRate"
                        value={formData.interestRate}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" disabled={loading}>Save Debt</Button>
                </div>
            </form>
        </Card>
    );
};

export default DebtForm;
