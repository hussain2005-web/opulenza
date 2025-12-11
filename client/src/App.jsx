import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import WaiterDashboard from './pages/WaiterDashboard';
import ReceptionDashboard from './pages/ReceptionDashboard';
import CashierDashboard from './pages/CashierDashboard';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children, roles }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <div className="container glass-panel p-4 text-center"><h1>Access Denied</h1></div>;
  }

  return children;
};

function AppRoutes() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      {currentUser && <Navbar />}
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            currentUser ? (
              currentUser.role === 'admin' ? <Navigate to="/admin" /> :
                currentUser.role === 'waiter' ? <Navigate to="/waiter" /> :
                  currentUser.role === 'reception' ? <Navigate to="/reception" /> :
                    currentUser.role === 'cashier' ? <Navigate to="/cashier" /> :
                      <Navigate to="/customer" />
            ) : <Navigate to="/login" />
          } />

          <Route path="/admin/*" element={
            <PrivateRoute roles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          } />

          <Route path="/customer/*" element={
            <PrivateRoute roles={['customer', 'admin']}>
              <CustomerDashboard />
            </PrivateRoute>
          } />

          <Route path="/waiter/*" element={
            <PrivateRoute roles={['waiter', 'admin']}>
              <WaiterDashboard />
            </PrivateRoute>
          } />

          <Route path="/reception/*" element={
            <PrivateRoute roles={['reception', 'admin']}>
              <ReceptionDashboard />
            </PrivateRoute>
          } />

          <Route path="/cashier/*" element={
            <PrivateRoute roles={['cashier', 'admin']}>
              <CashierDashboard />
            </PrivateRoute>
          } />

        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
