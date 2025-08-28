import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import './index.css'

import Dashboard from './dashboard/Dashboard';
import LoginPage from './login/LoginPage';
import AbsentSystemRFID from './absentSystemRFID/absentSystemRFID';
import AbsentRequest from './AbsenceRequest/mainEmployeePages';


function ProtectedRoute({ children, roleRequired }) {
  const isLogin = JSON.parse(sessionStorage.getItem('isLogin') || 'false');
  const role = JSON.parse(sessionStorage.getItem('userRole') || 'null');

  
  // console.log("ProtectedRoute check:", { isLogin, role, roleRequired });


  if (!isLogin) {
    return <Navigate to="/" replace />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* login Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path='/absentRFID' element={<AbsentSystemRFID />} />

        {/* Admin route */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute roleRequired="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Employee route */}
        <Route
          path="/absentreq"
          element={
            <ProtectedRoute roleRequired="employee">
              <AbsentRequest />
            </ProtectedRoute>
          }
        />

        {/* RFID route */}
        {/* <Route
          path="/absentRFID"
          element={
            <ProtectedRoute roleRequired="absent">
              <AbsentSystemRFID />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);