
import React, { useState, useEffect } from 'react';
// Fix: Corrected import statement for react-router-dom.
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import { getEducatorClasses } from '../../services/courseService';
import { ScheduledClass } from '../../types';
import { PlusCircle, PlayCircle, Calendar, Clock, Loader } from 'lucide-react';

const EducatorDashboardPage: React.FC = () => {
    const [classes, setClasses] = useState<ScheduledClass[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            const data = await getEducatorClasses();
            setClasses(data);
            setLoading(false);
        };
        fetchClasses();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">My Classes</h2>
                    <button className="flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200">
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Schedule New Class
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                         <Loader className="animate-spin h-12 w-12 text-indigo-600" />
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                            {classes.map((cls) => (
                                <li key={cls.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div>
                                        <p className="font-bold text-lg text-gray-800">{cls.courseTitle}</p>
                                        <div className="flex items-center text-gray-500 mt-1 space-x-4">
                                            <div className="flex items-center"><Calendar className="w-4 h-4 mr-1" /><span>{cls.date}</span></div>
                                            <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /><span>{cls.time}</span></div>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/educator/live/${cls.id}`}
                                        className="flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
                                    >
                                        <PlayCircle className="w-5 h-5 mr-2" />
                                        START LIVE CLASS
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    );
};

export default EducatorDashboardPage;