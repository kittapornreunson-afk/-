export interface StudentDentalRecord {
  id: string; // e.g. "STD-001"
  studentCode: string; // 6-digit passcode e.g. "101001", "602127"
  fullName: string;
  grade: string; // "ป.1", "ป.2", "ป.3", "ป.4", "ป.5", "ป.6"
  classroom: string; // "1/1", "2/1", etc.
  gender: 'ชาย' | 'หญิง';
  age: number;
  examDate: string; // "2026-09-15"
  examiner: string; // "นักศึกษาทันตสาธารณสุข"
  
  // Dental findings
  cariesCount: number; // ฟันผุ (ซี่)
  filledCount: number; // ฟันอุดแล้ว (ซี่)
  missingCount: number; // ฟันหลอน/ถอน (ซี่)
  gingivitisStatus: 'ปกติ' | 'เหงือกอักเสบเล็กน้อย' | 'เหงือกอักเสบปานกลาง' | 'เหงือกอักเสบรุนแรง';
  tartarStatus: 'ไม่มีหินปูน' | 'มีเล็กน้อย' | 'มีปานกลาง' | 'มีมาก';
  oralHygieneScore: 'ดีมาก' | 'ดี' | 'พอใช้' | 'ควรปรับปรุง';
  
  // Recommendations / Treatment needed
  neededTreatments: string[]; // ['เคลือบหลุมร่องฟัน (Sealant)', 'ขูดหินปูน', 'อุดฟันน้ำนม 1 ซี่', 'เคลือบฟลูออไรด์']
  notes: string;
  rightsCoverageInfo: string; // สิทธิบัตรทอง / กรมธรรม์ฟันดี
  parentAdvice: string;
  followUpRequired: boolean;
}

export interface DentalTreatmentRight {
  id: string;
  category: 'ส่งเสริมป้องกัน' | 'รักษาทันตกรรม' | 'ฟื้นฟูสภาพ';
  name: string;
  universalCoverageGoldCard: {
    covered: boolean;
    conditions: string;
    copay: string;
  };
  socialSecurity: {
    covered: boolean;
    conditions: string;
    copay: string;
  };
  civilServant: {
    covered: boolean;
    conditions: string;
    copay: string;
  };
  studentDentalFund: {
    covered: boolean;
    conditions: string;
    description: string;
  };
  keywords: string[];
}
