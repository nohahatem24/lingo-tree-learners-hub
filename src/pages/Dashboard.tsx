
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import StudentDashboard from '@/components/StudentDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';
import { Navigate, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Dashboard mounted - user:', !!user, 'profile:', profile?.role, 'loading:', loading);
  }, [user, profile, loading]);

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
    console.log('No user or profile, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  console.log('Rendering dashboard for role:', profile.role);

  if (profile.role === 'teacher' || profile.role === 'admin') {
    return <TeacherDashboard />;
  }

  return <StudentDashboard />;
};

export default Dashboard;
