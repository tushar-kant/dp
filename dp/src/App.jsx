import React from 'react';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './components/auth/AuthContext.jsx'; // Import AuthProvider
import ProtectedRoute from './ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import ContactForm from './components/pages/ContactForm.jsx';
import StudentTable from './components/pages/table/StudentTable.jsx';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contactus" element={<ContactForm />} />
          <Route path="/student" element={<StudentTable />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
