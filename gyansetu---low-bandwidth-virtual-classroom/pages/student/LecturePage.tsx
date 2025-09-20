
import React, { useState, useEffect, useRef } from 'react';
// Fix: Corrected import statement for react-router-dom.
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Video, HelpCircle, Hand, Clock, Save } from 'lucide-react';
import Whiteboard from '../../components/whiteboard/Whiteboard';
import { getCourseById } from '../../services/courseService';
import { Course } from '../../types';

interface Note {
  timestamp: string;
  text: string;
}

const LecturePage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (classId) {
        const data = await getCourseById(classId);
        setCourse(data || null);
      }
    };
    fetchCourse();
  }, [classId]);
  
  useEffect(() => {
    const timer = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSaveNote = () => {
    if (note.trim()) {
      const newNote: Note = {
        timestamp: formatTime(elapsedTime),
        text: note,
      };
      setSavedNotes(prevNotes => [...prevNotes, newNote]);
      setNote('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col">
      <header className="bg-gray-900 p-4 flex items-center justify-between shadow-lg">
        <Link to="/student/dashboard" className="flex items-center text-indigo-400 hover:text-indigo-300">
          <ChevronLeft className="w-6 h-6" />
          <span className="ml-2 font-semibold">Back to Dashboard</span>
        </Link>
        <h1 className="text-xl font-bold">{course?.title || 'Live Class'}</h1>
        <div className="flex items-center bg-green-500 px-3 py-1 rounded-full">
            <Clock className="w-5 h-5 mr-2" />
            <span>{formatTime(elapsedTime)}</span>
        </div>
      </header>

      <main className="flex-grow flex p-4 gap-4 overflow-hidden">
        {/* Main Content: Whiteboard and Video */}
        <div className="flex-grow flex flex-col gap-4">
          <div className="relative flex-grow bg-white rounded-lg shadow-2xl">
            <Whiteboard isEducator={false} classId={classId || 'default-class'} />
            <div className="absolute top-4 right-4 w-48 h-32 bg-black border-2 border-gray-600 rounded-md flex items-center justify-center">
              <Video className="w-10 h-10 text-gray-400" />
              <p className="absolute bottom-2 text-xs text-gray-300">Educator Cam</p>
            </div>
          </div>
          <div className="flex-shrink-0 h-16 bg-gray-900 rounded-lg flex items-center justify-center px-4 space-x-4">
             <button className="flex items-center px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition">
                <HelpCircle className="w-5 h-5 mr-2" />
                <span>Q&A</span>
             </button>
             <button className="flex items-center px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition">
                <Hand className="w-5 h-5 mr-2" />
                <span>Raise Hand</span>
             </button>
          </div>
        </div>

        {/* Side Panel: Notes */}
        <div className="w-80 flex-shrink-0 bg-gray-900 rounded-lg shadow-2xl flex flex-col p-4">
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">My Timestamped Notes</h2>
          <div className="flex-grow overflow-y-auto pr-2">
              {savedNotes.length === 0 ? (
                  <p className="text-gray-400 text-sm">Your saved notes will appear here.</p>
              ) : (
                <ul className="space-y-3">
                    {savedNotes.map((n, index) => (
                        <li key={index} className="bg-gray-800 p-3 rounded-md">
                            <span className="font-mono text-indigo-400 text-sm block">{n.timestamp}</span>
                            <p className="text-gray-200">{n.text}</p>
                        </li>
                    ))}
                </ul>
              )}
          </div>
          <div className="mt-4">
            <textarea 
                className="w-full h-24 p-2 bg-gray-700 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type your note here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <button 
                onClick={handleSaveNote}
                className="w-full mt-2 flex items-center justify-center py-2 px-4 bg-green-600 rounded-md hover:bg-green-700 transition"
            >
                <Save className="w-5 h-5 mr-2" />
                Save Note
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LecturePage;