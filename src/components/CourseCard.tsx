
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from "@/lib/courses";

interface CourseCardProps {
  course: Course;
  onView: (courseId: string) => void;
  onPurchase?: (courseId: string) => void;
  isPurchased?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onView, 
  onPurchase,
  isPurchased = false
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={course.thumbnail_url || "/placeholder.svg"} 
          alt={course.title}
          className="w-full h-full object-cover" 
        />
        {course.is_bundle && (
          <div className="absolute top-2 right-2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Bundle
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-700">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-2 mb-4">{course.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-green-600">
            ${(course.price / 100).toFixed(2)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button 
          className="flex-1 bg-blue-500 hover:bg-blue-600"
          onClick={() => onView(course.id)}
        >
          {isPurchased ? "Continue Learning" : "View Details"}
        </Button>
        {!isPurchased && onPurchase && (
          <Button 
            className="flex-1 bg-green-500 hover:bg-green-600" 
            onClick={() => onPurchase(course.id)}
          >
            Purchase
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
