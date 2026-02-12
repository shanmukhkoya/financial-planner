const sequelize = require('./config/database');
const Transaction = require('./models/Transaction');
const Debt = require('./models/Debt');
const Budget = require('./models/Budget');
const PlannedEvent = require('./models/PlannedEvent');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true });

        // 1. Initial Balance (Savings)
        // Assume user had some savings but is now bleeding money
        // Or we just start with this month's transactions

        const today = new Date().toISOString().split('T')[0];

        // 2. Income: ₹90,000
        await Transaction.create({
            date: today.substring(0, 8) + '01', // 1st of month
            amount: 90000,
            type: 'income',
            category: 'Salary',
            description: 'Monthly Salary'
        });

        // 3. Expenses: ₹1,20,000 (Deficit of 30k)
        const expenses = [
            { cat: 'Rent', amt: 25000, desc: 'House Rent' },
            { cat: 'EMI', amt: 35000, desc: 'Home Loan EMI' },
            { cat: 'Food', amt: 15000, desc: 'Groceries & Dining' },
            { cat: 'Utilities', amt: 5000, desc: 'Electricity, Internet' },
            { cat: 'Transport', amt: 8000, desc: 'Fuel & Cab' },
            { cat: 'Shopping', amt: 12000, desc: 'Clothes & Accessories' },
            { cat: 'Entertainment', amt: 10000, desc: 'Movies & Outings' },
            { cat: 'Misc', amt: 10000, desc: 'Unhappy unplanned expenses' }
        ];

        for (const exp of expenses) {
            await Transaction.create({
                date: today,
                amount: exp.amt,
                type: 'expense',
                category: exp.cat,
                description: exp.desc
            });
        }

        // 4. Debts: Why are they in deficit?
        await Debt.create({
            name: 'Home Loan',
            totalAmount: 5000000,
            remainingAmount: 4800000,
            interestRate: 8.5,
            minimumPayment: 35000
        });

        await Debt.create({
            name: 'Credit Card',
            totalAmount: 200000,
            remainingAmount: 150000,
            interestRate: 36, // High interest!
            minimumPayment: 8000
        });

        // 5. Budgets (to trigger alerts)
        await Budget.create({ category: 'Food', limit: 10000 }); // Spending 15k
        await Budget.create({ category: 'Shopping', limit: 5000 }); // Spending 12k
        await Budget.create({ category: 'Entertainment', limit: 2000 }); // Spending 10k!

        // 6. Future Plans (Scary forecast)
        // Next month school fees
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        await PlannedEvent.create({
            name: 'School Fees',
            date: nextMonth.toISOString().split('T')[0],
            amount: 45000,
            isRecurring: false,
            frequency: 'once'
        });

        console.log('Demo data seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
