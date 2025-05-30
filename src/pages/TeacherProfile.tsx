
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, Play, Lock, BookOpen } from "lucide-react";

const TeacherProfile = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  
  const teacher = teacherId === '11111111-1111-1111-1111-111111111111' ? {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Miss Gannah',
    specialization: 'English for Young Learners & Phonics',
    bio: 'Enthusiastic English teacher with 8+ years of experience teaching young learners. I make learning fun and interactive through games, songs, and creative activities!',
    avatar: '👩‍🏫',
    color: 'from-pink-400 to-purple-500',
    rating: 4.9,
    students: 150,
    courses: [
      {
        id: '1',
        title: 'Fun Phonics Adventure 🎵',
        description: 'Learn letter sounds through catchy songs and games!',
        price: 2999,
        isBundle: false,
        isFree: false,
        thumbnail: '🎵',
        duration: 120,
        lessons: 12,
        level: 1
      },
      {
        id: '2',
        title: 'ABC Wonderland 🌈',
        description: 'Master the alphabet with colorful activities!',
        price: 0,
        isBundle: false,
        isFree: true,
        thumbnail: '🌈',
        duration: 90,
        lessons: 8,
        level: 1
      }
    ]
  } : {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Miss Suzan',
    specialization: 'Reading Comprehension & Creative Writing',
    bio: 'Certified English instructor specializing in reading comprehension and creative writing. I help children build strong foundations in English through storytelling and interactive lessons.',
    avatar: '👩‍💼',
    color: 'from-blue-400 to-cyan-500',
    rating: 4.8,
    students: 120,
    courses: [
      {
        id: '3',
        title: 'Story Time Magic 📚',
        description: 'Improve reading through exciting stories and adventures!',
        price: 3499,
        isBundle: false,
        isFree: false,
        thumbnail: '📚',
        duration: 150,
        lessons: 15,
        level: 2
      },
      {
        id: '4',
        title: 'Creative Writing Workshop ✍️',
        description: 'Express yourself through creative writing activities!',
        price: 2799,
        isBundle: false,
        isFree: false,
        thumbnail: '✍️',
        duration: 100,
        lessons: 10,
        level: 3
      }
    ]
  };

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Teacher Not Found 😔</h1>
          <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-rainbow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-lg font-semibold text-purple-600 hover:text-purple-800"
            >
              ← Back to Home
            </Button>
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🌟</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Hello English
              </h1>
            </div>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full"
            >
              Student Login 🎒
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Teacher Header */}
        <div className="mb-12">
          <Card className="overflow-hidden shadow-2xl rounded-3xl border-4 border-white">
            <div className={`h-32 bg-gradient-to-r ${teacher.color} relative`}>
              <div className="absolute -bottom-8 left-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
                  {teacher.avatar}
                </div>
              </div>
            </div>
            
            <CardContent className="pt-12 pb-8">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="mb-6 md:mb-0">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">{teacher.name}</h1>
                  <p className="text-xl text-purple-600 font-semibold mb-4">{teacher.specialization}</p>
                  <p className="text-gray-600 max-w-2xl leading-relaxed">{teacher.bio}</p>
                </div>
                
                <div className="flex space-x-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-yellow-500">
                      <Star className="w-6 h-6 fill-current" />
                      <span className="font-bold text-2xl">{teacher.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 text-green-500">
                      <Users className="w-6 h-6" />
                      <span className="font-bold text-2xl">{teacher.students}</span>
                    </div>
                    <p className="text-sm text-gray-500">Students</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Section */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
            {teacher.name}'s Amazing Courses! 🎉
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teacher.courses.map((course) => (
              <Card 
                key={course.id}
                className="overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-purple-200"
              >
                <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <div className="text-6xl">{course.thumbnail}</div>
                </div>
                
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold text-gray-800 leading-tight">
                      {course.title}
                    </CardTitle>
                    {course.isFree ? (
                      <Badge className="bg-green-500 text-white">FREE</Badge>
                    ) : (
                      <Badge className="bg-purple-500 text-white">
                        ${(course.price / 100).toFixed(2)}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-gray-600">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Level {course.level}</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${course.isFree ? 'bg-green-500 hover:bg-green-600' : `bg-gradient-to-r ${teacher.color}`} text-white font-bold py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200`}
                    onClick={() => navigate('/auth')}
                  >
                    {course.isFree ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Learning Free!
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Enroll Now
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl rounded-3xl">
            <CardContent className="py-12">
              <h3 className="text-4xl font-bold mb-4">Ready to Start Learning? 🚀</h3>
              <p className="text-xl mb-8 opacity-90">
                Join {teacher.students} happy students learning with {teacher.name}!
              </p>
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => navigate('/auth')}
              >
                Create Student Account 🎒
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
