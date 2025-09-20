
import { Course, ScheduledClass, LibraryResource } from '../types';

const courses: Course[] = [
  { id: 'cs101', title: 'Artificial Intelligence', instructor: 'Dr. Evelyn Reed' },
  { id: 'ee202', title: 'VLSI Design', instructor: 'Dr. Evelyn Reed' },
  { id: 'me301', title: 'Thermodynamics', instructor: 'Dr. Evelyn Reed' },
];

const scheduledClasses: ScheduledClass[] = [
    { id: 'class1', courseTitle: 'Artificial Intelligence', time: '10:00 AM', date: 'Upcoming: Today' },
    { id: 'class2', courseTitle: 'VLSI Design', time: '02:00 PM', date: 'Upcoming: Today' },
];

const libraryResources: LibraryResource[] = [
    {id: 'res1', name: 'Lecture_1_Intro.replay', size: '2.1 MB', type: 'replay'},
    {id: 'res2', name: 'AI_Fundamentals.pdf', size: '18 MB', type: 'pdf'},
    {id: 'res3', name: 'Project_1_Assets.zip', size: '35 MB', type: 'zip'},
    {id: 'res4', name: 'Lecture_2_Search_Algos.replay', size: '2.8 MB', type: 'replay'},
]

export const getStudentCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(courses), 300);
  });
};

export const getEducatorClasses = (): Promise<ScheduledClass[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(scheduledClasses), 300);
    });
};

export const getCourseById = (id: string): Promise<Course | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(courses.find(c => c.id === id)), 100);
    });
};


export const getLibraryResources = (courseId: string): Promise<LibraryResource[]> => {
    // In a real app, this would filter by courseId
    console.log(`Fetching resources for ${courseId}`);
    return new Promise((resolve) => {
      setTimeout(() => resolve(libraryResources), 300);
    });
};
