
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, BookOpen, Users, Award } from "lucide-react";
import UserTypeSelector from "@/components/UserTypeSelector";
import StudentDashboard from "@/components/StudentDashboard";
import TeacherDashboard from "@/components/TeacherDashboard";

const Index = () => {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedUserType(null);
  };

  if (isLoggedIn && selectedUserType === "student") {
    return <StudentDashboard onLogout={handleLogout} />;
  }

  if (isLoggedIn && selectedUserType === "teacher") {
    return <TeacherDashboard onLogout={handleLogout} />;
  }

  if (selectedUserType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={() => setSelectedUserType(null)}
            className="mb-6 bg-green-500 hover:bg-green-600"
          >
            ← Back to Home
          </Button>
          
          <div className="max-w-md mx-auto">
            <Card className="border-4 border-green-300 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🌳</div>
                  <h2 className="text-2xl font-bold text-green-700 mb-2">
                    {selectedUserType === "student" ? "Student Login" : "Teacher Login"}
                  </h2>
                  <p className="text-gray-600">Welcome to ABC Lingo Tree!</p>
                </div>
                
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 outline-none"
                  />
                  <Button 
                    onClick={handleLogin}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-semibold rounded-lg"
                  >
                    Login to ABC Lingo Tree! 🌟
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="animate-bounce mb-8">
          <div className="text-8xl mb-4">🌳</div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            ABC Lingo Tree
          </h1>
          <p className="text-2xl text-gray-700 font-semibold">
            Learning English is now fun and easy! 🌟
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students and teachers in our magical learning forest! 
            Interactive lessons, fun games, and automatic grading make learning English an adventure!
          </p>
        </div>

        <UserTypeSelector onSelect={setSelectedUserType} />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-700">
          Why Kids Love ABC Lingo Tree? 🎯
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-4 border-blue-300 hover:scale-105 transition-transform duration-300 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-xl font-bold text-blue-700 mb-3">Interactive Games</h3>
              <p className="text-gray-600">Play fun games while learning! Drag and drop, matching games, and interactive quizzes.</p>
            </CardContent>
          </Card>

          <Card className="border-4 border-purple-300 hover:scale-105 transition-transform duration-300 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-purple-700 mb-3">Collect Stars & Badges</h3>
              <p className="text-gray-600">Earn rewards for every lesson completed! Watch your learning tree grow bigger and stronger.</p>
            </CardContent>
          </Card>

          <Card className="border-4 border-green-300 hover:scale-105 transition-transform duration-300 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-green-700 mb-3">Instant Feedback</h3>
              <p className="text-gray-600">Get immediate results on your quizzes! Our smart system helps you learn from mistakes.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 rounded-3xl mx-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-green-600">1000+</div>
            <div className="text-gray-600">Happy Students</div>
            <div className="text-2xl">😊</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-blue-600">50+</div>
            <div className="text-gray-600">Expert Teachers</div>
            <div className="text-2xl">👨‍🏫</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-purple-600">200+</div>
            <div className="text-gray-600">Fun Lessons</div>
            <div className="text-2xl">📚</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-orange-600">95%</div>
            <div className="text-gray-600">Success Rate</div>
            <div className="text-2xl">🎯</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <div className="text-4xl mb-4">🌳</div>
        <p>&copy; 2024 ABC Lingo Tree. Making English learning magical! ✨</p>
      </footer>
    </div>
  );
};

export default Index;
