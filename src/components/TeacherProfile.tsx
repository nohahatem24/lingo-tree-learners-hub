
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfile } from '@/lib/auth';

interface TeacherProfileProps {
  teacher: {
    id: string;
    display_name: string;
    avatar_url: string | null;
    bio: string;
    specialization: string;
  };
  onViewCourses?: (teacherId: string) => void;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({ teacher, onViewCourses }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100 flex flex-col items-center">
        <Avatar className="h-24 w-24 border-4 border-white shadow-md">
          <img 
            src={teacher.avatar_url || "/placeholder.svg"} 
            alt={teacher.display_name} 
            className="object-cover"
          />
        </Avatar>
        <CardTitle className="mt-4 text-2xl font-bold text-green-700">
          {teacher.display_name}
        </CardTitle>
        <p className="text-blue-600 font-medium">{teacher.specialization}</p>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-gray-700 mb-6">{teacher.bio}</p>
        <Button 
          className="w-full bg-green-500 hover:bg-green-600"
          onClick={() => onViewCourses && onViewCourses(teacher.id)}
        >
          View Courses
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeacherProfile;
