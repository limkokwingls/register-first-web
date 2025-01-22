import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getStudent, deleteStudent } from '@/server/students/actions';
import { formatDate } from '@/lib/utils';
import { IconCopy } from '@tabler/icons-react';
import {
  ActionIcon,
  Paper,
  Stack,
  Group,
  Title,
  Grid,
  Text,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import StudentView from './StudentView';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StudentDetails({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(Number(id));

  if (!student) {
    return notFound();
  }

  return <StudentView student={student} />;
}
