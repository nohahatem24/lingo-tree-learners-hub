
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Star, 
  Award, 
  MessageCircle, 
  Play, 
  Clock, 
  TrendingUp,
  LogOut,
  User
} from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { signOut } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const StudentDashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('courses');

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      toast({
        title: "See you soon! 👋",
        description: "You've been logged out successfully.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Mock data for demonstration
  const enrolledCourses = [
    {
      id: '1',
      title: 'Fun Phonics Adventure 🎵',
      teacher: 'Miss Gannah',
      progress: 75,
      thumbnail: '🎵',
      nextLesson: 'Lesson 9: Silent Letters',
      totalLessons: 12,
      completedLessons: 9
    },
    {
      id: '2',
      title: 'ABC Wonderland 🌈',
      teacher: 'Miss Gannah',
      progress: 100,
      thumbnail: '🌈',
      nextLesson: 'Course Complete!',
      totalLessons: 8,
      completedLessons: 8
    }
  ];

  const recentBadges = [
    { name: 'First Lesson', icon: '🌟', date: '2 days ago' },
    { name: 'Quick Learner', icon: '⚡', date: '1 week ago' },
    { name: 'Perfect Score', icon: '🎯', date: '3 days ago' }
  ];

  const weeklyStats = {
    lessonsCompleted: 12,
    timeSpent: 180, // minutes
    starsEarned: 45,
    currentStreak: 5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-rainbow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🌟</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Hello English
                </h1>
                <p className="text-sm text-gray-600">Student Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-800">Welcome back!</p>
                <p className="text-sm text-purple-600">{profile?.display_name || 'Student'}</p>
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
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl rounded-3xl">
            <CardContent className="py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold mb-2">Welcome back, {profile?.display_name}! 🎉</h2>
                  <p className="text-xl opacity-90">Ready to continue your English adventure?</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl mb-2">⭐</div>
                  <p className="text-2xl font-bold">{weeklyStats.starsEarned}</p>
                  <p className="text-sm opacity-75">Stars This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-2xl p-1 shadow-lg">
            <TabsTrigger value="courses" className="rounded-xl">📚 My Courses</TabsTrigger>
            <TabsTrigger value="progress" className="rounded-xl">📈 Progress</TabsTrigger>
            <TabsTrigger value="badges" className="rounded-xl">🏆 Badges</TabsTrigger>
            <TabsTrigger value="messages" className="rounded-xl">💬 Messages</TabsTrigger>
          </TabsList>

          {/* My Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="shadow-xl rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="text-6xl">{course.thumbnail}</div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-bold text-gray-800">{course.title}</h3>
                          <Badge variant="outline" className="text-purple-600 border-purple-600">
                            {course.teacher}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{course.nextLesson}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-3" />
                        </div>
                      </div>
                      
                      <Button 
                        className={`${course.progress === 100 ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600'} text-white font-bold py-3 px-6 rounded-full`}
                      >
                        {course.progress === 100 ? (
                          <>
                            <Award className="w-4 h-4 mr-2" />
                            Review
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="shadow-xl rounded-2xl border-2 border-dashed border-purple-300 hover:border-purple-500 transition-colors cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">➕</div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Explore More Courses!</h3>
                  <p className="text-gray-500 mb-4">Discover amazing new lessons with Miss Gannah and Miss Suzan</p>
                  <Button 
                    onClick={() => navigate('/')}
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full"
                  >
                    Browse Courses 🔍
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-gray-800">{weeklyStats.lessonsCompleted}</p>
                  <p className="text-gray-600">Lessons This Week</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-gray-800">{weeklyStats.timeSpent}</p>
                  <p className="text-gray-600">Minutes Studied</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-gray-800">{weeklyStats.starsEarned}</p>
                  <p className="text-gray-600">Stars Earned</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg rounded-2xl">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <p className="text-3xl font-bold text-gray-800">{weeklyStats.currentStreak}</p>
                  <p className="text-gray-600">Day Streak</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Learning Progress Tree 🌳</CardTitle>
                <CardDescription>Watch your English skills grow!</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="text-8xl mb-4">🌳</div>
                <p className="text-xl text-gray-600">Your learning tree is growing strong!</p>
                <p className="text-gray-500">Complete more lessons to see it flourish!</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Your Amazing Badges! 🏆</CardTitle>
                <CardDescription>Collect badges as you master English skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {recentBadges.map((badge, index) => (
                    <Card key={index} className="shadow-lg rounded-xl text-center p-6">
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{badge.name}</h3>
                      <p className="text-sm text-gray-500">Earned {badge.date}</p>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">Keep learning to unlock more badges!</p>
                  <div className="flex justify-center space-x-4 opacity-50">
                    <div className="text-3xl">🎯</div>
                    <div className="text-3xl">📚</div>
                    <div className="text-3xl">💬</div>
                    <div className="text-3xl">🎤</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card className="shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Messages from Teachers 💌</CardTitle>
                <CardDescription>Stay connected with Miss Gannah and Miss Suzan</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">No new messages</h3>
                <p className="text-gray-500 mb-6">Your teachers will send you encouragement and feedback here!</p>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full">
                  Send Message to Teacher 📝
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
