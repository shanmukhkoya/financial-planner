import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../ui/Card';
import TransactionForm from './TransactionForm';
import EventForm from './EventForm';
import ForecastChart from './ForecastChart';
import DebtList from './DebtList';

const Dashboard = () => {
    const [data, setData] = useState({
        currentBalance: 0,
        avgMonthlyIncome: 0,
        avgMonthlyExpense: 0,
        forecast: []
    });
    const [transactions, setTransactions] = useState([]);
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [forecastRes, transactionsRes, insightsRes] = await Promise.all([
                axios.get('http://localhost:3001/api/forecast'),
                axios.get('http://localhost:3001/api/transactions'),
                axios.get('http://localhost:3001/api/insights')
            ]);

            setData(forecastRes.data);
            setTransactions(transactionsRes.data);
            setInsights(insightsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div className="p-8 text-center text-slate-500">Loading financial data...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Header & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
                    <p className="text-slate-400 text-sm font-medium">Current Balance</p>
                    <h2 className="text-3xl font-bold mt-2">₹{data.currentBalance.toFixed(2)}</h2>
                    <div className="mt-4 flex gap-2">
                        <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-emerald-400">
                            +₹{Math.round(data.avgMonthlyIncome)}/mo
                        </span>
                        <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-red-400">
                            -₹{Math.round(data.avgMonthlyExpense)}/mo
                        </span>
                    </div>
                </Card>

                {/* Insights Section */}
                <div className="md:col-span-2 space-y-4">
                    {insights.map((insight, idx) => (
                        <div
                            key={idx}
                            className={`p-4 rounded-xl border flex items-start gap-3 ${insight.type === 'danger' ? 'bg-red-50 border-red-100 text-red-700' :
                                insight.type === 'warning' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                                    'bg-emerald-50 border-emerald-100 text-emerald-700'
                                }`}
                        >
                            <div className="flex-1">
                                <p className="font-medium">{insight.message}</p>
                            </div>
                        </div>
                    ))}
                    {insights.length === 0 && (
                        <div className="p-4 rounded-xl border border-slate-200 bg-white text-slate-600">
                            <p>No actionable insights yet. Start adding more transactions!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Forecast & Transactions */}
                <div className="lg:col-span-2 space-y-6">
                    <ForecastChart data={data.forecast} />

                    <Card title="Recent Transactions">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Decription</th>
                                        <th className="px-4 py-3">Category</th>
                                        <th className="px-4 py-3 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.slice(0, 5).map((t) => (
                                        <tr key={t.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                                            <td className="px-4 py-3 text-slate-500">{t.date}</td>
                                            <td className="px-4 py-3 font-medium text-slate-900">{t.description || '-'}</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
                                                    {t.category}
                                                </span>
                                            </td>
                                            <td className={`px-4 py-3 text-right font-medium ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                                                }`}>
                                                {t.type === 'income' ? '+' : '-'}₹{t.amount}
                                            </td>
                                        </tr>
                                    ))}
                                    {transactions.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-8 text-center text-slate-400">
                                                No transactions yet. Add one to see it here!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Add Transaction & Debts */}
                <div className="space-y-6">
                    <TransactionForm onTransactionAdded={fetchData} />
                    <EventForm onEventAdded={fetchData} />
                    <DebtList />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
