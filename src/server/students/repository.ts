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
}

export const studentsRepository = new StudentRepository();
