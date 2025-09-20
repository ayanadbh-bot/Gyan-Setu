
import React from 'react';
// Fix: Corrected import statement for react-router-dom.
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import StudentDashboardPage from './pages/student/StudentDashboardPage';
import EducatorDashboardPage from './pages/educator/EducatorDashboardPage';
import LecturePage from './pages/student/LecturePage';
import LibraryPage from './pages/student/LibraryPage';
import LiveClassPage from './pages/educator/LiveClassPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { UserRole } from './types';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  );
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Student Routes */}
      <Route 
        path="/student/dashboard" 
        element={<ProtectedRoute roles={[UserRole.Student]}><StudentDashboardPage /></ProtectedRoute>} 
      />
      <Route 
        path="/lecture/:classId" 
        element={<ProtectedRoute roles={[UserRole.Student]}><LecturePage /></ProtectedRoute>} 
      />
      <Route 
        path="/library/:courseId" 
        element={<ProtectedRoute roles={[UserRole.Student]}><LibraryPage /></ProtectedRoute>} 
      />

      {/* Educator Routes */}
      <Route 
        path="/educator/dashboard" 
        element={<ProtectedRoute roles={[UserRole.Educator]}><EducatorDashboardPage /></ProtectedRoute>} 
      />
      <Route 
        path="/educator/live/:classId" 
        element={<ProtectedRoute roles={[UserRole.Educator]}><LiveClassPage /></ProtectedRoute>} 
      />

      {/* Redirect logic */}
      <Route 
        path="/" 
        element={
          user ? (
            user.role === UserRole.Educator ? (
              <Navigate to="/educator/dashboard" />
            ) : (
              <Navigate to="/student/dashboard" />
            )
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;