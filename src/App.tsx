import React, { useState, useEffect } from 'react';
import { StudentDentalRecord } from './types';
import {
  getStoredStudents,
  updateStudentRecord,
  resetToDefaultData,
  saveStoredStudents
} from './storage';
import { StudentLoginZone } from './components/StudentLoginZone';
import { StudentReportView } from './components/StudentReportView';
import { TeacherZone } from './components/TeacherZone';
import { TeacherLoginModal } from './components/TeacherLoginModal';
import { EditStudentModal } from './components/EditStudentModal';
import { RightsCheckerModal } from './components/RightsCheckerModal';
import {
  Smile,
  ShieldCheck,
  UserCheck,
  Lock,
  Stethoscope,
  School,
  HeartHandshake
} from 'lucide-react';

export default function App() {
  // Load students synchronously on initial mount from localStorage/mock
  const [students, setStudents] = useState<StudentDentalRecord[]>(() => getStoredStudents());
  const [activeZone, setActiveZone] = useState<'student' | 'teacher'>('student');
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState<boolean>(false);
  const [isTeacherLoginOpen, setIsTeacherLoginOpen] = useState<boolean>(false);
  
  // Student view state
  const [currentViewingStudent, setCurrentViewingStudent] = useState<StudentDentalRecord | null>(null);

  // Edit modal
  const [editingStudent, setEditingStudent] = useState<StudentDentalRecord | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Rights checker modal
  const [isRightsModalOpen, setIsRightsModalOpen] = useState<boolean>(false);
  const [rightsModalQuery, setRightsModalQuery] = useState<string>('');

  // Load students on initial mount
  useEffect(() => {
    const loaded = getStoredStudents();
    setStudents(loaded);
  }, []);

  const handleOpenRightsModal = (query?: string) => {
    setRightsModalQuery(query || '');
    setIsRightsModalOpen(true);
  };

  const handleTeacherZoneClick = () => {
    if (isTeacherAuthenticated) {
      setActiveZone('teacher');
    } else {
      setIsTeacherLoginOpen(true);
    }
  };

  const handleTeacherLoginSuccess = () => {
    setIsTeacherAuthenticated(true);
    setIsTeacherLoginOpen(false);
    setActiveZone('teacher');
  };

  const handleTeacherLogout = () => {
    setIsTeacherAuthenticated(false);
    setActiveZone('student');
    setCurrentViewingStudent(null);
  };

  const handleSaveStudent = (updated: StudentDentalRecord) => {
    const nextStudents = updateStudentRecord(updated);
    setStudents(nextStudents);
    setIsEditModalOpen(false);
    setEditingStudent(null);
    if (currentViewingStudent && currentViewingStudent.id === updated.id) {
      setCurrentViewingStudent(updated);
    }
  };

  const handleResetData = () => {
    if (window.confirm('คุณต้องการรีเซ็ตข้อมูลนักเรียนทั้งหมด 127 คนกลับเป็นค่าเริ่มต้นหรือไม่?')) {
      const reset = resetToDefaultData();
      setStudents(reset);
      setCurrentViewingStudent(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
      
      {/* Universal Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-teal-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & School Identity */}
          <div
            onClick={() => {
              setCurrentViewingStudent(null);
              setActiveZone('student');
            }}
            className="flex items-center space-x-3 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
                <span>กรมธรรม์ฟันดี ยิ้มมีความสุข</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
                  127 คน
                </span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <School className="w-3 h-3 text-teal-600" />
                โรงเรียนวัดกรมธรรม์ (ป.1 - ป.6)
              </div>
            </div>
          </div>

          {/* Navigation Controls: Zone Switcher & Rights Check */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Rights Button */}
            <button
              onClick={() => handleOpenRightsModal()}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold border border-teal-200 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>เช็คสิทธิการรักษา</span>
            </button>

            {/* Zone Toggle Buttons */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                onClick={() => {
                  setActiveZone('student');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  activeZone === 'student'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>โซนนักเรียน/ผู้ปกครอง</span>
              </button>

              <button
                onClick={handleTeacherZoneClick}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  activeZone === 'teacher'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>โซนครูผู้ดูแล</span>
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Zone 1: Student Zone */}
        {activeZone === 'student' && (
          <>
            {currentViewingStudent ? (
              <StudentReportView
                student={currentViewingStudent}
                onOpenRightsModal={handleOpenRightsModal}
                onBack={() => setCurrentViewingStudent(null)}
              />
            ) : (
              <StudentLoginZone
                students={students}
                onSelectStudent={(student) => setCurrentViewingStudent(student)}
                onOpenRightsModal={handleOpenRightsModal}
              />
            )}
          </>
        )}

        {/* Zone 2: Teacher Zone */}
        {activeZone === 'teacher' && isTeacherAuthenticated && (
          <TeacherZone
            students={students}
            onEditStudent={(student) => {
              setEditingStudent(student);
              setIsEditModalOpen(true);
            }}
            onViewStudent={(student) => {
              setCurrentViewingStudent(student);
              setActiveZone('student');
            }}
            onOpenRightsModal={() => handleOpenRightsModal()}
            onLogout={handleTeacherLogout}
            onResetData={handleResetData}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span className="font-semibold text-slate-700">
              ตรวจสุขภาพช่องปากโดย: นักศึกษาทันตสาธารณสุข
            </span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-400">
            <span>โครงการกรมธรรม์ฟันดี ยิ้มมีความสุข โรงเรียนวัดกรมธรรม์ • นักเรียนทั้งหมด 127 คน (ป.1 - ป.6)</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TeacherLoginModal
        isOpen={isTeacherLoginOpen}
        onClose={() => setIsTeacherLoginOpen(false)}
        onSuccess={handleTeacherLoginSuccess}
      />

      <EditStudentModal
        isOpen={isEditModalOpen}
        student={editingStudent}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingStudent(null);
        }}
        onSave={handleSaveStudent}
      />

      <RightsCheckerModal
        isOpen={isRightsModalOpen}
        onClose={() => setIsRightsModalOpen(false)}
        initialQuery={rightsModalQuery}
      />

    </div>
  );
}
