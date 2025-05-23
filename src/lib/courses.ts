
import { supabase } from "@/integrations/supabase/client";

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  teacher_id: string;
  thumbnail_url: string | null;
  is_bundle: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseContent {
  id: string;
  course_id: string;
  title: string;
  type: 'video' | 'quiz' | 'worksheet';
  content_url: string | null;
  position: number;
  is_free: boolean;
  created_at: string;
}

export interface Quiz {
  id: string;
  course_content_id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
}

export async function fetchTeacherCourses(teacherId: string) {
  // NOTE: Using mock data since the 'courses' table doesn't exist in the current schema
  // In a real implementation, you would have a courses table and query it
  
  const mockCourses: Course[] = [
    {
      id: "course-1",
      title: "English Grammar Fundamentals",
      description: "Learn the basic building blocks of English grammar",
      price: 2999, // in cents
      teacher_id: teacherId,
      thumbnail_url: null,
      is_bundle: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "course-2",
      title: "Vocabulary Expansion",
      description: "Build your English vocabulary with fun exercises",
      price: 1999, // in cents
      teacher_id: teacherId,
      thumbnail_url: null,
      is_bundle: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
  
  return mockCourses;
}

export async function fetchCourseContent(courseId: string) {
  // NOTE: Using mock data since the 'course_contents' table doesn't exist in the current schema
  // In a real implementation, you would have a course_contents table and query it
  
  const mockContents: CourseContent[] = [
    {
      id: "content-1",
      course_id: courseId,
      title: "Introduction to the Course",
      type: "video",
      content_url: null,
      position: 1,
      is_free: true,
      created_at: new Date().toISOString()
    },
    {
      id: "content-2",
      course_id: courseId,
      title: "Basic Concepts",
      type: "video",
      content_url: null,
      position: 2,
      is_free: false,
      created_at: new Date().toISOString()
    },
    {
      id: "content-3",
      course_id: courseId,
      title: "Practice Quiz",
      type: "quiz",
      content_url: null,
      position: 3,
      is_free: false,
      created_at: new Date().toISOString()
    }
  ];
  
  return mockContents;
}
