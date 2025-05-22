
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, BarChart3, Plus, Upload, Settings } from "lucide-react";

interface TeacherDashboardProps {
  onLogout: () => void;
}

const TeacherDashboard = ({ onLogout }: TeacherDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const students = [
    { id: 1, name: "Emma Johnson", level: 3, stars: 47, lastActive: "Today", progress: 75 },
    { id: 2, name: "Liam Smith", level: 2, stars: 32, lastActive: "Yesterday", progress: 60 },
    { id: 3, name: "Sophia Brown", level: 4, stars: 68, lastActive: "Today", progress: 85 },
    { id: 4, name: "Noah Davis", level: 2, stars: 28, lastActive: "2 days ago", progress: 45 },
    { id: 5, name: "Olivia Wilson", level: 3, stars: 51, lastActive: "Today", progress: 80 },
  ];

  const lessons = [
    { id: 1, title: "Colors & Shapes", students: 12, completion: 85, status: "active" },
    { id: 2, title: "Animals & Pets", students: 15, completion: 92, status: "active" },
    { id: 3, title: "Family Members", students: 8, completion: 70, status: "draft" },
    { id: 4, title: "Food & Drinks", students: 5, completion: 45, status: "active" },
  ];

  const recentActivity = [
    { student: "Emma", action: "Completed 'Colors & Shapes'", time: "10 minutes ago", emoji: "🎨" },
    { student: "Liam", action: "Started 'Animals & Pets'", time: "1 hour ago", emoji: "🐶" },
    { student: "Sophia", action: "Earned 'Color Master' badge", time: "2 hours ago", emoji: "🏆" },
    { student: "Noah", action: "Submitted homework", time: "1 day ago", emoji: "📝" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
      {/* Header */}
      <div className="bg-white/80 shadow-lg border-b-4 border-green-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🌳</div>
              <div>
                <h1 className="text-2xl font-bold text-green-700">ABC Lingo Tree - Teacher Portal</h1>
                <p className="text-gray-600">Welcome back, Teacher! 👨‍🏫</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={onLogout} variant="outline" className="border-2 border-red-300 text-red-600 hover:bg-red-50">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/60 border-b-2 border-green-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: "overview", label: "📊 Overview", icon: BarChart3 },
              { id: "students", label: "👥 Students", icon: Users },
              { id: "lessons", label: "📚 Lessons", icon: BookOpen },
              { id: "create", label: "➕ Create", icon: Plus },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-none border-b-4 ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white border-green-600'
                    : 'bg-transparent text-green-700 border-transparent hover:bg-green-100'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="border-4 border-blue-300 shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">👥</div>
                  <div className="text-3xl font-bold text-blue-600">25</div>
                  <div className="text-gray-600">Total Students</div>
                </CardContent>
              </Card>
              <Card className="border-4 border-green-300 shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">📚</div>
                  <div className="text-3xl font-bold text-green-600">12</div>
                  <div className="text-gray-600">Active Lessons</div>
                </CardContent>
              </Card>
              <Card className="border-4 border-purple-300 shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <div className="text-3xl font-bold text-purple-600">1,247</div>
                  <div className="text-gray-600">Stars Earned</div>
                </CardContent>
              </Card>
              <Card className="border-4 border-orange-300 shadow-xl">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <div className="text-3xl font-bold text-orange-600">78%</div>
                  <div className="text-gray-600">Avg. Progress</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-4 border-cyan-300 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-700">
                    <BarChart3 className="w-6 h-6" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-gray-200">
                        <div className="text-2xl">{activity.emoji}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-700">{activity.student}</div>
                          <div className="text-sm text-gray-600">{activity.action}</div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-4 border-pink-300 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-pink-700">
                    <Users className="w-6 h-6" />
                    Top Students This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {students.slice(0, 4).map((student, index) => (
                      <div key={student.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-gray-200">
                        <div className="text-2xl">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "⭐"}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-700">{student.name}</div>
                          <div className="text-sm text-gray-600">Level {student.level} • {student.stars} stars</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <Card className="border-4 border-blue-300 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Users className="w-6 h-6" />
                Student Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center gap-4 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="text-4xl">👤</div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-700">{student.name}</div>
                      <div className="text-sm text-gray-600">Level {student.level} • {student.stars} stars</div>
                      <div className="text-xs text-gray-500">Last active: {student.lastActive}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Progress</div>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-green-600 mt-1">{student.progress}%</div>
                    </div>
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lessons Tab */}
        {activeTab === "lessons" && (
          <Card className="border-4 border-green-300 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <BookOpen className="w-6 h-6" />
                Lesson Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-green-300 transition-colors">
                    <div className="text-4xl">📚</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-bold text-gray-700">{lesson.title}</div>
                        <Badge className={lesson.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                          {lesson.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">{lesson.students} students enrolled</div>
                      <div className="text-xs text-gray-500">Completion rate: {lesson.completion}%</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-green-300 text-green-600">
                        Edit
                      </Button>
                      <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                        View Stats
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Tab */}
        {activeTab === "create" && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-4 border-purple-300 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Plus className="w-6 h-6" />
                  Create New Lesson
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="text"
                  placeholder="Lesson Title (e.g., 'Numbers 1-10')"
                  className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 outline-none"
                />
                <textarea
                  placeholder="Lesson Description..."
                  rows={3}
                  className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 outline-none resize-none"
                />
                <select className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 outline-none">
                  <option value="">Select Level</option>
                  <option value="1">Level 1 - Beginner</option>
                  <option value="2">Level 2 - Elementary</option>
                  <option value="3">Level 3 - Intermediate</option>
                </select>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  📝 Create Lesson
                </Button>
              </CardContent>
            </Card>

            <Card className="border-4 border-orange-300 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Upload className="w-6 h-6" />
                  Upload Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-gray-600 mb-4">Drag & drop files here or click to browse</p>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    Choose Files
                  </Button>
                </div>
                <div className="text-sm text-gray-600">
                  Supported formats: MP4, MP3, PDF, PNG, JPG
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
