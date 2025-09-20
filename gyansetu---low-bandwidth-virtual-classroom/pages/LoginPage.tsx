
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import { UserRole } from '../types';

const LoginPage: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.Student);

  const tabClasses = (role: UserRole) => 
    `w-1/2 py-3 text-center font-semibold cursor-pointer rounded-t-lg transition-colors duration-300 ${
      activeRole === role 
        ? 'bg-white text-indigo-600' 
        : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <BookOpen className="w-16 h-16 text-indigo-600 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-800 mt-2">GyanSetu</h1>
          <p className="text-gray-500 mt-1">The Low-Bandwidth Virtual Classroom</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex">
            <div onClick={() => setActiveRole(UserRole.Student)} className={tabClasses(UserRole.Student)}>
              Student Login
            </div>
            <div onClick={() => setActiveRole(UserRole.Educator)} className={tabClasses(UserRole.Educator)}>
              Educator Login
            </div>
          </div>
          <div className="p-8">
            <LoginForm role={activeRole} />
            <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700 text-center mb-3">Demo Credentials</h3>
              <div className="text-xs text-gray-600 space-y-2">
                <p>
                  <span className="font-semibold">Student Email:</span> 
                  <code className="ml-1 bg-gray-200 px-1 py-0.5 rounded">student1@gyansetu.com</code>
                </p>
                <p>
                  <span className="font-semibold">Educator Email:</span> 
                  <code className="ml-1 bg-gray-200 px-1 py-0.5 rounded">educator1@gyansetu.com</code>
                </p>
                <p>
                  <span className="font-semibold">Password (all):</span> 
                  <code className="ml-1 bg-gray-200 px-1 py-0.5 rounded">password123</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
