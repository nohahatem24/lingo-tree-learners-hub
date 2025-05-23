
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, BookOpen, Users, Award } from "lucide-react";
import UserTypeSelector from "@/components/UserTypeSelector";
import { useAuth } from "@/context/AuthContext";
import StudentDashboard from "@/components/StudentDashboard";
import TeacherDashboard from "@/components/TeacherDashboard";
import { signIn, signUp, signOut, UserRole } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { toast } = useToast();
  const { user, profile, loading } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRegister = async () => {
    try {
      await signUp(email, password, selectedUserType as UserRole, displayName);
      toast({
        title: "Registration successful",
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setSelectedUserType(null);
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🌳</div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user && profile) {
    if (profile.role === "student") {
      return <StudentDashboard onLogout={handleLogout} />;
    }
    if (profile.role === "teacher") {
      return <TeacherDashboard onLogout={handleLogout} />;
    }
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
                    {isRegistering ? `Register as ${selectedUserType}` : `${selectedUserType} Login`}
                  </h2>
                  <p className="text-gray-600">Welcome to English Buds!</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 outline-none"
                    />
                  </div>
                  
                  {isRegistering && (
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="Your name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 outline-none"
                      />
                    </div>
                  )}
                  
                  <Button 
                    onClick={isRegistering ? handleRegister : handleLogin}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-semibold rounded-lg"
                  >
                    {isRegistering ? "Create Account 🌟" : "Login to English Buds! 🌟"}
                  </Button>
                  
                  <div className="text-center pt-3">
                    <button 
                      onClick={() => setIsRegistering(!isRegistering)}
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      {isRegistering 
                        ? "Already have an account? Login" 
                        : "Need an account? Register"}
                    </button>
                  </div>
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
            English Buds
          </h1>
          <p className="text-2xl text-gray-700 font-semibold">
            With Miss Gannah & Miss Suzan
          </p>
          <p className="text-xl text-gray-600 mt-2">
            Learning English is now fun and easy! 🌟
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students in our magical learning forest! 
            Interactive lessons, fun games, and automatic grading make learning English an adventure!
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <Button 
            as={Link}
            to="/teachers"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Meet Our Teachers! 👩‍🏫
          </Button>
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
        <p>&copy; 2024 English Buds with Miss Gannah & Miss Suzan. Making English learning magical! ✨</p>
      </footer>
    </div>
  );
};

export default Index;
