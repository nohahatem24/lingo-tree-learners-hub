
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, Trophy, Play, Users } from "lucide-react";

interface StudentDashboardProps {
  onLogout: () => void;
}

const StudentDashboard = ({ onLogout }: StudentDashboardProps) => {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [stars, setStars] = useState(47);
  const [level, setLevel] = useState(3);

  const lessons = [
    { id: 1, title: "Colors & Shapes", completed: true, stars: 3, emoji: "🎨" },
    { id: 2, title: "Animals & Pets", completed: true, stars: 3, emoji: "🐶" },
    { id: 3, title: "Family Members", completed: true, stars: 2, emoji: "👨‍👩‍👧‍👦" },
    { id: 4, title: "Food & Drinks", completed: false, stars: 0, emoji: "🍎" },
    { id: 5, title: "Body Parts", completed: false, stars: 0, emoji: "👋" },
    { id: 6, title: "Weather", completed: false, stars: 0, emoji: "☀️" },
  ];

  const badges = [
    { name: "First Steps", emoji: "👶", earned: true },
    { name: "Color Master", emoji: "🌈", earned: true },
    { name: "Animal Friend", emoji: "🦁", earned: true },
    { name: "Star Collector", emoji: "⭐", earned: false },
    { name: "Quiz Champion", emoji: "🏆", earned: false },
  ];

  const startLesson = (lessonId: number) => {
    setSelectedLesson(lessonId);
    // Simulate completing a lesson
    setTimeout(() => {
      setStars(stars + 3);
      setSelectedLesson(null);
    }, 2000);
  };

  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto border-4 border-blue-300 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="text-8xl mb-6">{lesson?.emoji}</div>
              <h2 className="text-3xl font-bold text-blue-700 mb-4">{lesson?.title}</h2>
              <div className="text-6xl mb-6 animate-spin">⭐</div>
              <p className="text-xl text-gray-600 mb-6">Great job! You earned 3 stars!</p>
              <Button 
                onClick={() => setSelectedLesson(null)}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-bold rounded-full"
              >
                Continue Learning! 🎉
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white/80 shadow-lg border-b-4 border-blue-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🌳</div>
              <div>
                <h1 className="text-2xl font-bold text-green-700">ABC Lingo Tree</h1>
                <p className="text-gray-600">Welcome back, Little Learner! 🌟</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-yellow-700">{stars} Stars</span>
              </div>
              <Button onClick={onLogout} variant="outline" className="border-2 border-red-300 text-red-600 hover:bg-red-50">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Tree Progress */}
            <Card className="border-4 border-green-300 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <div className="text-2xl">🌳</div>
                  My Learning Tree - Level {level}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">🌳</div>
                  <p className="text-gray-600">Your tree is growing strong! Keep learning to make it bigger!</p>
                </div>
                <Progress value={65} className="h-4 mb-2" />
                <p className="text-sm text-gray-600 text-center">35 stars to next level!</p>
              </CardContent>
            </Card>

            {/* Lessons */}
            <Card className="border-4 border-blue-300 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <BookOpen className="w-6 h-6" />
                  My Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {lessons.map((lesson) => (
                    <Card key={lesson.id} className={`border-2 ${lesson.completed ? 'border-green-300 bg-green-50' : 'border-gray-300'} hover:scale-105 transition-transform`}>
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-2">{lesson.emoji}</div>
                        <h3 className="font-bold text-gray-700 mb-2">{lesson.title}</h3>
                        <div className="flex justify-center mb-3">
                          {[1, 2, 3].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${star <= lesson.stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <Button
                          onClick={() => startLesson(lesson.id)}
                          className={`w-full ${lesson.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                        >
                          {lesson.completed ? 'Review 🔄' : 'Start 🚀'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-4 border-purple-300 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Trophy className="w-6 h-6" />
                  My Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{stars}</div>
                  <div className="text-sm text-gray-600">Total Stars</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">3</div>
                  <div className="text-sm text-gray-600">Lessons Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">Level {level}</div>
                  <div className="text-sm text-gray-600">Current Level</div>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="border-4 border-yellow-300 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-700">
                  <Trophy className="w-6 h-6" />
                  My Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {badges.map((badge, index) => (
                    <div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${badge.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                      <div className={`text-2xl ${badge.earned ? '' : 'grayscale'}`}>{badge.emoji}</div>
                      <div className="flex-1">
                        <div className={`font-semibold ${badge.earned ? 'text-yellow-700' : 'text-gray-500'}`}>{badge.name}</div>
                        {badge.earned && <Badge className="bg-green-500">Earned!</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-4 border-orange-300 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Play className="w-6 h-6" />
                  Quick Play
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  🎮 Word Match Game
                </Button>
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                  🧩 Spelling Quiz
                </Button>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                  🎵 Listen & Repeat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
