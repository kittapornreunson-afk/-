import React, { useState } from 'react';
import { StudentDentalRecord } from '../types';
import {
  Users,
  Search,
  Edit,
  Eye,
  FileSpreadsheet,
  Download,
  AlertTriangle,
  CheckCircle2,
  Lock,
  EyeOff,
  PlusCircle,
  Sparkles,
  RefreshCw,
  LogOut
} from 'lucide-react';

interface TeacherZoneProps {
  students: StudentDentalRecord[];
  onEditStudent: (student: StudentDentalRecord) => void;
  onViewStudent: (student: StudentDentalRecord) => void;
  onOpenRightsModal: () => void;
  onLogout: () => void;
  onResetData: () => void;
}

export const TeacherZone: React.FC<TeacherZoneProps> = ({
  students,
  onEditStudent,
  onViewStudent,
  onOpenRightsModal,
  onLogout,
  onResetData
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('ทั้งหมด');
  const [filterNeedsFollowUp, setFilterNeedsFollowUp] = useState<boolean>(false);
  const [showCodes, setShowCodes] = useState<boolean>(false);

  // Summary statistics
  const totalCount = students.length;
  const cariesCountTotal = students.reduce((acc, s) => acc + s.cariesCount, 0);
  const studentsWithCaries = students.filter((s) => s.cariesCount > 0).length;
  const studentsNeedingFollowUp = students.filter((s) => s.followUpRequired).length;
  const healthyCount = students.filter((s) => s.cariesCount === 0 && s.gingivitisStatus === 'ปกติ').length;

  const grades = ['ทั้งหมด', 'ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6'];

  const filteredStudents = students.filter((student) => {
    const matchesGrade = selectedGrade === 'ทั้งหมด' || student.grade === selectedGrade;
    const matchesFollowUp = !filterNeedsFollowUp || student.followUpRequired;
    
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      student.fullName.toLowerCase().includes(term) ||
      student.studentCode.toLowerCase().includes(term) ||
      student.id.toLowerCase().includes(term);

    return matchesGrade && matchesFollowUp && matchesSearch;
  });

  // Export to CSV function
  const exportToCSV = () => {
    const headers = [
      'รหัสประจำตัว',
      'ชื่อ-นามสกุล',
      'ระดับชั้น',
      'ห้อง',
      'เพศ',
      'อายุ',
      'ฟันผุ (ซี่)',
      'ฟันอุดแล้ว (ซี่)',
      'ฟันถอน (ซี่)',
      'ภาวะเหงือก',
      'คราบหินปูน',
      'ระดับความสะอาด',
      'หัตถการที่ต้องทำ',
      'ผู้ตรวจ'
    ];

    const rows = filteredStudents.map((s) => [
      `"${s.studentCode}"`,
      `"${s.fullName}"`,
      `"${s.grade}"`,
      `"${s.classroom}"`,
      `"${s.gender}"`,
      s.age,
      s.cariesCount,
      s.filledCount,
      s.missingCount,
      `"${s.gingivitisStatus}"`,
      `"${s.tartarStatus}"`,
      `"${s.oralHygieneScore}"`,
      `"${s.neededTreatments.join('; ')}"`,
      `"${s.examiner}"`
    ]);

    const csvContent =
      '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ผลตรวจฟัน_โรงเรียนวัดกรมธรรม์_${selectedGrade}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold text-emerald-200 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>โซนครูผู้ดูแลระบบ • รหัสผ่านผ่านการตรวจสอบแล้ว</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ระบบบริหารจัดการข้อมูลการตรวจฟันนักเรียน
            </h1>
            <p className="text-teal-100 text-sm mt-1">
              โรงเรียนวัดกรมธรรม์ • นักเรียนทั้งหมด 127 คน (ชั้น ป.1 - ป.6) • ตรวจโดยนักศึกษาทันตสาธารณสุข
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenRightsModal}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> ตรวจสอบสิทธิการรักษา
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-medium backdrop-blur-xs transition-all flex items-center gap-1.5 border border-white/20 cursor-pointer"
              title="ส่งออกเป็นไฟล์สำหรับเปิดใน Excel / Google Sheets"
            >
              <Download className="w-4 h-4" /> นำออก Excel/Sheets
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-rose-600/90 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> ออกจากระบบครู
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <div className="text-xs text-teal-200">นักเรียนทั้งหมด</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{totalCount} <span className="text-xs font-normal text-teal-200">คน</span></div>
            <div className="text-[11px] text-teal-200/80 mt-0.5">ครบถ้วน ป.1 - ป.6</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <div className="text-xs text-emerald-200">ฟันสุขภาพดีเยี่ยม</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 mt-1">{healthyCount} <span className="text-xs font-normal text-teal-200">คน</span></div>
            <div className="text-[11px] text-teal-200/80 mt-0.5">({((healthyCount / totalCount) * 100).toFixed(0)}% ของทั้งหมด)</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <div className="text-xs text-amber-200">พบฟันผุต้องรักษา</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1">{studentsWithCaries} <span className="text-xs font-normal text-teal-200">คน</span></div>
            <div className="text-[11px] text-teal-200/80 mt-0.5">รวม {cariesCountTotal} ซี่ (บัตรทองฟรี)</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10">
            <div className="text-xs text-rose-200">ต้องส่งต่อ รพ.สต.</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-300 mt-1">{studentsNeedingFollowUp} <span className="text-xs font-normal text-teal-200">คน</span></div>
            <div className="text-[11px] text-teal-200/80 mt-0.5">มีนัดหมายติดตามผล</div>
          </div>
        </div>
      </div>

      {/* Control & Filter Bar */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search by student name or code */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อนักเรียน, นามสกุล หรือรหัส 6 หลัก..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ล้าง
              </button>
            )}
          </div>

          {/* Privacy Toggle: Show or Hide Passcodes */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowCodes(!showCodes)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                showCodes
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              title="ซ่อน/แสดงรหัส 6 หลักเพื่อความเป็นส่วนตัวของนักเรียน"
            >
              {showCodes ? (
                <>
                  <EyeOff className="w-4 h-4 text-amber-600" />
                  <span>ซ่อนรหัส 6 หลัก (Private)</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-slate-600" />
                  <span>แสดงรหัส 6 หลัก</span>
                </>
              )}
            </button>

            <button
              onClick={onResetData}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="รีเซ็ตข้อมูลเริ่มต้น (127 คน)"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium mr-1">ชั้นเรียน:</span>
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedGrade === grade
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>

          <label className="flex items-center space-x-2 text-xs font-medium text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={filterNeedsFollowUp}
              onChange={(e) => setFilterNeedsFollowUp(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
            />
            <span>แสดงเฉพาะคนที่ต้องติดตาม/รักษา ({studentsNeedingFollowUp} คน)</span>
          </label>
        </div>
      </div>

      {/* Student Records Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800 text-sm">
              รายชื่อนักเรียน ({filteredStudents.length} คน)
            </span>
          </div>
          <span className="text-xs text-slate-500">
            ตรวจโดย: นักศึกษาทันตสาธารณสุข
          </span>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-slate-600 font-medium text-sm">ไม่พบข้อมูลนักเรียนที่ตรงกับเงื่อนไข</p>
            <p className="text-slate-400 text-xs mt-1">ลองเปลี่ยนคำค้นหาชื่อ หรือเลือกระดับชั้นอื่น</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">รหัส 6 หลัก (Private)</th>
                  <th className="px-4 py-3">ชื่อ - นามสกุล</th>
                  <th className="px-4 py-3">ระดับชั้น</th>
                  <th className="px-4 py-3 text-center">ฟันผุ (ซี่)</th>
                  <th className="px-4 py-3">ภาวะเหงือก</th>
                  <th className="px-4 py-3">หัตถการแนะนำ</th>
                  <th className="px-4 py-3 text-center">สิทธิบัตรทอง</th>
                  <th className="px-4 py-3 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => {
                  const hasCaries = student.cariesCount > 0;
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-teal-50/40 transition-colors"
                    >
                      {/* Passcode (Revealed in Teacher Zone for teacher to provide to parents) */}
                      <td className="px-4 py-3 font-mono text-xs">
                        <div className="flex items-center space-x-1.5">
                          <span className={`inline-flex items-center px-2 py-1 rounded-md font-bold tracking-wider ${
                            showCodes
                              ? 'bg-teal-50 text-teal-800 border border-teal-200'
                              : 'bg-slate-100 text-slate-400'
                          }`}>
                            {showCodes ? student.studentCode : '••••••'}
                          </span>
                          {showCodes && (
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard?.writeText(student.studentCode);
                                alert(`คัดลอกรหัส ${student.studentCode} ของ ${student.fullName} เรียบร้อย`);
                              }}
                              className="text-[10px] text-teal-700 bg-teal-100 hover:bg-teal-200 px-1.5 py-0.5 rounded cursor-pointer"
                              title="คัดลอกรหัสเพื่อส่งให้ผู้ปกครอง"
                            >
                              คัดลอก
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Name */}
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{student.fullName}</div>
                        <div className="text-[11px] text-slate-400">
                          {student.gender} • อายุ {student.age} ปี
                        </div>
                      </td>

                      {/* Grade */}
                      <td className="px-4 py-3">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {student.grade}/{student.classroom}
                        </span>
                      </td>

                      {/* Caries count */}
                      <td className="px-4 py-3 text-center">
                        {hasCaries ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                            {student.cariesCount} ซี่
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            0 (ปกติ)
                          </span>
                        )}
                      </td>

                      {/* Gingivitis */}
                      <td className="px-4 py-3 text-xs">
                        <span className={student.gingivitisStatus !== 'ปกติ' ? 'text-amber-700 font-medium' : 'text-slate-600'}>
                          {student.gingivitisStatus}
                        </span>
                      </td>

                      {/* Needed Treatments */}
                      <td className="px-4 py-3 text-xs max-w-xs">
                        <div className="truncate text-slate-700" title={student.neededTreatments.join(', ')}>
                          {student.neededTreatments.join(', ')}
                        </div>
                      </td>

                      {/* Rights info */}
                      <td className="px-4 py-3 text-center text-xs">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          ฟรี 100%
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => onViewStudent(student)}
                            className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-100/60 rounded-lg transition-colors cursor-pointer"
                            title="ดูใบรายงานผลตรวจฟัน"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEditStudent(student)}
                            className="p-1.5 text-teal-600 hover:text-teal-800 hover:bg-teal-100/60 rounded-lg transition-colors cursor-pointer"
                            title="แก้ไขข้อมูลผลตรวจฟัน"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info note */}
      <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs text-teal-900 flex items-start space-x-2">
        <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <div>
          <strong>หมายเหตุสำหรับครูผู้ดูแล:</strong> ข้อมูลทั้งหมดได้รับการบันทึกและตรวจสอบโดย <strong>นักศึกษาทันตสาธารณสุข</strong> ในโครงการส่งเสริมทันตสุขภาพโรงเรียนวัดกรมธรรม์ หากพบนักเรียนที่มีฟันผุลึกหรือเหงือกอักเสบ สามารถส่งต่อให้ผู้ปกครองพาไปรับการรักษาฟรีตามสิทธิบัตรทอง ณ รพ.สต. ในพื้นที่ได้ทันที
        </div>
      </div>

    </div>
  );
};
