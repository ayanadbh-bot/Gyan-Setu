
import React, { useState } from 'react';
// Fix: Corrected import statement for react-router-dom.
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Users, HelpCircle, PhoneOff } from 'lucide-react';
import Whiteboard from '../../components/whiteboard/Whiteboard';

const LiveClassPage: React.FC = () => {
    const { classId } = useParams<{ classId: string }>();
    const [isEnding, setIsEnding] = useState(false);

    const handleEndClass = () => {
        setIsEnding(true);
        // Simulate processing delay
        setTimeout(() => {
            alert("Class ended. Recording is processing.");
            // In a real app, you'd navigate away or change state further
            setIsEnding(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col">
            <header className="bg-gray-900 p-4 flex items-center justify-between shadow-lg">
                <Link to="/educator/dashboard" className="flex items-center text-indigo-400 hover:text-indigo-300">
                    <ChevronLeft className="w-6 h-6" />
                    <span className="ml-2 font-semibold">Back to Dashboard</span>
                </Link>
                <h1 className="text-xl font-bold">Live Control Panel</h1>
                <button
                    onClick={handleEndClass}
                    disabled={isEnding}
                    className="flex items-center px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition disabled:bg-red-400"
                >
                    <PhoneOff className="w-5 h-5 mr-2" />
                    {isEnding ? 'Ending...' : 'End Class'}
                </button>
            </header>

            <main className="flex-grow flex p-4 gap-4 overflow-hidden">
                {/* Main Content: Whiteboard */}
                <div className="flex-grow flex flex-col gap-4">
                    <div className="relative flex-grow bg-white rounded-lg shadow-2xl">
                        <Whiteboard isEducator={true} classId={classId || 'default-class'} />
                    </div>
                </div>

                {/* Side Panel: Students & Q&A */}
                <div className="w-80 flex-shrink-0 bg-gray-900 rounded-lg shadow-2xl flex flex-col">
                    <div className="p-4 border-b border-gray-700">
                        <h2 className="text-lg font-semibold flex items-center"><Users className="w-5 h-5 mr-2" /> Connected Students (2)</h2>
                        <ul className="mt-2 space-y-2 text-sm text-gray-300">
                            <li>Alex Doe</li>
                            <li>Jane Smith</li>
                        </ul>
                    </div>
                    <div className="p-4 flex-grow">
                        <h2 className="text-lg font-semibold flex items-center mb-2"><HelpCircle className="w-5 h-5 mr-2" /> Student Questions</h2>
                        <div className="text-center text-gray-400 pt-8">
                            <p>No questions yet.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LiveClassPage;