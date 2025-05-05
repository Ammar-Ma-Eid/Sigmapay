import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { getBudgetOverview, getCategoryBudgets } from '../utils/budget';
import {
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  PresentationChartLineIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  CreditCardIcon,
  ReceiptRefundIcon,
  ShoppingBagIcon,
  AcademicCapIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [financialData, setFinancialData] = useState({
    totalIncome: 5000,
    budgetPlan: 3000,
    spendingLimit: 2000,
    savingsGoal: 1000
  });

  const [recentTransactions] = useState([
    {
      id: 'TX-001',
      date: '2024-03-15',
      recipient: 'Andrew Gamal',
      amount: 150.00,
      type: 'payment',
      category: 'Transfer'
    },
    {
      id: 'TX-002',
      date: '2024-03-14',
      recipient: 'Mohamed Ibrahim',
      amount: 85.50,
      type: 'payment',
      category: 'Shopping'
    },
    {
      id: 'TX-003',
      date: '2024-03-13',
      recipient: 'Omar Aly',
      amount: 200.00,
      type: 'savings',
      category: 'Group Savings'
    }
  ]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const summaryCards = [
    {
      title: 'Total Income',
      amount: financialData.totalIncome,
      icon: CurrencyDollarIcon,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Budget Plan',
      amount: financialData.budgetPlan,
      icon: ChartBarIcon,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Spending Limit',
      amount: financialData.spendingLimit,
      icon: ArrowTrendingUpIcon,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Savings Goal',
      amount: financialData.savingsGoal,
      icon: UserGroupIcon,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const userId = 'currentUser'; // Replace with actual user ID from authentication
  const overview = getBudgetOverview(userId);
  const categories = getCategoryBudgets(userId);

  const topCategories = categories
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 3);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user.firstName}!
        </h1>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <div key={card.title} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${card.color}`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                  <p className="text-2xl font-semibold">${card.amount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Budget Summary Card */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Budget Summary</h2>
          <p>Total Budget: ${overview.total}</p>
          <p>Spent: ${overview.spent}</p>
          <p>Remaining: ${overview.remaining}</p>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Top Spending Categories</h3>
            <ul>
              {topCategories.map((category) => (
                <li key={category.categoryId} className="flex justify-between">
                  <span>{category.categoryName}</span>
                  <span>${category.spent} / ${category.amount}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Budget Usage</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${(overview.spent / overview.total) * 100}%` }}
              ></div>
            </div>
          </div>

          {categories.some((category) => category.spent > category.amount) && (
            <div className="mt-4 text-red-500">
              <h3 className="text-lg font-semibold">Budget Alerts</h3>
              <ul>
                {categories
                  .filter((category) => category.spent > category.amount)
                  .map((alert) => (
                    <li key={alert.categoryId}>
                      {alert.categoryName} has exceeded its budget!
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <Link to="/budget" className="text-blue-500 hover:underline">
              View Budget Details
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Core Features */}
            <Link to="/payments" className="card hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <CurrencyDollarIcon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Make a Payment</h3>
                  <p className="text-gray-600 text-sm">Send money securely</p>
                </div>
              </div>
            </Link>
            <Link to="/contacts" className="card hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <UserGroupIcon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Manage Contacts</h3>
                  <p className="text-gray-600 text-sm">Edit recipient list</p>
                </div>
              </div>
            </Link>
            <Link to="/groups" className="card hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                  <UserGroupIcon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Saving Groups</h3>
                  <p className="text-gray-600 text-sm">Group contributions</p>
                </div>
              </div>
            </Link>

            {/* New Features */}
            <Link to="/investments" className="card hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                  <PresentationChartLineIcon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Investments</h3>
                  <p className="text-gray-600 text-sm">Manage your portfolio</p>
                </div>
              </div>
            </Link>
            <Link to="/advisory" className="card hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                  <ChatBubbleLeftRightIcon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Financial Advice</h3>
                  <p className="text-gray-600 text-sm">Get personalized guidance</p>
                </div>
              </div>
            </Link>
            <Link to="/reports" className="card hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-red-100 text-red-600">
                  <DocumentChartBarIcon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Reports</h3>
                  <p className="text-gray-600 text-sm">Financial analytics</p>
                </div>
              </div>
            </Link>
            <Link to="/cards" className="card hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                  <CreditCardIcon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Cards</h3>
                  <p className="text-gray-600 text-sm">Manage your cards</p>
                </div>
              </div>
            </Link>
            <Link to="/bills" className="card hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-teal-100 text-teal-600">
                  <ReceiptRefundIcon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Bills</h3>
                  <p className="text-gray-600 text-sm">Manage & pay bills</p>
                </div>
              </div>
            </Link>
            <Link to="/auto-pay" className="card hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-cyan-100 text-cyan-600">
                  <ArrowPathIcon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Auto-Pay</h3>
                  <p className="text-gray-600 text-sm">Recurring payments</p>
                </div>
              </div>
            </Link>
            <Link to="/partnerships" className="card hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-pink-100 text-pink-600">
                  <ShoppingBagIcon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Offers</h3>
                  <p className="text-gray-600 text-sm">Exclusive deals</p>
                </div>
              </div>
            </Link>
            <Link to="/tutoring" className="card hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                  <AcademicCapIcon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium">Learn</h3>
                  <p className="text-gray-600 text-sm">Financial education</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <Link to="/transactions" className="text-primary hover:text-secondary">
              View All
            </Link>
          </div>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recipient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.recipient}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          to={`/receipt/${transaction.id}`}
                          className="text-primary hover:text-secondary"
                        >
                          View Receipt
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Dashboard;