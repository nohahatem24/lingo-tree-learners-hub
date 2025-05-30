
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { signIn, signUp, UserRole } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isTeacher = searchParams.get('type') === 'teacher';

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const role: UserRole = isTeacher ? 'teacher' : 'student';
        await signUp(email, password, role, displayName);
        toast({
          title: "Welcome to Hello English! 🎉",
          description: isTeacher ? "Teacher account created successfully!" : "Student account created successfully! Start your English adventure!",
        });
      } else {
        await signIn(email, password);
        toast({
          title: "Welcome back! 👋",
          description: "Successfully signed in to Hello English!",
        });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Oops! Something went wrong 😔",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-20">🌟</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20">🎨</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-20">📚</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20">🚀</div>
      </div>

      <Card className="w-full max-w-md shadow-2xl rounded-3xl border-4 border-white relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              ← Back to Home
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-3">
            <div className="text-4xl">🌟</div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Hello English
            </CardTitle>
          </div>
          
          <CardDescription className="text-lg">
            {isTeacher ? (
              <>
                <div className="text-3xl mb-2">👩‍🏫</div>
                {isSignUp ? 'Create Teacher Account' : 'Teacher Login'}
              </>
            ) : (
              <>
                <div className="text-3xl mb-2">🎒</div>
                {isSignUp ? 'Join the Fun!' : 'Welcome Back, Student!'}
              </>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-lg font-semibold text-gray-700">
                  {isTeacher ? 'Teacher Name' : 'Your Name'} ✨
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="py-3 text-lg rounded-xl border-2 border-purple-200 focus:border-purple-500"
                  placeholder={isTeacher ? "Miss/Mr. Your Name" : "Enter your name"}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg font-semibold text-gray-700">
                Email Address 📧
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="py-3 text-lg rounded-xl border-2 border-purple-200 focus:border-purple-500"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg font-semibold text-gray-700">
                Password 🔒
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="py-3 text-lg rounded-xl border-2 border-purple-200 focus:border-purple-500"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 text-lg font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 ${
                isTeacher 
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700' 
                  : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600'
              } text-white`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  {isSignUp ? (
                    isTeacher ? 'Create Teacher Account 👩‍🏫' : 'Start Learning! 🚀'
                  ) : (
                    isTeacher ? 'Teacher Login 👩‍🏫' : 'Student Login 🎒'
                  )}
                </>
              )}
            </Button>
          </form>

          <div className="text-center space-y-4">
            <Button
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-600 hover:text-purple-800 font-semibold text-lg"
            >
              {isSignUp ? (
                'Already have an account? Sign In! 👋'
              ) : (
                isTeacher ? 'New teacher? Create account! ✨' : 'New student? Join us! 🌟'
              )}
            </Button>

            {!isTeacher && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600 mb-2">Are you a teacher?</p>
                <Button
                  variant="outline"
                  onClick={() => navigate('/auth?type=teacher')}
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold py-2 px-6 rounded-full"
                >
                  Teacher Login 👩‍🏫
                </Button>
              </div>
            )}

            {isTeacher && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600 mb-2">Are you a student?</p>
                <Button
                  variant="outline"
                  onClick={() => navigate('/auth')}
                  className="border-2 border-green-500 text-green-600 hover:bg-green-50 font-bold py-2 px-6 rounded-full"
                >
                  Student Login 🎒
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
