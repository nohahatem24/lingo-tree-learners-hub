
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Course } from "@/lib/courses";
import CourseCard from "@/components/CourseCard";
import { supabase } from "@/integrations/supabase/client";

interface StudentDashboardProps {
  onLogout?: () => void;
}

const StudentDashboard = ({ onLogout }: StudentDashboardProps) => {
  const { profile } = useAuth();
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'courses' | 'progress' | 'messages'>('courses');

  useEffect(() => {
    async function fetchPurchasedCourses() {
      if (!profile?.id) return;
      
      try {
        // Get user purchases
        const { data: purchases, error: purchaseError } = await supabase
          .from('purchases')
          .select('course_id')
          .eq('user_id', profile.id);
        
        if (purchaseError) throw purchaseError;
        
        if (purchases && purchases.length > 0) {
          const courseIds = purchases.map(p => p.course_id);
          
          // Get course details
          const { data: courses, error: courseError } = await supabase
            .from('courses')
            .select('*')
            .in('id', courseIds);
          
          if (courseError) throw courseError;
          setPurchasedCourses(courses as Course[]);
        }
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPurchasedCourses();
  }, [profile?.id]);

  const handleCourseView = (courseId: string) => {
    // Navigate to course page
    console.log(`Navigating to course ${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-700">
              Welcome, {profile?.display_name || 'Student'}! 🌟
            </h1>
            <p className="text-blue-600">Your learning adventure continues!</p>
          </div>
          <Button onClick={onLogout} variant="outline" className="bg-white">
            Log Out
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 font-medium text-lg ${activeTab === 'courses' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500'}`}
            >
              My Courses
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-2 font-medium text-lg ${activeTab === 'progress' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500'}`}
            >
              My Progress
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 font-medium text-lg ${activeTab === 'messages' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500'}`}
            >
              Messages
            </button>
          </div>
          
          {activeTab === 'courses' && (
            <>
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-5xl animate-bounce mb-4">📚</div>
                  <p className="text-gray-500">Loading your courses...</p>
                </div>
              ) : purchasedCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {purchasedCourses.map(course => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onView={handleCourseView}
                      isPurchased={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🌱</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No Courses Yet</h3>
                  <p className="text-gray-500 mb-6">
                    Time to start your learning journey! Browse our courses and find one you like.
                  </p>
                  <Button className="bg-green-500 hover:bg-green-600">
                    Explore Courses
                  </Button>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'progress' && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Your Progress</h3>
              <p className="text-gray-500">
                Track your learning journey here. Complete more lessons to see your progress!
              </p>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">💌</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Messages</h3>
              <p className="text-gray-500">
                Connect with your teachers here. No messages yet!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
