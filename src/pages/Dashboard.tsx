
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import StudentDashboard from '@/components/StudentDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading your dashboard... 🌟</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/auth" replace />;
  }

  if (profile.role === 'teacher' || profile.role === 'admin') {
    return <TeacherDashboard />;
  }

  return <StudentDashboard />;
};

export default Dashboard;
