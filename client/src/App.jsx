import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import Home               from './pages/Home';
import Login              from './pages/Login';
import Register           from './pages/Register';
import Dashboard          from './pages/Dashboard';
import Profile            from './pages/Profile';
import Jobs               from './pages/Jobs';
import Internships        from './pages/Internships';
import Applications       from './pages/Applications';
import SavedJobs          from './pages/SavedJobs';
import ResumeAnalyzer     from './pages/ResumeAnalyzer';
import InterviewPrep      from './pages/InterviewPrep';
import Chatbot            from './pages/Chatbot';
import SkillGap           from './pages/SkillGap';
import RecruiterDashboard from './pages/RecruiterDashboard';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ textAlign: 'center', marginTop: 100, fontSize: 18, fontFamily: 'system-ui' }}>
      Loading...
    </div>
  );
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/login"       element={<Login />} />
      <Route path="/register"    element={<Register />} />

      <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile"      element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/jobs"         element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
      <Route path="/internships"  element={<ProtectedRoute><Internships /></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
      <Route path="/saved"        element={<ProtectedRoute><SavedJobs /></ProtectedRoute>} />
      <Route path="/resume"       element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
      <Route path="/interview"    element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
      <Route path="/chatbot"      element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
      <Route path="/skillgap"     element={<ProtectedRoute><SkillGap /></ProtectedRoute>} />
      <Route path="/recruiter"    element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />

      <Route path="*"             element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}