import { StudentDentalRecord } from './types';
import { generateAll127Students } from './data';

const STORAGE_KEY = 'wat_krommatham_dental_records_v1';

export function getStoredStudents(): StudentDentalRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = generateAll127Students();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load students from localStorage', e);
  }
  const fallback = generateAll127Students();
  return fallback;
}

export function saveStoredStudents(students: StudentDentalRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (e) {
    console.error('Failed to save students to localStorage', e);
  }
}

export function updateStudentRecord(updatedStudent: StudentDentalRecord): StudentDentalRecord[] {
  const current = getStoredStudents();
  const next = current.map((s) => (s.id === updatedStudent.id ? updatedStudent : s));
  saveStoredStudents(next);
  return next;
}

export function resetToDefaultData(): StudentDentalRecord[] {
  const fresh = generateAll127Students();
  saveStoredStudents(fresh);
  return fresh;
}
