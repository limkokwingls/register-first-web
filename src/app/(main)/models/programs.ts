export interface Program {
  name: string;
  code: string;
}

const programs: Program[] = [
  {
    name: 'Certificate in Business Information Technology',
    code: 'CBIT',
  },
  {
    name: 'Certificate in Performing Arts',
    code: 'CPA',
  },
  {
    name: 'Certificate in Architecture Technology',
    code: 'CAT',
  },
  {
    name: 'Certificate in Graphic Design',
    code: 'CGD',
  },
  {
    name: 'Certificate in Marketing',
    code: 'CMK',
  },
  {
    name: 'Certificate in Innovation Travel and Tourism',
    code: 'CTM',
  },
];

export function getProgramByReference(reference?: string | null) {
  if (!reference) return null;
  const [prefix, program, number] = reference.split('-');
  return getProgramByCode(program.toUpperCase());
}

export function getProgramByCode(code: string): Program | undefined {
  return programs.find((program) => program.code === code.toUpperCase());
}

export default programs;
