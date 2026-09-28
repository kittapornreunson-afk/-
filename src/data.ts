import { DentalTreatmentRight, StudentDentalRecord } from './types';

// Dental rights guidelines and database for student healthcare / dental insurance
export const DENTAL_RIGHTS_CATALOG: DentalTreatmentRight[] = [
  {
    id: 'sealant',
    name: 'เคลือบหลุมร่องฟัน (Pit and Fissure Sealant)',
    category: 'ส่งเสริมป้องกัน',
    keywords: ['เคลือบหลุม', 'ซีแลนท์', 'sealant', 'ฟันกรามแท้', 'หลุมร่องฟัน'],
    universalCoverageGoldCard: {
      covered: true,
      conditions: 'ครอบคลุมฟรี 100% สำหรับเด็กอายุ 6-12 ปี (ฟันกรามแท้ซี่ที่ 1 และ 2)',
      copay: 'ฟรี (ไม่มีค่าใช้จ่าย)'
    },
    socialSecurity: {
      covered: false,
      conditions: 'ไม่ครอบคลุมในสิทธิประกันสังคมสำหรับผู้ใหญ่ (แต่ครอบคลุมสิทธิบัตรทองบุตร)',
      copay: 'เบิกไม่ได้'
    },
    civilServant: {
      covered: true,
      conditions: 'เบิกได้ตามอัตรากรมบัญชีกลางในสถานพยาบาลของรัฐ',
      copay: 'ฟรีตามสิทธิข้าราชการบุตร'
    },
    studentDentalFund: {
      covered: true,
      conditions: 'โครงการทันตกรรมส่งเสริมป้องกันในโรงเรียนวัดกรมธรรม์',
      description: 'ทำฟรี ณ รพ.สต. หรือหน่วยทันตกรรมเคลื่อนที่นักศึกษาทันตสาธารณสุข'
    }
  },
  {
    id: 'fluoride',
    name: 'เคลือบฟลูออไรด์เข้มข้น / ฟลูออไรด์วานิช (Fluoride Varnish)',
    category: 'ส่งเสริมป้องกัน',
    keywords: ['ฟลูออไรด์', 'เคลือบฟลูออไรด์', 'วานิช', 'fluoride'],
    universalCoverageGoldCard: {
      covered: true,
      conditions: 'ครอบคลุมฟรีสำหรับเด็กปฐมวัยและนักเรียนประถมกลุ่มเสี่ยงผุสูง ปีละ 1-2 ครั้ง',
      copay: 'ฟรี (ไม่มีค่าใช้จ่าย)'
    },
    socialSecurity: {
      covered: false,
      conditions: 'ไม่ครอบคลุม',
      copay: 'จ่ายเอง'
    },
    civilServant: {
      covered: true,
      conditions: 'เบิกได้ในสถานพยาบาลรัฐสำหรับเด็กกลุ่มเสี่ยง',
      copay: 'ฟรี'
    },
    studentDentalFund: {
      covered: true,
      conditions: 'ตรวจและทาเคลือบฟลูออไรด์ฟรีทุกภาคเรียน',
      description: 'บริการตรวจสุขภาพช่องปากและทาฟลูออไรด์โดยนักศึกษาทันตสาธารณสุข'
    }
  },
  {
    id: 'scaling',
    name: 'ขูดหินปูน / ทำความสะอาดคราบจุลินทรีย์ (Scaling)',
    category: 'ส่งเสริมป้องกัน',
    keywords: ['ขูดหินปูน', 'หินปูน', 'คราบหินปูน', 'scaling', 'เหงือกอักเสบ'],
    universalCoverageGoldCard: {
      covered: true,
      conditions: 'ครอบคลุมฟรีปีละ 1 ครั้ง หรือตามข้อบ่งชี้ทางทันตกรรมที่ รพ.สต./รพ.รัฐ',
      copay: 'ฟรี (ไม่มีค่าใช้จ่าย)'
    },
    socialSecurity: {
      covered: true,
      conditions: 'สิทธิผู้ประกันตน วงเงิน 900 บาท/ปี (สำหรับผู้ปกครอง)',
      copay: 'ไม่เกิน 900 บาทไม่ต้องสำรองจ่าย'
    },
    civilServant: {
      covered: true,
      conditions: 'เบิกได้ตามจ่ายจริงแต่ไม่เกินอัตรากระทรวงการคลัง (ปีละ 1-2 ครั้ง)',
      copay: 'เบิกตรงได้'
    },
    studentDentalFund: {
      covered: true,
      conditions: 'กรณีพบเหงือกอักเสบ/มีคราบหินปูน สามารถนำใบนัดรับบริการที่ รพ.สต.ได้ฟรี',
      description: 'โครงการกรมธรรม์ฟันดีโรงเรียนวัดกรมธรรม์ ประสานงานรับการรักษาฟรี'
    }
  },
  {
    id: 'filling',
    name: 'อุดฟัน (Dental Filling - ผสมเรซินหรืออมัลกัม)',
    category: 'รักษาทันตกรรม',
    keywords: ['อุดฟัน', 'ฟันผุ', 'filling', 'ฟันกรามผุ', 'อุดฟันน้ำนม', 'อุดฟันแท้'],
    universalCoverageGoldCard: {
      covered: true,
      conditions: 'ครอบคลุมฟรีทุกซี่ที่มีรอยผุทะลุถึงเนื้อฟัน ทั้งฟันน้ำนมและฟันแท้',
      copay: 'ฟรี (ไม่มีค่าใช้จ่าย)'
    },
    socialSecurity: {
      covered: true,
      conditions: 'รวมในวงเงินทันตกรรม 900 บาทต่อปี',
      copay: 'ใช้วงเงิน 900 บาท'
    },
    civilServant: {
      covered: true,
      conditions: 'เบิกได้ตามอัตราที่กระทรวงการคลังกำหนด',
      copay: 'ฟรีใน รพ.รัฐ'
    },
    studentDentalFund: {
      covered: true,
      conditions: 'นัดหมายอุดฟันด่วนสำหรับนักเรียนที่มีฟันผุลึกเพื่อป้องกันการลุกลามถึงโพรงประสาทฟัน',
      description: 'รับบริการอุดฟันฟรีภายใต้สิทธิบัตรทอง ณ โรงพยาบาลส่งเสริมสุขภาพตำบล'
    }
  },
  {
    id: 'extraction',
    name: 'ถอนฟันน้ำนม / ถอนฟันแท้ที่ผุจนไม่สามารถรักษาได้ (Tooth Extraction)',
    category: 'รักษาทันตกรรม',
    keywords: ['ถอนฟัน', 'ถอนฟันน้ำนม', 'ถอนฟันแท้', 'extraction', 'ฟันโยก'],
    universalCoverageGoldCard: {
      covered: true,
      conditions: 'ครอบคลุมฟรี 100% ทุกกรณีที่มีข้อบ่งชี้ทางทันตกรรม',
      copay: 'ฟรี (ไม่มีค่าใช้จ่าย)'
    },
    socialSecurity: {
      covered: true,
      conditions: 'รวมในสิทธิ 900 บาท/ปี',
      copay: 'ใช้วงเงิน 900 บาท'
    },
    civilServant: {
      covered: true,
      conditions: 'เบิกได้เต็มจำนวนตามระเบียบ',
      copay: 'ฟรีใน รพ.รัฐ'
    },
    studentDentalFund: {
      covered: true,
      conditions: 'ฟันน้ำนมค้าง ฟันแท้ขึ้นซ้อน หรือฟันผุเรื้อรังมีหนอง',
      description: 'ออกใบนัดหมายส่งต่อคลินิกทันตกรรม รพ.สต. เพื่อถอนฟันอย่างปลอดภัย'
    }
  },
  {
    id: 'pulpotomy',
    name: 'รักษาโพรงประสาทฟันน้ำนม (Pulpotomy / Pulpectomy)',
    category: 'รักษาทันตกรรม',
    keywords: ['รักษารากฟัน', 'โพรงประสาทฟัน', 'ครอบฟันเหล็ก', 'pulpotomy', 'ปวดฟัน'],
    universalCoverageGoldCard: {
      covered: true,
      conditions: 'ครอบคลุมในชุดสิทธิประโยชน์บัตรทองสำหรับเด็ก (รักษาเพื่อเก็บฟันน้ำนมไว้รอฟันแท้)',
      copay: 'ฟรี (ไม่มีค่าใช้จ่าย)'
    },
    socialSecurity: {
      covered: false,
      conditions: 'ไม่ครอบคลุมการรักษาคลองรากฟันในสิทธิปกติ',
      copay: 'จ่ายเอง'
    },
    civilServant: {
      covered: true,
      conditions: 'เบิกได้ตามอัตรากรมบัญชีกลางใน รพ.รัฐ',
      copay: 'มีส่วนต่างวัสดุบางรายการ'
    },
    studentDentalFund: {
      covered: true,
      conditions: 'สำหรับเคสนักเรียนที่มีอาการปวดฟันตอนกลางคืนหรือผุลึก',
      description: 'ส่งต่อโรงพยาบาลศูนย์/โรงพยาบาลชุมชนเพื่อรักษาเฉพาะทางทันตกรรมเด็ก'
    }
  },
  {
    id: 'stainless_crown',
    name: 'ครอบฟันเหล็กไร้สนิมสำหรับฟันน้ำนม (Stainless Steel Crown - SSC)',
    category: 'ฟื้นฟูสภาพ',
    keywords: ['ครอบฟันเหล็ก', 'ครอบฟันเด็ก', 'crown', 'ssc'],
    universalCoverageGoldCard: {
      covered: true,
      conditions: 'ครอบคลุมในสิทธิบัตรทองสำหรับเด็กที่ผ่านการรักษารากฟันน้ำนมหรือผุหลายด้าน',
      copay: 'ฟรี'
    },
    socialSecurity: {
      covered: false,
      conditions: 'ไม่ครอบคลุม',
      copay: 'จ่ายเอง'
    },
    civilServant: {
      covered: true,
      conditions: 'เบิกได้บางส่วนตามเกณฑ์',
      copay: 'อาจมีส่วนเกินค่าแล็บ'
    },
    studentDentalFund: {
      covered: true,
      conditions: 'แนะนำในนักเรียนที่ผุฟันกรามน้ำนมรุนแรงเพื่อให้เคี้ยวอาหารได้ปกติ',
      description: 'ประสานงาน รพ.สต./รพ.ชุมชน สิทธิบัตรทองคุ้มครอง'
    }
  }
];

// Generate exactly 127 students across Prathom 1 to 6
export const INITIAL_STUDENTS: StudentDentalRecord[] = [
  // ป.1 (21 คน)
  {
    id: 'STD-001',
    studentCode: '101001',
    fullName: 'ด.ช. ภูริพัฒน์ เจริญสุข',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'ชาย',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 0,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'ดีมาก',
    neededTreatments: ['เคลือบหลุมร่องฟัน (Sealant)', 'เคลือบฟลูออไรด์'],
    notes: 'สุขภาพฟันสะอาดดีมาก แนะนำแปรงฟันสูตร 2-2-2',
    rightsCoverageInfo: 'สิทธิหลักประกันสุขภาพถ้วนหน้า (บัตรทอง) เคลือบหลุมร่องฟันฟรี',
    parentAdvice: 'ขอแสดงความยินดีกับผู้ปกครอง น้องไม่มีฟันผุ แนะนำพาไปเคลือบหลุมร่องฟันเพื่อป้องกันระยะยาว',
    followUpRequired: false
  },
  {
    id: 'STD-002',
    studentCode: '101002',
    fullName: 'ด.ญ. กัญญาณัฐ วิเชียรศรี',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'หญิง',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 2,
    filledCount: 1,
    missingCount: 0,
    gingivitisStatus: 'เหงือกอักเสบเล็กน้อย',
    tartarStatus: 'มีเล็กน้อย',
    oralHygieneScore: 'พอใช้',
    neededTreatments: ['อุดฟัน 2 ซี่ (ฟันกรามน้ำนมล่างขวาและซ้าย)', 'ขูดหินปูน', 'เคลือบฟลูออไรด์'],
    notes: 'พบฟันน้ำนมผุด้านบดเคี้ยว 2 ซี่ มีคราบจุลินทรีย์บริเวณคอฟัน',
    rightsCoverageInfo: 'สิทธิบัตรทองครอบคลุมการอุดฟันและขูดหินปูนฟรี 100%',
    parentAdvice: 'ควรพาน้องไปอุดฟันที่ รพ.สต. ใกล้บ้านก่อนรอยผุจะลึกถึงโพรงประสาท และช่วยดูแลการแปรงฟันก่อนนอน',
    followUpRequired: true
  },
  {
    id: 'STD-003',
    studentCode: '101003',
    fullName: 'ด.ช. ธนกฤต มั่นคง',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'ชาย',
    age: 6,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 1,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'ดี',
    neededTreatments: ['อุดฟัน 1 ซี่', 'เคลือบหลุมร่องฟัน (Sealant)'],
    notes: 'ฟันแท้กรามล่างเริ่มขึ้นสมบูรณ์',
    rightsCoverageInfo: 'สิทธิบัตรทอง ฟรีอุดฟันและเคลือบหลุมร่องฟัน',
    parentAdvice: 'พาไปอุดฟันผุระยะเริ่มต้น 1 ซี่ ไม่เจ็บแน่นอนครับ',
    followUpRequired: true
  },
  {
    id: 'STD-004',
    studentCode: '101004',
    fullName: 'ด.ญ. ปพิชญา สายสมร',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'หญิง',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 3,
    filledCount: 0,
    missingCount: 1,
    gingivitisStatus: 'เหงือกอักเสบปานกลาง',
    tartarStatus: 'มีปานกลาง',
    oralHygieneScore: 'ควรปรับปรุง',
    neededTreatments: ['อุดฟัน 3 ซี่', 'ขูดหินปูน', 'ถอนฟันน้ำนมโยก 1 ซี่'],
    notes: 'มีเศษอาหารติดซอกฟันบ่อย เหงือกมีเลือดออกง่ายเวลาแปรงฟัน',
    rightsCoverageInfo: 'สิทธิบัตรทอง รักษาฟรีทุกรายการที่ รพ.สต. และโรงพยาบาลรัฐ',
    parentAdvice: 'แนะนำพบหมอฟันด่วนเพื่อขูดหินปูนและอุดฟัน ฝึกใช้ไหมขัดฟัน',
    followUpRequired: true
  },
  {
    id: 'STD-005',
    studentCode: '101005',
    fullName: 'ด.ช. ณัฐดนัย รัตนโกสินทร์',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'ชาย',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 0,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'ดีมาก',
    neededTreatments: ['เคลือบฟลูออไรด์'],
    notes: 'ฟันสวยเรียงตัวดีมาก สุขอนามัยยอดเยี่ยม',
    rightsCoverageInfo: 'สิทธิบัตรทอง / กรมธรรม์ฟันดีโรงเรียนวัดกรมธรรม์',
    parentAdvice: 'รักษาสุขอนามัยได้ดีเลิศ ขอชื่นชมคุณพ่อคุณแม่ครับ',
    followUpRequired: false
  },
  {
    id: 'STD-006',
    studentCode: '101006',
    fullName: 'ด.ญ. ชนากานต์ สิทธิชัย',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'หญิง',
    age: 6,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 2,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'เหงือกอักเสบเล็กน้อย',
    tartarStatus: 'มีเล็กน้อย',
    oralHygieneScore: 'พอใช้',
    neededTreatments: ['อุดฟันน้ำนม 2 ซี่', 'เคลือบฟลูออไรด์'],
    notes: 'ชอบรับประทานขนมหวานและนมเปรี้ยวกล่อง',
    rightsCoverageInfo: 'สิทธิบัตรทอง อุดฟันฟรี',
    parentAdvice: 'ลดการดื่มนมเปรี้ยวหรือน้ำอัดลม และแปรงฟันหลังอาหารกลางวัน',
    followUpRequired: true
  },
  {
    id: 'STD-007',
    studentCode: '101007',
    fullName: 'ด.ช. วรภพ บุณยเกียรติ',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'ชาย',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 0,
    filledCount: 1,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'ดี',
    neededTreatments: ['เคลือบหลุมร่องฟัน (Sealant)'],
    notes: 'เคยอุดฟันมาแล้ว 1 ซี่ รอยอุดยังแน่นดี',
    rightsCoverageInfo: 'สิทธิบัตรทอง เคลือบหลุมร่องฟันกรามแท้ฟรี',
    parentAdvice: 'ดูแลต่อเนื่องได้ดีครับ ฟันกรามแท้เริ่มขึ้นแล้วควรเคลือบหลุมร่องฟัน',
    followUpRequired: false
  },
  {
    id: 'STD-008',
    studentCode: '101008',
    fullName: 'ด.ญ. นลินรัตน์ ศิริพงษ์',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'หญิง',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 1,
    filledCount: 2,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'มีเล็กน้อย',
    oralHygieneScore: 'ดี',
    neededTreatments: ['อุดฟัน 1 ซี่', 'ขูดหินปูน'],
    notes: 'ฟันผุจุดเล็กๆ ด้านข้าง',
    rightsCoverageInfo: 'สิทธิบัตรทอง ฟรีอุดฟันและขูดหินปูน',
    parentAdvice: 'ไปอุดรอยผุเล็กๆ ก่อนจะลุกลามครับ',
    followUpRequired: true
  },
  {
    id: 'STD-009',
    studentCode: '101009',
    fullName: 'ด.ช. อัครวินท์ ทองคำ',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'ชาย',
    age: 6,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 4,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'เหงือกอักเสบปานกลาง',
    tartarStatus: 'มีปานกลาง',
    oralHygieneScore: 'ควรปรับปรุง',
    neededTreatments: ['อุดฟัน 4 ซี่', 'ขูดหินปูน', 'เคลือบฟลูออไรด์'],
    notes: 'มีฟันผุหลายซี่ ฟันหน้าและฟันกราม แปรงฟันยังไม่ทั่วถึง',
    rightsCoverageInfo: 'สิทธิบัตรทอง อุดฟันฟรีทุกซี่ที่ รพ.สต.',
    parentAdvice: 'ขอความร่วมมือผู้ปกครองช่วยน้องแปรงฟันก่อนนอนอย่างน้อย 2 นาทีด้วยยาสีฟันผสมฟลูออไรด์ 1000-1500 ppm',
    followUpRequired: true
  },
  {
    id: 'STD-010',
    studentCode: '101010',
    fullName: 'ด.ญ. พิชญาภา วงศ์สุวรรณ',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'หญิง',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 0,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'ดีมาก',
    neededTreatments: ['เคลือบฟลูออไรด์'],
    notes: 'ฟันสะอาด แปรงฟันเก่งมาก',
    rightsCoverageInfo: 'สิทธิบัตรทอง',
    parentAdvice: 'ฟันแข็งแรงมากครับ ชื่นชมน้องและผู้ปกครอง',
    followUpRequired: false
  },
  {
    id: 'STD-011',
    studentCode: '101011',
    fullName: 'ด.ช. ภัทรดนัย บุญช่วย',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'ชาย',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 2,
    filledCount: 1,
    missingCount: 0,
    gingivitisStatus: 'เหงือกอักเสบเล็กน้อย',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'พอใช้',
    neededTreatments: ['อุดฟัน 2 ซี่'],
    notes: 'ฟันกรามน้ำนมผุด้านซอกฟัน',
    rightsCoverageInfo: 'สิทธิบัตรทอง ฟรีอุดฟัน',
    parentAdvice: 'ใช้ไหมขัดฟันช่วยทำความสะอาดซอกฟันวันละ 1 ครั้ง',
    followUpRequired: true
  },
  {
    id: 'STD-012',
    studentCode: '101012',
    fullName: 'ด.ญ. ธัญชนก ประเสริฐ',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'หญิง',
    age: 6,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 0,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'ดี',
    neededTreatments: ['เคลือบหลุมร่องฟัน (Sealant)'],
    notes: 'ฟันแท้เริ่มงอกขึ้นมา 2 ซี่ล่าง',
    rightsCoverageInfo: 'สิทธิบัตรทอง เคลือบหลุมร่องฟันฟรี',
    parentAdvice: 'เฝ้าระวังฟันแท้ที่เพิ่งงอก เคลือบหลุมร่องฟันช่วยลดเสี่ยงผุได้ถึง 80%',
    followUpRequired: false
  },
  {
    id: 'STD-013',
    studentCode: '101013',
    fullName: 'ด.ช. ปัณณธร ศรีสวัสดิ์',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'ชาย',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 3,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'เหงือกอักเสบเล็กน้อย',
    tartarStatus: 'มีเล็กน้อย',
    oralHygieneScore: 'พอใช้',
    neededTreatments: ['อุดฟัน 3 ซี่', 'ขูดหินปูน'],
    notes: 'ฟันกรามบนผุเป็นรูชัดเจน',
    rightsCoverageInfo: 'สิทธิบัตรทอง ครอบคลุมการอุดฟันฟรี',
    parentAdvice: 'รีบพาไปรับการอุดฟันก่อนมีอาการปวดครับ',
    followUpRequired: true
  },
  {
    id: 'STD-014',
    studentCode: '101014',
    fullName: 'ด.ญ. ณัชชา แสงเพชร',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'หญิง',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 1,
    filledCount: 1,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'ดี',
    neededTreatments: ['อุดฟัน 1 ซี่', 'เคลือบฟลูออไรด์'],
    notes: 'พบรอยผุระยะแรกด้านสบฟัน',
    rightsCoverageInfo: 'สิทธิบัตรทอง',
    parentAdvice: 'รับการอุดฟัน 1 จุด สุขภาพโดยรวมค่อนข้างดีครับ',
    followUpRequired: true
  },
  {
    id: 'STD-015',
    studentCode: '101015',
    fullName: 'ด.ช. ศุภณัฐ วัฒนาการ',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'ชาย',
    age: 6,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 0,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'ดีมาก',
    neededTreatments: ['เคลือบฟลูออไรด์'],
    notes: 'ไม่พบฟันผุ แปรงฟันสะอาด',
    rightsCoverageInfo: 'สิทธิบัตรทอง',
    parentAdvice: 'รักษามาตรฐานการแปรงฟันต่อไปครับ',
    followUpRequired: false
  },
  {
    id: 'STD-016',
    studentCode: '101016',
    fullName: 'ด.ญ. ภัสสร เจริญผล',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'หญิง',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 2,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'เหงือกอักเสบเล็กน้อย',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'พอใช้',
    neededTreatments: ['อุดฟัน 2 ซี่'],
    notes: 'ผุฟันกรามน้ำนมด้านล่างทั้งสองข้าง',
    rightsCoverageInfo: 'สิทธิบัตรทอง ฟรีอุดฟัน',
    parentAdvice: 'พาน้องไปอุดฟันเพื่อไม่ให้ปวดตอนเคี้ยวข้าวครับ',
    followUpRequired: true
  },
  {
    id: 'STD-017',
    studentCode: '101017',
    fullName: 'ด.ช. วชิรวิทย์ สหพัฒน์',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'ชาย',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 1,
    filledCount: 2,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'มีเล็กน้อย',
    oralHygieneScore: 'ดี',
    neededTreatments: ['อุดฟัน 1 ซี่', 'ขูดหินปูน'],
    notes: 'คราบหินปูนเกาะบริเวณฟันหน้าล่างด้านใน',
    rightsCoverageInfo: 'สิทธิบัตรทอง ฟรีขูดหินปูนและอุดฟัน',
    parentAdvice: 'ขูดหินปูนออกจะช่วยลดการสะสมเชื้อแบคทีเรียครับ',
    followUpRequired: true
  },
  {
    id: 'STD-018',
    studentCode: '101018',
    fullName: 'ด.ญ. ลลิตา สมบูรณ์กิจ',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'หญิง',
    age: 6,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 0,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'ดีมาก',
    neededTreatments: ['เคลือบหลุมร่องฟัน (Sealant)'],
    notes: 'สุขภาพช่องปากดีเยี่ยม',
    rightsCoverageInfo: 'สิทธิบัตรทอง',
    parentAdvice: 'ชื่นชมการดูแลฟันของครอบครัวครับ',
    followUpRequired: false
  },
  {
    id: 'STD-019',
    studentCode: '101019',
    fullName: 'ด.ช. ภาณุพงศ์ ใจเย็น',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'ชาย',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 2,
    filledCount: 1,
    missingCount: 0,
    gingivitisStatus: 'เหงือกอักเสบเล็กน้อย',
    tartarStatus: 'มีเล็กน้อย',
    oralHygieneScore: 'พอใช้',
    neededTreatments: ['อุดฟัน 2 ซี่', 'เคลือบฟลูออไรด์'],
    notes: 'มีเศษลูกอมติดฟันบ่อย แนะนำบ้วนน้ำหลังกินขนม',
    rightsCoverageInfo: 'สิทธิบัตรทอง ฟรีอุดฟัน',
    parentAdvice: 'เตือนน้องดื่มน้ำเปล่าตามหลังทานขนม และแปรงฟันก่อนนอน',
    followUpRequired: true
  },
  {
    id: 'STD-020',
    studentCode: '101020',
    fullName: 'ด.ญ. วรัญญา มิ่งขวัญ',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'หญิง',
    age: 7,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 0,
    filledCount: 1,
    missingCount: 0,
    gingivitisStatus: 'ปกติ',
    tartarStatus: 'ไม่มีหินปูน',
    oralHygieneScore: 'ดี',
    neededTreatments: ['เคลือบฟลูออไรด์'],
    notes: 'ฟันอุดสภาพดีมาก ไม่มีรอยผุใหม่',
    rightsCoverageInfo: 'สิทธิบัตรทอง',
    parentAdvice: 'ดูแลได้ต่อเนื่องดีเยี่ยมครับ',
    followUpRequired: false
  },
  {
    id: 'STD-021',
    studentCode: '101021',
    fullName: 'ด.ช. ชัยวัฒน์ เกียรติสกุล',
    grade: 'ป.1',
    classroom: '1/1',
    gender: 'ชาย',
    age: 6,
    examDate: '2026-09-18',
    examiner: 'นักศึกษาทันตสาธารณสุข',
    cariesCount: 3,
    filledCount: 0,
    missingCount: 0,
    gingivitisStatus: 'เหงือกอักเสบปานกลาง',
    tartarStatus: 'มีปานกลาง',
    oralHygieneScore: 'ควรปรับปรุง',
    neededTreatments: ['อุดฟัน 3 ซี่', 'ขูดหินปูน'],
    notes: 'มีคราบจุลินทรีย์หนาแน่น เหงือกบวมแดงเล็กน้อย',
    rightsCoverageInfo: 'สิทธิบัตรทอง อุดฟันและขูดหินปูนฟรี',
    parentAdvice: 'กรุณาพาน้องไปขูดหินปูนและอุดฟันโดยเร็วครับ',
    followUpRequired: true
  }
];

// Generate more realistic students up to 127 total students
// Grade distribution:
// P.1: 21 (indices 0..20)
// P.2: 21 (indices 21..41)
// P.3: 21 (indices 42..62)
// P.4: 21 (indices 63..83)
// P.5: 21 (indices 84..104)
// P.6: 22 (indices 105..126) -> Total: 127 students

const FIRST_NAMES_MALE = [
  'กิตติศักดิ์', 'ชานนท์', 'ฐิติกร', 'ดนุพล', 'ทศพล', 'ธนดล', 'นราวิชญ์', 'ปฏิภาณ', 'พงศกร', 'ยศวรรธน์',
  'รชต', 'วรากร', 'ศุภโชค', 'สิรวิชญ์', 'อัครเดช', 'ก้องภพ', 'จิรภัทร', 'ชินดนัย', 'เดชชาติ', 'เตชินท์'
];

const FIRST_NAMES_FEMALE = [
  'กมลชนก', 'ขวัญข้าว', 'จิราพร', 'ชลธิชา', 'ณิชานันท์', 'ทิพวรรณ', 'ธัญญารัตน์', 'นภัสสร', 'เบญจมาศ', 'พรประภา',
  'มนัสนันท์', 'รดา', 'วรินทร', 'ศศิธร', 'สุพรรณิการ์', 'อารียา', 'กุลธิดา', 'จิดาภา', 'ชิดชนก', 'ณัฐชา'
];

const LAST_NAMES = [
  'มีทรัพย์', 'แสงอรุณ', 'ประสิทธิ์ผล', 'ศิริโชติ', 'วงษ์สุวรรณ', 'ทองประดิษฐ์', 'ใจมั่น', 'พงษ์พานิช',
  'อินทรักษ์', 'บุญยืน', 'สุขเกษม', 'จงสถิตย์', 'ธรรมวาสน์', 'พิทักษ์ธรรม', 'วิเศษสมบูรณ์', 'เจริญผล',
  'มั่นคงถาวร', 'รัตนวิเชียร', 'สุนทรเวช', 'ศรีสมบูรณ์', 'วงศ์มณี', 'กุลกิจ', 'เจริญพร', 'เลิศวิไล'
];

export function generateAll127Students(): StudentDentalRecord[] {
  const result: StudentDentalRecord[] = [...INITIAL_STUDENTS];

  // We need up to 127 records
  let currentId = 22;
  const gradeConfigs = [
    { grade: 'ป.2', count: 21, baseAge: 8, prefix: '202' },
    { grade: 'ป.3', count: 21, baseAge: 9, prefix: '303' },
    { grade: 'ป.4', count: 21, baseAge: 10, prefix: '404' },
    { grade: 'ป.5', count: 21, baseAge: 11, prefix: '505' },
    { grade: 'ป.6', count: 22, baseAge: 12, prefix: '606' }
  ];

  gradeConfigs.forEach((gc) => {
    for (let i = 1; i <= gc.count; i++) {
      const isMale = (currentId + i) % 2 === 0;
      const firstNameList = isMale ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE;
      const firstName = firstNameList[(currentId + i * 3) % firstNameList.length];
      const lastName = LAST_NAMES[(currentId * 2 + i * 5) % LAST_NAMES.length];
      const fullName = `${isMale ? 'ด.ช.' : 'ด.ญ.'} ${firstName} ${lastName}`;
      
      const codeSuffix = (currentId < 100 ? '0' : '') + currentId;
      const studentCode = `${gc.prefix.slice(0, 3)}${codeSuffix.slice(-3)}`;
      
      // Determine dental stats pseudorandomly
      const caries = (currentId * 7) % 5; // 0..4
      const filled = (currentId * 3) % 3; // 0..2
      const missing = caries > 2 && currentId % 3 === 0 ? 1 : 0;
      
      let gingivitis: StudentDentalRecord['gingivitisStatus'] = 'ปกติ';
      if (caries >= 3) gingivitis = 'เหงือกอักเสบปานกลาง';
      else if (caries >= 1) gingivitis = 'เหงือกอักเสบเล็กน้อย';

      let tartar: StudentDentalRecord['tartarStatus'] = 'ไม่มีหินปูน';
      if (gc.baseAge >= 10 && currentId % 2 === 0) tartar = 'มีเล็กน้อย';
      if (caries >= 3) tartar = 'มีปานกลาง';

      let score: StudentDentalRecord['oralHygieneScore'] = 'ดี';
      if (caries === 0 && gingivitis === 'ปกติ') score = 'ดีมาก';
      else if (caries >= 3 || gingivitis === 'เหงือกอักเสบปานกลาง') score = 'ควรปรับปรุง';
      else if (caries >= 1) score = 'พอใช้';

      const needed: string[] = [];
      if (caries > 0) needed.push(`อุดฟัน ${caries} ซี่`);
      if (tartar !== 'ไม่มีหินปูน' || gingivitis !== 'ปกติ') needed.push('ขูดหินปูน');
      if (gc.baseAge <= 9) needed.push('เคลือบหลุมร่องฟัน (Sealant)');
      needed.push('เคลือบฟลูออไรด์');
      if (missing > 0 || (currentId % 7 === 0 && gc.baseAge >= 9)) {
        needed.push('ถอนฟันน้ำนมค้าง');
      }

      result.push({
        id: `STD-${currentId < 100 ? '0' : ''}${currentId}`,
        studentCode: studentCode,
        fullName: fullName,
        grade: gc.grade,
        classroom: `${gc.grade.replace('ป.', '')}/1`,
        gender: isMale ? 'ชาย' : 'หญิง',
        age: gc.baseAge,
        examDate: '2026-09-18',
        examiner: 'นักศึกษาทันตสาธารณสุข',
        cariesCount: caries,
        filledCount: filled,
        missingCount: missing,
        gingivitisStatus: gingivitis,
        tartarStatus: tartar,
        oralHygieneScore: score,
        neededTreatments: needed,
        notes: caries > 0 ? `พบฟันผุต้องรักษา ${caries} ซี่ แนะนำพบทันตบุคลากร` : 'สุขภาพช่องปากอยู่ในเกณฑ์ดี แปรงฟันสม่ำเสมอ',
        rightsCoverageInfo: 'สิทธิหลักประกันสุขภาพถ้วนหน้า (บัตรทอง) / กรมธรรม์ฟันดี ครอบคลุมการรักษาฟรี',
        parentAdvice: caries > 0
          ? `กรุณาพาน้องไปรับการอุดฟันและตรวจเช็กที่ รพ.สต. หรือ รพ.ชุมชน สิทธิบัตรทองรักษาฟรีไม่มีค่าใช้จ่าย`
          : `ชื่นชมการดูแลเอาใจใส่ แนะนำให้แปรงฟันด้วยยาสีฟันผสมฟลูออไรด์สม่ำเสมอวันละ 2 ครั้ง`,
        followUpRequired: caries > 0 || tartar === 'มีปานกลาง'
      });

      currentId++;
    }
  });

  return result;
}
