import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './components/TodoList';
// import AdminTodoList from './components/AdminTodoList';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { token, user } = useAuth();
  
  if (!token) return <Navigate to="/login" />;
  // if (allowedRoles && !allowedRoles.includes(user?.role)) {
  //   return <Navigate to="/" />;
  // }
  
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <TodoList />
                </PrivateRoute>
              }
            />
            {/* <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminTodoList />
                </PrivateRoute>
              }
            /> */}
          </Routes>
        </div>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;