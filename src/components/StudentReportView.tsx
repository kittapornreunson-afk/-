import React, { useState } from 'react';
import { StudentDentalRecord } from '../types';
import {
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  Stethoscope,
  Smile,
  Shield,
  HelpCircle,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

interface StudentReportViewProps {
  student: StudentDentalRecord;
  onOpenRightsModal: (treatmentName?: string) => void;
  onBack: () => void;
}

export const StudentReportView: React.FC<StudentReportViewProps> = ({
  student,
  onOpenRightsModal,
  onBack
}) => {
  const [showCode, setShowCode] = useState(false);

  // Mask code for privacy: e.g. 101*** or ******
  const maskedCode = showCode
    ? student.studentCode
    : '••••••';

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 bg-white text-slate-700 hover:text-teal-700 hover:bg-teal-50 border border-slate-200 rounded-xl text-sm font-medium transition-all shadow-xs cursor-pointer"
        >
          ← ย้อนกลับไปค้นหา
        </button>

        <button
          onClick={() => onOpenRightsModal()}
          className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold shadow-xs transition-all cursor-pointer space-x-2"
        >
          <Shield className="w-4 h-4" />
          <span>ตรวจสอบสิทธิการรักษาของหัตถการ</span>
        </button>
      </div>

      {/* Main Student Card (Policy / Dental Insurance Certificate style) */}
      <div className="bg-white rounded-3xl shadow-xl border border-teal-100 overflow-hidden">
        
        {/* Certificate Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 text-white p-6 sm:p-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-medium text-teal-100 mb-2">
                <Smile className="w-4 h-4 text-emerald-300" />
                <span>โครงการส่งเสริมสุขภาพช่องปาก กรมธรรม์ฟันดี ยิ้มมีความสุข</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                ใบรายงานผลการตรวจสุขภาพช่องปาก
              </h1>
              <p className="text-teal-100 text-sm">
                โรงเรียนวัดกรมธรรม์ • สังกัดสำนักงานเขตพื้นที่การศึกษา
              </p>
            </div>

            {/* Student ID badge with privacy lock toggle */}
            <div className="bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10 self-start sm:self-auto text-right">
              <div className="text-[11px] text-teal-200 uppercase font-semibold">รหัสประจำตัวนักเรียน (Private)</div>
              <div className="flex items-center space-x-2 justify-end mt-1">
                <span className="font-mono text-xl font-bold tracking-widest text-emerald-300">
                  {maskedCode}
                </span>
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
                  title={showCode ? 'ซ่อนรหัส' : 'แสดงรหัส'}
                >
                  {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-[10px] text-teal-200/80 mt-1 flex items-center justify-end gap-1">
                <Lock className="w-3 h-3" /> รหัส 6 หลักป้องกันความเป็นส่วนตัว
              </div>
            </div>
          </div>
        </div>

        {/* Student Profile Info Bar */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 sm:px-8 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-slate-400 block text-xs">ชื่อ-นามสกุล</span>
            <span className="font-bold text-slate-800 text-base">{student.fullName}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">ระดับชั้น / ห้อง</span>
            <span className="font-bold text-slate-800 text-base">{student.grade} (ห้อง {student.classroom})</span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">เพศ / อายุ</span>
            <span className="font-bold text-slate-800 text-base">{student.gender} • {student.age} ปี</span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">วันที่ตรวจประเมิน</span>
            <span className="font-bold text-slate-800 text-base flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-teal-600" />
              {student.examDate}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Section 1: Dental Findings Summary Dashboard - Focused on Caries Count */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600" />
              ผลการตรวจสุขภาพช่องปาก (ผลการตรวจฟัน)
            </h2>

            <div className="max-w-xl mx-auto">
              {/* Primary Focused Card: Caries Count */}
              <div className={`p-6 sm:p-8 rounded-3xl border-2 text-center shadow-lg transition-all ${
                student.cariesCount > 0
                  ? 'bg-gradient-to-b from-rose-50 to-orange-50 border-rose-300 text-rose-950'
                  : 'bg-gradient-to-b from-emerald-50 to-teal-50 border-emerald-300 text-emerald-950'
              }`}>
                <div className="text-sm sm:text-base font-semibold text-slate-600 mb-2">
                  สรุปผลการตรวจฟันของ {student.fullName}
                </div>
                
                <div className="flex items-baseline justify-center gap-3 my-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500">
                    พบฟันผุ:
                  </span>
                  <span className={`text-6xl sm:text-7xl font-black ${
                    student.cariesCount > 0 ? 'text-rose-600' : 'text-emerald-600'
                  }`}>
                    {student.cariesCount}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-slate-600">
                    ซี่
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200/60">
                  {student.cariesCount === 0 ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span>สุขภาพฟันดีเยี่ยม ไม่พบฟันผุ</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-800 font-bold text-sm">
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                      <span>ตรวจพบฟันผุ {student.cariesCount} ซี่ ควรพาไปรับการรักษา</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-500 mt-3">
                  * ใช้สิทธิบัตรทอง 30 บาท รับบริการอุดฟันฟรี 100% ณ โรงพยาบาลส่งเสริมสุขภาพตำบล (รพ.สต.)
                </p>
              </div>

              {/* Status Banner */}
              <div className="mt-4 p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between text-xs text-teal-900">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-600" />
                  <span>ตรวจโดย: <strong>{student.examiner}</strong></span>
                </div>
                <button
                  onClick={() => onOpenRightsModal('อุดฟัน')}
                  className="font-bold text-teal-700 hover:text-teal-900 underline cursor-pointer"
                >
                  ตรวจสอบสิทธิการรักษา →
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical advice & Parent Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-600" />
                คำแนะนำในการดูแลฟัน
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {student.cariesCount > 0 
                  ? `แนะนำให้ผู้ปกครองพาน้องไปรับการอุดฟัน ${student.cariesCount} ซี่ ที่ รพ.สต. เพื่อป้องกันไม่ให้รอยผุลึกลงไปถึงโพรงประสาทฟัน และช่วยแปรงฟันก่อนนอนทุกวัน`
                  : 'สุขภาพฟันดีมาก ควรดูแลต่อเนื่องด้วยการแปรงฟันวันละ 2 ครั้ง เช้าและก่อนนอน นานอย่างน้อย 2 นาทีด้วยยาสีฟันผสมฟลูออไรด์'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-700" />
                สิทธิประโยชน์กรมธรรม์ฟันดี
              </h4>
              <p className="text-sm text-amber-950 leading-relaxed">
                {student.rightsCoverageInfo} นักเรียนสามารถนำใบนัดหรือแจ้งชื่อต่อเจ้าหน้าที่ รพ.สต. เพื่อรับบริการทันตกรรมตามสิทธิได้ฟรี
              </p>
            </div>
          </div>

          {/* Section 3: Examiner Signature Block */}
          <div className="border-t border-slate-200 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-3 bg-slate-50/60 p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-teal-600" />
              <span>ตรวจสุขภาพช่องปากโดย: <strong className="text-teal-900">{student.examiner}</strong></span>
            </div>
            <div className="text-slate-400">
              โรงเรียนวัดกรมธรรม์ (โครงการกรมธรรม์ฟันดี ยิ้มมีความสุข)
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
