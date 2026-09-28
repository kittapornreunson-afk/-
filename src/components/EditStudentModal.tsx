import React, { useState } from 'react';
import { StudentDentalRecord } from '../types';
import {
  X,
  Save,
  Plus,
  Trash2,
  Stethoscope,
  Smile,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface EditStudentModalProps {
  isOpen: boolean;
  student: StudentDentalRecord | null;
  onClose: () => void;
  onSave: (updated: StudentDentalRecord) => void;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({
  isOpen,
  student,
  onClose,
  onSave
}) => {
  if (!isOpen || !student) return null;

  const [formData, setFormData] = useState<StudentDentalRecord>({ ...student });
  const [newTreatmentInput, setNewTreatmentInput] = useState('');

  const handleAddTreatment = () => {
    if (!newTreatmentInput.trim()) return;
    setFormData({
      ...formData,
      neededTreatments: [...formData.neededTreatments, newTreatmentInput.trim()]
    });
    setNewTreatmentInput('');
  };

  const handleRemoveTreatment = (index: number) => {
    setFormData({
      ...formData,
      neededTreatments: formData.neededTreatments.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-teal-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-800 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">แก้ไขบันทึกผลการตรวจสุขภาพช่องปาก</h2>
              <p className="text-xs text-teal-100">
                {formData.fullName} ({formData.grade}) • รหัสประจำตัว: {formData.studentCode}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* General Information */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              ข้อมูลทั่วไปของนักเรียน
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  รหัส 6 หลัก (Private Passcode)
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={formData.studentCode}
                  onChange={(e) => setFormData({ ...formData, studentCode: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-mono tracking-widest text-slate-800 focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ระดับชั้น
                </label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="ป.1">ป.1</option>
                  <option value="ป.2">ป.2</option>
                  <option value="ป.3">ป.3</option>
                  <option value="ป.4">ป.4</option>
                  <option value="ป.5">ป.5</option>
                  <option value="ป.6">ป.6</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ห้อง
                </label>
                <input
                  type="text"
                  value={formData.classroom}
                  onChange={(e) => setFormData({ ...formData, classroom: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  วันที่ตรวจ
                </label>
                <input
                  type="date"
                  value={formData.examDate}
                  onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ผู้ตรวจ
                </label>
                <input
                  type="text"
                  value={formData.examiner}
                  onChange={(e) => setFormData({ ...formData, examiner: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Dental Conditions */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              สภาพช่องปากและฟัน
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ฟันผุ (ซี่)
                </label>
                <input
                  type="number"
                  min={0}
                  max={32}
                  value={formData.cariesCount}
                  onChange={(e) => setFormData({ ...formData, cariesCount: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ฟันอุดแล้ว (ซี่)
                </label>
                <input
                  type="number"
                  min={0}
                  max={32}
                  value={formData.filledCount}
                  onChange={(e) => setFormData({ ...formData, filledCount: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ฟันที่ถูกถอน/หลุด (ซี่)
                </label>
                <input
                  type="number"
                  min={0}
                  max={32}
                  value={formData.missingCount}
                  onChange={(e) => setFormData({ ...formData, missingCount: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ภาวะเหงือก
                </label>
                <select
                  value={formData.gingivitisStatus}
                  onChange={(e) => setFormData({ ...formData, gingivitisStatus: e.target.value as any })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="ปกติ">ปกติ</option>
                  <option value="เหงือกอักเสบเล็กน้อย">เหงือกอักเสบเล็กน้อย</option>
                  <option value="เหงือกอักเสบปานกลาง">เหงือกอักเสบปานกลาง</option>
                  <option value="เหงือกอักเสบรุนแรง">เหงือกอักเสบรุนแรง</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  คราบหินปูน
                </label>
                <select
                  value={formData.tartarStatus}
                  onChange={(e) => setFormData({ ...formData, tartarStatus: e.target.value as any })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="ไม่มีหินปูน">ไม่มีหินปูน</option>
                  <option value="มีเล็กน้อย">มีเล็กน้อย</option>
                  <option value="มีปานกลาง">มีปานกลาง</option>
                  <option value="มีมาก">มีมาก</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  ระดับความสะอาดช่องปาก
                </label>
                <select
                  value={formData.oralHygieneScore}
                  onChange={(e) => setFormData({ ...formData, oralHygieneScore: e.target.value as any })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
                >
                  <option value="ดีมาก">ดีมาก</option>
                  <option value="ดี">ดี</option>
                  <option value="พอใช้">พอใช้</option>
                  <option value="ควรปรับปรุง">ควรปรับปรุง</option>
                </select>
              </div>
            </div>
          </div>

          {/* Needed Treatments */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              หัตถการที่แนะนำ / ต้องรับการรักษา
            </h3>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="เพิ่มหัตถการ เช่น อุดฟัน 1 ซี่, เคลือบหลุมร่องฟัน, ขูดหินปูน..."
                value={newTreatmentInput}
                onChange={(e) => setNewTreatmentInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTreatment();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddTreatment}
                className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> เพิ่ม
              </button>
            </div>

            <div className="space-y-1.5">
              {formData.neededTreatments.map((treatment, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 text-sm"
                >
                  <span className="text-slate-800">{treatment}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTreatment(idx)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Notes & Parent Advice */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                บันทึกการตรวจทางคลินิก (Clinical Notes)
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                คำแนะนำสำหรับผู้ปกครอง (Parent Advice)
              </label>
              <textarea
                rows={2}
                value={formData.parentAdvice}
                onChange={(e) => setFormData({ ...formData, parentAdvice: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="followUp"
                checked={formData.followUpRequired}
                onChange={(e) => setFormData({ ...formData, followUpRequired: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
              />
              <label htmlFor="followUp" className="text-sm font-medium text-slate-700 cursor-pointer">
                จำเป็นต้องได้รับการติดตาม / ส่งต่อพบทันตแพทย์ที่ รพ.สต.
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" /> บันทึกการเปลี่ยนแปลง
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
