
import React from "react";
import { Button } from "@/components/ui/button";
import TeacherProfile from "@/components/TeacherProfile";

const teachers = [
  {
    id: "gannah-id",
    display_name: "Miss Gannah",
    avatar_url: null,
    bio: "Enthusiastic English teacher with 5 years of experience teaching young learners. I make learning fun and interactive!",
    specialization: "English for Young Learners",
  },
  {
    id: "suzan-id",
    display_name: "Miss Suzan",
    avatar_url: null,
    bio: "Certified English instructor specializing in phonics and reading skills. I help children build strong foundations in English.",
    specialization: "Phonics & Reading",
  }
];

const TeacherLanding = () => {
  const handleViewCourses = (teacherId: string) => {
    console.log(`View courses for teacher: ${teacherId}`);
    // Navigate to teacher's courses page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="text-8xl mb-6 animate-bounce">👩‍🏫</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            English Buds with Miss Gannah & Miss Suzan
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Learn English with our amazing teachers in a fun, interactive environment!
            Choose your favorite teacher and begin your learning adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {teachers.map(teacher => (
            <TeacherProfile
              key={teacher.id}
              teacher={teacher}
              onViewCourses={handleViewCourses}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Start Learning Today! 🚀
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherLanding;
