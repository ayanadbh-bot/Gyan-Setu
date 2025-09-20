
import React, { useState, useEffect } from 'react';
// Fix: Corrected import statement for react-router-dom.
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import { getStudentCourses } from '../../services/courseService';
import { Course } from '../../types';
import { PlayCircle, Folder, User as UserIcon, Loader } from 'lucide-react';

const StudentDashboardPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const data = await getStudentCourses();
      setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Courses</h2>
        {loading ? (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin h-12 w-12 text-indigo-600" />
            </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <div className="flex items-center text-gray-500 mb-6">
                    <UserIcon className="w-4 h-4 mr-2" />
                    <span>{course.instructor}</span>
                </div>
                <div className="flex flex-col space-y-3">
                  <Link
                    to={`/lecture/${course.id}`}
                    className="flex items-center justify-center w-full px-4 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-200"
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    JOIN LIVE CLASS
                  </Link>
                  <Link
                    to={`/library/${course.id}`}
                    className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    <Folder className="w-5 h-5 mr-2" />
                    GO TO LIBRARY
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboardPage;