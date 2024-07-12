export interface Program {
  name: string;
  code: string;
  facultyCode: string;
}

const programs: Program[] = [
  { name: 'BA in Architectural Studies', code: 'BAAS', facultyCode: 'FABE' },
  {
    name: 'Diploma in Architecture Technology',
    code: 'DAT',
    facultyCode: 'FABE',
  },
  { name: 'B Bus in Entreprenuership', code: 'BEN', facultyCode: 'FBMG' },
  { name: 'BA in Human Resource Management', code: 'BHR', facultyCode: 'FBMG' },
  { name: 'B Bus in International Business', code: 'BIB', facultyCode: 'FBMG' },
  { name: 'Diploma in Business Management', code: 'DBM', facultyCode: 'FBMG' },
  { name: 'Diploma in Marketing', code: 'DMK', facultyCode: 'FBMG' },
  { name: 'Diploma in Retail Management', code: 'DRM', facultyCode: 'FBMG' },
  {
    name: 'BA in Professional Communication',
    code: 'BPC',
    facultyCode: 'FCMB',
  },
  { name: 'Diploma in Journalism & Media', code: 'DJM', facultyCode: 'FCMB' },
  { name: 'Diploma in Public Relations', code: 'DPR', facultyCode: 'FCMB' },
  { name: 'BA in Broadcasting & Journalism', code: 'BBJ', facultyCode: 'FCMB' },
  { name: 'BA in Digital Film Production', code: 'BDF', facultyCode: 'FCMB' },
  {
    name: 'Diploma in Broadcasting Radio & TV',
    code: 'DBRTV',
    facultyCode: 'FCMB',
  },
  { name: 'Diploma in Film Production', code: 'DFP', facultyCode: 'FCMB' },
  { name: 'BA in Tourism Management', code: 'BTM', facultyCode: 'FCTH' },
  { name: 'Diploma in Events Management', code: 'DEM', facultyCode: 'FCTH' },
  { name: 'Diploma in Hotel Management', code: 'DHM', facultyCode: 'FCTH' },
  {
    name: 'Diploma in International Tourism',
    code: 'DITR',
    facultyCode: 'FCTH',
  },
  { name: 'Diploma in Tourism Management', code: 'DTM', facultyCode: 'FCTH' },
  { name: 'B Des in Professional Design', code: 'BDSPD', facultyCode: 'FDI' },
  { name: 'Diploma in Creative Advertising', code: 'DCAV', facultyCode: 'FDI' },
  { name: 'Diploma in Graphic Design', code: 'DGD', facultyCode: 'FDI' },
  { name: 'BA in Fashion & Retailing', code: 'BAFASH', facultyCode: 'FDI' },
  {
    name: 'Diploma in Fashion & Apparel Design',
    code: 'DFAD',
    facultyCode: 'FDI',
  },
  {
    name: 'BSc in Business Information Technology',
    code: 'BSCBIT',
    facultyCode: 'FICT',
  },
  { name: 'BSc in Information Technology', code: 'BSCIT', facultyCode: 'FICT' },
  {
    name: 'BSc in Software Engineering with Multimedia',
    code: 'BSCSM',
    facultyCode: 'FICT',
  },
  {
    name: 'Diploma in Business Information Technology',
    code: 'DBIT',
    facultyCode: 'FICT',
  },
  {
    name: 'Diploma in Information Technology',
    code: 'DIT',
    facultyCode: 'FICT',
  },
  {
    name: 'Diploma in Multimedia & Software Engineering',
    code: 'DMSE',
    facultyCode: 'FICT',
  },
];

export function getProgramByCode(code: string): Program | undefined {
  return programs.find((program) => program.code === code);
}

export default programs;
