'use server';
import { getProgramByReference } from '@/app/(main)/models/programs';
import { db } from '@/db';
import { students } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function getStatistics() {
  const data = await db.query.students.findMany({
    where: eq(students.paid, true),
  });
  const programCounts = data.reduce<Record<string, number>>((acc, student) => {
    const program = getProgramByReference(student.reference)?.name || 'Unknown';
    acc[program] = (acc[program] || 0) + 1;
    return acc;
  }, {});

  return programCounts;
}
