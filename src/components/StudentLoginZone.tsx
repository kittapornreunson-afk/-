import React, { useState } from 'react';
import { StudentDentalRecord } from '../types';
import {
  Search,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

interface StudentLoginZoneProps {
  students: StudentDentalRecord[];
  onSelectStudent: (student: StudentDentalRecord) => void;
  onOpenRightsModal: () => void;
}

export const StudentLoginZone: React.FC<StudentLoginZoneProps> = ({
  students,
  onSelectStudent,
  onOpenRightsModal
}) => {
  const [nameQuery, setNameQuery] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [selectedStudentCandidate, setSelectedStudentCandidate] = useState<StudentDentalRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Autocomplete matching names
  const matchingStudents = nameQuery.trim().length >= 2
    ? students.filter((s) => s.fullName.toLowerCase().includes(nameQuery.trim().toLowerCase()))
    : [];

  const handleSelectCandidate = (student: StudentDentalRecord) => {
    setSelectedStudentCandidate(student);
    setNameQuery(student.fullName);
    setErrorMessage('');
  };

  const handleVerifyAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedStudentCandidate && !nameQuery.trim()) {
      setErrorMessage('กรุณาพิมพ์ชื่อหรือเลือกลูก/นักเรียน');
      return;
    }

    if (!passcode || passcode.trim().length !== 6) {
      setErrorMessage('กรุณากรอกรหัสผ่าน 6 หลักให้ถูกต้อง');
      return;
    }

    let target = selectedStudentCandidate;

    if (!target) {
      // Find by exact or close name
      const matches = students.filter(
        (s) => s.fullName.toLowerCase().trim() === nameQuery.toLowerCase().trim()
      );
      if (matches.length > 0) {
        target = matches[0];
      }
    }

    if (!target) {
      // Check if student exists by passcode directly
      const byCode = students.find((s) => s.studentCode === passcode.trim());
      if (byCode) {
        target = byCode;
      }
    }

    if (!target) {
      setErrorMessage('ไม่พบข้อมูลนักเรียนที่ตรงกับชื่อนี้ กรุณาเลือกจากรายชื่อที่ค้นพบ');
      return;
    }

    // Verify 6-digit passcode
    if (target.studentCode === passcode.trim()) {
      onSelectStudent(target);
    } else {
      setErrorMessage('รหัส 6 หลักไม่ถูกต้อง กรุณาตรวจสอบรหัสของนักเรียนอีกครั้ง');
    }
  };

  // Quick hint helper for preview/parents with fallback
  const sampleStudent = students && students.length > 0 ? students[0] : null;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Hero Welcome */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>ระบบตรวจสุขภาพช่องปาก โรงเรียนวัดกรมธรรม์</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          กรมธรรม์ฟันดี ยิ้มมีความสุข
        </h1>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          แสดงผลการตรวจฟันนักเรียน 127 คน (ชั้น ป.1 - ป.6) • ตรวจโดยนักศึกษาทันตสาธารณสุข
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 space-y-6">
        
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2 text-teal-700 font-bold text-lg">
            <Lock className="w-5 h-5" />
            <span>เข้าสู่ระบบดูผลการตรวจฟัน (โซนนักเรียนและผู้ปกครอง)</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            พิมพ์ชื่อลูกเพื่อค้นหา และใส่รหัส 6 หลักที่ได้รับจากโรงเรียน (ระบบจะซ่อนรหัสไว้เพื่อความปลอดภัย)
          </p>
        </div>

        <form onSubmit={handleVerifyAndLogin} className="space-y-5">
          
          {/* Step 1: Search student name */}
          <div className="relative">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              1. พิมพ์ชื่อลูกหรือนักเรียน (ค้นหาเร็ว)
            </label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="เช่น ภูริพัฒน์, กัญญาณัฐ, ปพิชญา..."
                value={nameQuery}
                onChange={(e) => {
                  setNameQuery(e.target.value);
                  setSelectedStudentCandidate(null);
                  setErrorMessage('');
                }}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-xs"
              />
            </div>

            {/* Autocomplete dropdown */}
            {nameQuery.trim().length >= 2 && !selectedStudentCandidate && matchingStudents.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-teal-200 rounded-xl shadow-xl z-30 max-h-56 overflow-y-auto divide-y divide-slate-100">
                <div className="px-3 py-1.5 bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase">
                  พบรายชื่อนักเรียน ({matchingStudents.length} คน) - กรุณาคลิกเลือก
                </div>
                {matchingStudents.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => handleSelectCandidate(s)}
                    className="w-full text-left px-4 py-2.5 hover:bg-teal-50 flex items-center justify-between text-sm transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="font-semibold text-slate-800">{s.fullName}</span>
                      <span className="text-xs text-slate-400 ml-2">ชั้น {s.grade} (ห้อง {s.classroom})</span>
                    </div>
                    <span className="text-xs text-teal-600 font-medium">เลือกคนนี้ →</span>
                  </button>
                ))}
              </div>
            )}

            {/* Selected confirmation chip */}
            {selectedStudentCandidate && (
              <div className="mt-2 p-2.5 bg-teal-50 border border-teal-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-teal-900">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>
                    เลือกนักเรียน: <strong>{selectedStudentCandidate.fullName}</strong> ({selectedStudentCandidate.grade})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStudentCandidate(null);
                    setNameQuery('');
                  }}
                  className="text-slate-400 hover:text-slate-600 text-xs underline cursor-pointer"
                >
                  เปลี่ยน
                </button>
              </div>
            )}
          </div>

          {/* Step 2: 6-digit Private Passcode */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. กรอกรหัส 6 หลัก (Private Passcode)
              </label>
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="text-xs text-teal-600 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
              >
                {showPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPasscode ? 'ซ่อนรหัส' : 'แสดงรหัส'}</span>
              </button>
            </div>

            <div className="relative">
              <input
                type={showPasscode ? 'text' : 'password'}
                maxLength={6}
                placeholder="••••••"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value.replace(/\D/g, ''));
                  setErrorMessage('');
                }}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-center font-mono text-2xl tracking-[0.4em] focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all shadow-xs"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" /> รหัส 6 หลักถูกซ่อนเพื่อป้องกันความเป็นส่วนตัวตามที่ผู้ปกครองต้องการ
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-rose-700 text-xs animate-shake">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl font-bold text-base shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>เข้าดูผลการตรวจฟัน</span>
            <ArrowRight className="w-5 h-5" />
          </button>

        </form>

        {/* Note on Passcode: retrieved only through Teacher System */}
        <div className="bg-teal-50/80 p-4 rounded-2xl border border-teal-200 text-xs text-teal-900 space-y-2">
          <div className="flex items-center space-x-1.5 font-bold text-teal-900">
            <Lock className="w-4 h-4 text-teal-700" />
            <span>การขอรับรหัสผ่าน 6 หลัก:</span>
          </div>
          <p className="leading-relaxed text-teal-800">
            รหัสผ่าน 6 หลักสำหรับดูผลการตรวจฟันของนักเรียนแต่ละคนถูกเก็บเป็นความลับ <strong>สามารถขอรับรหัสได้ผ่านคุณครูประจำชั้นหรือคุณครูผู้ดูแลระบบเท่านั้น</strong> เพื่อรักษาความเป็นส่วนตัวของข้อมูลสุขภาพนักเรียน
          </p>
        </div>

      </div>

      {/* Rights Checker Promo Box */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-emerald-900 text-base flex items-center justify-center sm:justify-start gap-2">
            <Stethoscope className="w-5 h-5 text-emerald-600" />
            ตรวจโดยนักศึกษาทันตสาธารณสุข
          </div>
          <p className="text-xs text-emerald-800">
            สงสัยว่าหัตถการใดบ้างที่ใช้สิทธิบัตรทองหรือกรมธรรม์ฟันดีได้ฟรี?
          </p>
        </div>
        <button
          onClick={onOpenRightsModal}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
        >
          ตรวจสอบสิทธิการรักษา →
        </button>
      </div>

    </div>
  );
};
