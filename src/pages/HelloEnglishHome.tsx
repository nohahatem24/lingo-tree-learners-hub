
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, BookOpen, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HelloEnglishHome = () => {
  const navigate = useNavigate();

  const teachers = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Miss Gannah',
      specialization: 'English for Young Learners & Phonics',
      bio: 'Enthusiastic English teacher with 8+ years of experience teaching young learners. I make learning fun and interactive through games, songs, and creative activities!',
      avatar: '👩‍🏫',
      color: 'from-pink-400 to-purple-500',
      courses: 12,
      students: 150,
      rating: 4.9
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Miss Suzan',
      specialization: 'Reading Comprehension & Creative Writing',
      bio: 'Certified English instructor specializing in reading comprehension and creative writing. I help children build strong foundations in English through storytelling and interactive lessons.',
      avatar: '👩‍💼',
      color: 'from-blue-400 to-cyan-500',
      courses: 8,
      students: 120,
      rating: 4.8
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-rainbow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="text-4xl">🌟</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Hello English
              </h1>
            </div>
            <div className="flex space-x-4">
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Student Login 🎒
              </Button>
              <Button 
                onClick={() => navigate('/auth?type=teacher')}
                variant="outline"
                className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Teacher Login 👩‍🏫
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Meet Our Amazing Teachers! 🌈
          </h2>
          <p className="text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Join thousands of happy students learning English with our fun, interactive lessons! 
            Choose your favorite teacher and start your English adventure today! ✨
          </p>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {teachers.map((teacher) => (
              <Card 
                key={teacher.id}
                className="overflow-hidden shadow-2xl rounded-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-4 border-white"
                onClick={() => navigate(`/teacher/${teacher.id}`)}
              >
                <div className={`h-32 bg-gradient-to-r ${teacher.color} relative`}>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
                      {teacher.avatar}
                    </div>
                  </div>
                </div>
                
                <CardHeader className="text-center pt-12 pb-4">
                  <CardTitle className="text-3xl font-bold text-gray-800">
                    {teacher.name}
                  </CardTitle>
                  <CardDescription className="text-lg text-purple-600 font-semibold">
                    {teacher.specialization}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center space-y-4">
                  <p className="text-gray-600 leading-relaxed px-4">
                    {teacher.bio}
                  </p>
                  
                  <div className="flex justify-center space-x-6 py-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-yellow-500">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-bold text-lg">{teacher.rating}</span>
                      </div>
                      <p className="text-sm text-gray-500">Rating</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-blue-500">
                        <BookOpen className="w-5 h-5" />
                        <span className="font-bold text-lg">{teacher.courses}</span>
                      </div>
                      <p className="text-sm text-gray-500">Courses</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-green-500">
                        <Users className="w-5 h-5" />
                        <span className="font-bold text-lg">{teacher.students}</span>
                      </div>
                      <p className="text-sm text-gray-500">Students</p>
                    </div>
                  </div>

                  <Button 
                    className={`w-full bg-gradient-to-r ${teacher.color} text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/teacher/${teacher.id}`);
                    }}
                  >
                    View {teacher.name}'s Courses 🚀
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why Kids Love Hello English! 💝
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100">
              <div className="text-6xl mb-4">🎮</div>
              <h4 className="text-xl font-bold mb-2 text-purple-700">Fun & Interactive</h4>
              <p className="text-gray-600">Learn through games, songs, and exciting activities!</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100">
              <div className="text-6xl mb-4">🏆</div>
              <h4 className="text-xl font-bold mb-2 text-blue-700">Earn Rewards</h4>
              <p className="text-gray-600">Collect stars, badges, and achievements as you learn!</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100">
              <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
              <h4 className="text-xl font-bold mb-2 text-green-700">Safe & Secure</h4>
              <p className="text-gray-600">Parent-approved platform with secure learning environment!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="text-4xl">🌟</div>
            <h2 className="text-3xl font-bold">Hello English</h2>
          </div>
          <p className="text-xl mb-6">Making English Learning Fun for Kids Everywhere! 🌍</p>
          <p className="text-purple-200">© 2024 Hello English. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HelloEnglishHome;
