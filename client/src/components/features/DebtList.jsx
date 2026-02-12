import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../ui/Card';
import Button from '../ui/Button';
import DebtForm from './DebtForm';

const DebtList = () => {
    const [debts, setDebts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchDebts = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/debts');
            setDebts(res.data);
        } catch (error) {
            console.error('Error fetching debts:', error);
        }
    };

    useEffect(() => {
        fetchDebts();
    }, []);

    return (
        <Card title="My Debts">
            {debts.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">No debts recorded.</p>
            ) : (
                <div className="space-y-4">
                    {debts.map(debt => (
                        <div key={debt.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-medium text-slate-900">{debt.name}</h4>
                                    <p className="text-xs text-slate-500">{debt.interestRate}% Interest</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900">₹{debt.remainingAmount}</p>
                                    <p className="text-xs text-slate-500">of ₹{debt.totalAmount}</p>
                                </div>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2">
                                <div
                                    className="bg-indigo-500 h-1.5 rounded-full"
                                    style={{ width: `${(1 - debt.remainingAmount / debt.totalAmount) * 100}%` }}
                                ></div>
                            </div>
                            <div className="text-right">
                                <Button variant="ghost" className="text-xs py-1 px-2 h-auto">Pay Off</Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm ? (
                <DebtForm onDebtAdded={() => { fetchDebts(); setShowForm(false); }} onCancel={() => setShowForm(false)} />
            ) : (
                <Button variant="secondary" className="w-full mt-4 text-sm" onClick={() => setShowForm(true)}>Add New Debt</Button>
            )}
        </Card>
    );
};

export default DebtList;
