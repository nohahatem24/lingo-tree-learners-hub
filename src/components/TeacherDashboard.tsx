
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Users, 
  MessageCircle, 
  Plus, 
  BarChart3,
  LogOut,
  Upload,
  Edit,
  Trash2,
  Star,
  Clock
} from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { signOut } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const TeacherDashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('courses');

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "Goodbye! 👋",
        description: "You've been logged out successfully.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Mock data for demonstration
  const teacherCourses = [
    {
      id: '1',
      title: 'Fun Phonics Adventure 🎵',
      description: 'Learn letter sounds through catchy songs and games!',
      students: 45,
      lessons: 12,
      price: 2999,
      thumbnail: '🎵',
      status: 'Published'
    },
    {
      id: '2',
      title: 'ABC Wonderland 🌈',
      description: 'Master the alphabet with colorful activities!',
      students: 67,
      lessons: 8,
      price: 0,
      thumbnail: '🌈',
      status: 'Published'
    }
  ];

  const recentStudents = [
    { name: 'Emma Thompson', course: 'Fun Phonics Adventure', progress: 85, lastActive: '2 hours ago' },
    { name: 'Michael Chen', course: 'ABC Wonderland', progress: 100, lastActive: '1 day ago' },
    { name: 'Sophia Rodriguez', course: 'Fun Phonics Adventure', progress: 60, lastActive: '3 hours ago' }
  ];

  const teacherStats = {
    totalStudents: 150,
    totalCourses: 12,
    totalEarnings: 15420,
    averageRating: 4.9
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-rainbow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">👩‍🏫</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Hello English
                </h1>
                <p className="text-sm text-gray-600">Teacher Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-800">Welcome, {profile?.display_name}!</p>
                <p className="text-sm text-purple-600">{profile?.specialization}</p>
              </div>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-2xl rounded-3xl">
            <CardContent className="py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold mb-2">Welcome back, {profile?.display_name}! 🎉</h2>
                  <p className="text-xl opacity-90">Ready to inspire young minds today?</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl mb-2">👥</div>
                  <p className="text-2xl font-bold">{teacherStats.totalStudents}</p>
                  <p className="text-sm opacity-75">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <p className="text-3xl font-bold text-gray-800">{teacherStats.totalStudents}</p>
              <p className="text-gray-600">Total Students</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-3xl font-bold text-gray-800">{teacherStats.totalCourses}</p>
              <p className="text-gray-600">Published Courses</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-3xl font-bold text-gray-800">{teacherStats.averageRating}</p>
              <p className="text-gray-600">Average Rating</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <p className="text-3xl font-bold text-gray-800">${(teacherStats.totalEarnings / 100).toFixed(0)}</p>
              <p className="text-gray-600">Total Earnings</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-2xl p-1 shadow-lg">
            <TabsTrigger value="courses" className="rounded-xl">📚 My Courses</TabsTrigger>
            <TabsTrigger value="students" className="rounded-xl">👥 Students</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl">📊 Analytics</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-xl">💬 Messages</TabsTrigger>
          </TabsList>

          {/* My Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">My Courses</h3>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Create New Course
              </Button>
            </div>
            
            <div className="grid gap-6">
              {teacherCourses.map((course) => (
                <Card key={course.id} className="shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="text-6xl">{course.thumbnail}</div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-bold text-gray-800">{course.title}</h3>
                          <Badge variant={course.price === 0 ? "secondary" : "default"}>
                            {course.price === 0 ? 'FREE' : `$${(course.price / 100).toFixed(2)}`}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{course.description}</p>
                        
                        <div className="flex space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{course.students} students</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{course.lessons} lessons</span>
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {course.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="shadow-xl rounded-2xl border-2 border-dashed border-purple-300 hover:border-purple-500 transition-colors cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">➕</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Create Your Next Course!</h3>
                  <p className="text-gray-500 mb-4">Share your expertise with even more students</p>
                  <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-full">
                    Get Started 🚀
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Recent Student Activity</CardTitle>
                <CardDescription>Keep track of your students' progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{student.name}</h4>
                          <p className="text-sm text-gray-600">{student.course}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">{student.progress}% Complete</p>
                        <p className="text-sm text-gray-500">Active {student.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Course Analytics 📊</CardTitle>
                <CardDescription>Track your teaching impact</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">Analytics Dashboard Coming Soon!</h3>
                <p className="text-gray-500 mb-6">Get detailed insights into student performance and engagement</p>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full">
                  Request Early Access 🔔
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Student Messages 💌</CardTitle>
                <CardDescription>Connect with your students</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No new messages</h3>
                <p className="text-gray-500 mb-6">Students can send you questions and feedback here</p>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full">
                  Message All Students 📢
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
