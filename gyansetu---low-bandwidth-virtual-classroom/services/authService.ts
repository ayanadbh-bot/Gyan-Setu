import { User, UserRole } from '../types';

const students: User[] = [
  { id: 's1', email: 'student1@gyansetu.com', role: UserRole.Student, name: 'Alex Doe' },
  { id: 's2', email: 'student2@gyansetu.com', role: UserRole.Student, name: 'Jane Smith' },
];

const educators: User[] = [
  { id: 'e1', email: 'educator1@gyansetu.com', role: UserRole.Educator, name: 'Dr. Evelyn Reed' },
];

const allUsers = [...students, ...educators];

export const login = (email: string, password: string, role: UserRole): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      
      if (user && password === 'password123') {
        if (user.role === role) {
          resolve(user);
        } else {
          reject(new Error(`This email is registered as a(n) ${user.role}, not a(n) ${role}.`));
        }
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 500); // Simulate network delay
  });
};
