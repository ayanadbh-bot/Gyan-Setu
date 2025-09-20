
export enum UserRole {
  Student = 'student',
  Educator = 'educator',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
}

export interface ScheduledClass {
    id: string;
    courseTitle: string;
    time: string;
    date: string;
}

export interface LibraryResource {
    id: string;
    name: string;
    size: string;
    type: 'replay' | 'pdf' | 'zip';
}

export interface DrawingData {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  color: string;
}
