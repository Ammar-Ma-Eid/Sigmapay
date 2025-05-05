import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Payments from './pages/Payments';
import Transactions from './pages/Transactions';
import Groups from './pages/Groups';
import Receipt from './pages/Receipt';

// Lazy load new feature pages to improve initial load performance
import { lazy, Suspense } from 'react';
const Investments = lazy(() => import('./pages/Investments'));
const Advisory = lazy(() => import('./pages/Advisory'));
const Reports = lazy(() => import('./pages/Reports'));
const Cards = lazy(() => import('./pages/Cards'));
const Bills = lazy(() => import('./pages/Bills'));
const AutoPay = lazy(() => import('./pages/AutoPay'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const Tutoring = lazy(() => import('./pages/Tutoring'));
const Profile = lazy(() => import('./pages/Profile'));
const Verify = lazy(() => import('./pages/Verify'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Budget = lazy(() => import('./pages/Budget'));
const GeminiDemo = lazy(() => import('./pages/GeminiDemo'));

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<div className="flex justify-center items-center h-64">Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/about" element={<Home />} /> {/* Placeholder - create About page later */}

              {/* Protected Routes - require authentication */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              <Route path="/contacts" element={
                <ProtectedRoute>
                  <Contacts />
                </ProtectedRoute>
              } />

              <Route path="/payments" element={
                <ProtectedRoute>
                  <Payments />
                </ProtectedRoute>
              } />

              <Route path="/transactions" element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              } />

              <Route path="/groups" element={
                <ProtectedRoute>
                  <Groups />
                </ProtectedRoute>
              } />

              <Route path="/receipt/:id" element={
                <ProtectedRoute>
                  <Receipt />
                </ProtectedRoute>
              } />

              {/* New Feature Protected Routes */}
              <Route path="/investments" element={
                <ProtectedRoute>
                  <Investments />
                </ProtectedRoute>
              } />

              <Route path="/advisory" element={
                <ProtectedRoute>
                  <Advisory />
                </ProtectedRoute>
              } />

              <Route path="/reports" element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />

              <Route path="/cards" element={
                <ProtectedRoute>
                  <Cards />
                </ProtectedRoute>
              } />

              <Route path="/bills" element={
                <ProtectedRoute>
                  <Bills />
                </ProtectedRoute>
              } />

              <Route path="/auto-pay" element={
                <ProtectedRoute>
                  <AutoPay />
                </ProtectedRoute>
              } />

              <Route path="/partnerships" element={
                <ProtectedRoute>
                  <Partnerships />
                </ProtectedRoute>
              } />

              <Route path="/tutoring" element={
                <ProtectedRoute>
                  <Tutoring />
                </ProtectedRoute>
              } />

              <Route path="/budget" element={
                <ProtectedRoute>
                  <Budget />
                </ProtectedRoute>
              } />

              <Route path="/gemini-demo" element={
                <ProtectedRoute>
                  <GeminiDemo />
                </ProtectedRoute>
              } />

              {/* Catch-all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;