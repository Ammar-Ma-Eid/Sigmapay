import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBudgetOverview, getCategoryBudgets, addExpense, getExpenses } from '../utils/budget';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

function Budget() {
    const [overview, setOverview] = useState(getBudgetOverview());
    const [categories, setCategories] = useState(getCategoryBudgets());
    const [expenses, setExpenses] = useState(getExpenses());
    const [newExpense, setNewExpense] = useState({ category: '', amount: 0, description: '' });
    const [alerts, setAlerts] = useState([]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const handleAddExpense = () => {
        addExpense(newExpense);
        setExpenses(getExpenses());
        setOverview(getBudgetOverview());
        checkAlerts();
    };

    const checkAlerts = () => {
        const newAlerts = categories.filter(category => category.spent > category.budget);
        setAlerts(newAlerts);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
                <h1 className="text-2xl font-semibold text-gray-900">Budget Management</h1>

                {/* Budget Overview */}
                <div className="mt-4 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold">Budget Overview</h2>
                    <p>Total Budget: ${overview.total}</p>
                    <p>Spent: ${overview.spent}</p>
                    <p>Remaining: ${overview.remaining}</p>
                </div>

                {/* Category Budgets */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Category Budgets</h2>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.name} className="flex justify-between">
                                <span>{category.name}</span>
                                <span>${category.budget}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Add Expense */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Add Expense</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddExpense();
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Category"
                            value={newExpense.category}
                            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        />
                        <button type="submit">Add Expense</button>
                    </form>
                </div>

                {/* Recent Transactions */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Recent Transactions</h2>
                    <ul>
                        {expenses.map((expense, index) => (
                            <li key={index}>
                                {expense.description} - ${expense.amount} ({expense.category})
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Budget Alerts */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Budget Alerts</h2>
                    {alerts.length > 0 ? (
                        <ul>
                            {alerts.map((alert, index) => (
                                <li key={index} className="text-red-500">
                                    {alert.name} has exceeded its budget!
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No alerts at the moment.</p>
                    )}
                </div>

                {/* Spending Analysis */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">Spending Analysis</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categories}
                                dataKey="spent"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                            >
                                {categories.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Budget;