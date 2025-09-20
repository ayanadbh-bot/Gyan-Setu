import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

interface LoginFormProps {
  role: UserRole;
}

const LoginForm: React.FC<LoginFormProps> = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password, role);
  };

  const placeholderEmail = role === UserRole.Student 
    ? "student1@gyansetu.com" 
    : "educator1@gyansetu.com";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 capitalize">{role} Login</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email / ID
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholderEmail}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password"className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password123"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
