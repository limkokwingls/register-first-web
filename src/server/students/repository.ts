import BaseRepository from '@/server/base/BaseRepository';
import { students } from '@/db/schema';
import { db } from '@/db';

export default class StudentRepository extends BaseRepository<
  typeof students,
  'id'
> {
  constructor() {
    super(students, 'id');
  }

  async findByNationalId(nationalId: string) {
    return db.query.students.findFirst({
      where: (student, { eq }) => eq(student.nationalId, nationalId),
    });
  }

  async stats() {
    const allStudents = await db.query.students.findMany();
    const paidStudents = allStudents.filter((student) => student.paid);

    return {
      total: allStudents.length,
      paid: paidStudents.length,
    };
  }
}

export const studentsRepository = new StudentRepository();
