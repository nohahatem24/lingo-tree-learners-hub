
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserTypeSelectorProps {
  onSelect: (type: string) => void;
}

const UserTypeSelector = ({ onSelect }: UserTypeSelectorProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <Card className="border-4 border-blue-400 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-200">
        <CardContent className="p-8 text-center">
          <div className="text-8xl mb-6 animate-bounce">🎓</div>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">I'm a Student!</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Ready to learn English through fun games and interactive lessons? 
            Join thousands of kids having fun while learning!
          </p>
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <span>🎮</span>
              <span>Play Learning Games</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <span>⭐</span>
              <span>Collect Stars & Badges</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <span>📊</span>
              <span>Track Your Progress</span>
            </div>
          </div>
          <Button 
            onClick={() => onSelect("student")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Learning! 🚀
          </Button>
        </CardContent>
      </Card>

      <Card className="border-4 border-green-400 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-200">
        <CardContent className="p-8 text-center">
          <div className="text-8xl mb-6 animate-bounce">👨‍🏫</div>
          <h2 className="text-3xl font-bold text-green-700 mb-4">I'm a Teacher!</h2>
          <p className="text-gray-600 mb-6 text-lg">
            Create engaging lessons, track student progress, and make teaching English more effective than ever!
          </p>
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <span>📚</span>
              <span>Create Interactive Lessons</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-green-600">
              <span>📊</span>
              <span>Monitor Student Progress</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-green-600">
              <span>🤖</span>
              <span>Auto-Grade Assignments</span>
            </div>
          </div>
          <Button 
            onClick={() => onSelect("teacher")}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Teaching! 📝
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTypeSelector;
