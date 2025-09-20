
import React from 'react';
import { BookOpen, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">GyanSetu</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <UserIcon className="w-5 h-5" />
            <span>{user?.name || 'User'}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
