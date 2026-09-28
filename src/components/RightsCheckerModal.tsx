import React, { useState } from 'react';
import { DENTAL_RIGHTS_CATALOG } from '../data';
import { DentalTreatmentRight } from '../types';
import { Search, ShieldCheck, CheckCircle2, XCircle, Info, Stethoscope, Sparkles } from 'lucide-react';

interface RightsCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const RightsCheckerModal: React.FC<RightsCheckerModalProps> = ({
  isOpen,
  onClose,
  initialQuery = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedRight, setSelectedRight] = useState<DentalTreatmentRight | null>(
    DENTAL_RIGHTS_CATALOG[0]
  );
  const [activeCategory, setActiveCategory] = useState<string>('ทั้งหมด');

  if (!isOpen) return null;

  const categories = ['ทั้งหมด', 'ส่งเสริมป้องกัน', 'รักษาทันตกรรม', 'ฟื้นฟูสภาพ'];

  const filteredCatalog = DENTAL_RIGHTS_CATALOG.filter((item) => {
    const matchesCategory =
      activeCategory === 'ทั้งหมด' || item.category === activeCategory;
    const term = searchTerm.toLowerCase().trim();
    if (!term) return matchesCategory;

    const matchesName = item.name.toLowerCase().includes(term);
    const matchesKeywords = item.keywords.some((k) => k.toLowerCase().includes(term));
    const matchesConditions =
      item.universalCoverageGoldCard.conditions.toLowerCase().includes(term) ||
      item.studentDentalFund.description.toLowerCase().includes(term);

    return matchesCategory && (matchesName || matchesKeywords || matchesConditions);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-teal-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-xs">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">ระบบตรวจสอบสิทธิการรักษาทันตกรรม</h2>
              <p className="text-xs sm:text-sm text-teal-100">
                สิทธิบัตรทอง 30 บาท / ประกันสังคม / ข้าราชการ / กรมธรรม์ฟันดีนักเรียน
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search & Filters */}
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/70">
          <div className="relative mb-3">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="พิมพ์ชื่อหัตถการ เช่น เคลือบหลุมร่องฟัน, ขูดหินปูน, อุดฟัน, ถอนฟัน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ล้างคำค้น
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-500 mr-1 font-medium">หมวดหมู่:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body: Master-Detail Layout */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          {/* List of Treatments */}
          <div className="md:col-span-5 p-3 sm:p-4 space-y-2 overflow-y-auto max-h-[50vh] md:max-h-full">
            <div className="text-xs font-semibold text-slate-400 px-2 uppercase tracking-wider mb-2">
              รายการหัตถการ ({filteredCatalog.length})
            </div>
            {filteredCatalog.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                ไม่พบหัตถการที่ตรงกับการค้นหา
              </div>
            ) : (
              filteredCatalog.map((item) => {
                const isSelected = selectedRight?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedRight(item)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/70 shadow-xs text-teal-900 ring-1 ring-teal-500'
                        : 'border-slate-200 bg-white hover:border-teal-200 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
                        {item.category}
                      </span>
                      <span className="text-xs text-emerald-600 font-medium flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        บัตรทองฟรี
                      </span>
                    </div>
                    <div className="font-semibold text-sm mt-1.5 line-clamp-1">{item.name}</div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {item.studentDentalFund.description}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Details Pane */}
          <div className="md:col-span-7 p-4 sm:p-6 overflow-y-auto bg-slate-50/40">
            {selectedRight ? (
              <div className="space-y-4">
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 mb-1.5">
                    {selectedRight.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {selectedRight.name}
                  </h3>
                </div>

                {/* Highlight: โรงเรียนวัดกรมธรรม์ & กรมธรรม์ฟันดี */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 shadow-xs">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-900">
                        สิทธิประโยชน์โครงการ "กรมธรรม์ฟันดี โรงเรียนวัดกรมธรรม์"
                      </h4>
                      <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                        {selectedRight.studentDentalFund.conditions}
                      </p>
                      <p className="text-xs font-medium text-emerald-700 mt-1.5 bg-emerald-100/60 p-2 rounded-lg">
                        📌 {selectedRight.studentDentalFund.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main 3 Rights Comparison */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    สิทธิการรักษาพยาบาลหลักของประเทศ
                  </div>

                  {/* 1. สิทธิบัตรทอง (Universal Coverage) */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="font-bold text-sm text-slate-900">
                          สิทธิหลักประกันสุขภาพถ้วนหน้า (บัตรทอง 30 บาท)
                        </span>
                      </div>
                      <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-md">
                        {selectedRight.universalCoverageGoldCard.copay}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedRight.universalCoverageGoldCard.conditions}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400 bg-slate-50 p-2 rounded-md">
                      💡 นักเรียนโรงเรียนวัดกรมธรรม์ใช้สิทธิได้ที่ รพ.สต. หรือหน่วยบริการตามสิทธิโดยไม่ต้องสำรองจ่าย
                    </div>
                  </div>

                  {/* 2. สิทธิประกันสังคม (Social Security) */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        <span className="font-bold text-sm text-slate-900">
                          สิทธิประกันสังคม (มาตรา 33 / 39)
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                        selectedRight.socialSecurity.covered ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {selectedRight.socialSecurity.copay}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedRight.socialSecurity.conditions}
                    </p>
                  </div>

                  {/* 3. สิทธิข้าราชการ (Civil Servant) */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                        <span className="font-bold text-sm text-slate-900">
                          สิทธิสวัสดิการข้าราชการ (รวมบุตร)
                        </span>
                      </div>
                      <span className="px-2 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-700 rounded-md">
                        {selectedRight.civilServant.copay}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedRight.civilServant.conditions}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start space-x-2.5 text-amber-900 text-xs">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>คำแนะนำจากนักศึกษาทันตสาธารณสุข:</strong> หากตรวจพบฟันผุในเด็กวัยเรียน แนะนำให้ใช้สิทธิบัตรทองรับการอุดฟันและเคลือบหลุมร่องฟันทันทีเพื่อรักษาสุขภาพฟันแท้ที่จะอยู่กับน้องตลอดชีวิต
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400 text-sm">
                เลือกหัตถการทางด้านซ้ายเพื่อดูรายละเอียดสิทธิการรักษา
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100/80 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>ตรวจและให้คำแนะนำโดย: นักศึกษาทันตสาธารณสุข</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-medium hover:bg-slate-700 transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
};
