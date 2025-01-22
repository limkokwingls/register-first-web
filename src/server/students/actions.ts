'use server';


import { students } from '@/db/schema';
import { studentsService as service} from './service';

type Student = typeof students.$inferInsert;


export async function getStudent(id: number) {
  return service.get(id);
}

export async function findAllStudents(page: number = 1, search = '') {
  return service.findAll({ page, search });
}

export async function createStudent(student: Student) {
  return service.create(student);
}

export async function updateStudent(id: number, student: Student) {
  return service.update(id, student);
}

export async function deleteStudent(id: number) {
  return service.delete(id);
}