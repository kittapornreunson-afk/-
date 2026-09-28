import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, ArrowRight, X } from 'lucide-react';

interface TeacherLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const TeacherLoginModal: React.FC<TeacherLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === '250969') {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 border border-teal-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto border border-teal-200">
            <KeyRound className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">เข้าสู่ระบบโซนครูผู้ดูแล</h3>
          <p className="text-xs text-slate-500">
            กรุณากรอกรหัสผ่าน 6 หลักเพื่อเข้าถึงระบบจัดการและแก้ไขข้อมูลการตรวจฟัน
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
              รหัสผ่านผู้ดูแลระบบ (ครูโรงเรียนวัดกรมธรรม์)
            </label>
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                maxLength={6}
                autoFocus
                placeholder="••••••"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center font-mono text-2xl tracking-[0.4em] focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>
            <div className="flex justify-end mt-1.5">
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="text-xs text-slate-400 hover:text-teal-600 cursor-pointer"
              >
                {showPin ? 'ซ่อนรหัส' : 'แสดงรหัส'}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center space-x-2 text-rose-700 text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>ยืนยันเข้าสู่ระบบ</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-[11px] text-slate-400 pt-1">
            * ระบบสำหรับครูผู้ดูแลโครงการ กรมธรรม์ฟันดี ยิ้มมีความสุข โรงเรียนวัดกรมธรรม์
          </p>
        </form>

      </div>
    </div>
  );
};
