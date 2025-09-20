
import React, { useState, useEffect } from 'react';
// Fix: Corrected import statement for react-router-dom.
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import { getLibraryResources, getCourseById } from '../../services/courseService';
import { LibraryResource, Course } from '../../types';
import { ChevronLeft, Download, FileText, Film, Archive, Loader } from 'lucide-react';

const LibraryPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [resources, setResources] = useState<LibraryResource[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (courseId) {
        const [resData, courseData] = await Promise.all([
          getLibraryResources(courseId),
          getCourseById(courseId)
        ]);
        setResources(resData);
        setCourse(courseData || null);
      }
      setLoading(false);
    };
    fetchData();
  }, [courseId]);

  const getIcon = (type: 'replay' | 'pdf' | 'zip') => {
    switch(type) {
      case 'replay': return <Film className="w-6 h-6 text-purple-500" />;
      case 'pdf': return <FileText className="w-6 h-6 text-red-500" />;
      case 'zip': return <Archive className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Link to="/student/dashboard" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-1 font-semibold">Back to Dashboard</span>
        </Link>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Library: {course?.title}</h2>
        <p className="text-gray-600 mb-8">Download course materials and lecture replays.</p>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-12 w-12 text-indigo-600" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {resources.map((res) => (
                <li key={res.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className="mr-4">{getIcon(res.type)}</div>
                    <div>
                        <p className="font-semibold text-gray-800">{res.name}</p>
                        <p className={`text-sm ${res.type === 'replay' ? 'text-purple-600 font-bold' : 'text-gray-500'}`}>
                          {res.size} {res.type === 'replay' && '(Ultra Low-Data Replay Package)'}
                        </p>
                    </div>
                  </div>
                  <button className="flex items-center px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default LibraryPage;