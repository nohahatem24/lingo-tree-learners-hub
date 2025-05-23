
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
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('teacher_id', teacherId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data as Course[];
}

export async function fetchCourseContent(courseId: string) {
  const { data, error } = await supabase
    .from('course_contents')
    .select('*')
    .eq('course_id', courseId)
    .order('position', { ascending: true });
    
  if (error) throw error;
  return data as CourseContent[];
}
