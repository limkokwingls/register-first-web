'use client';

import {
  DetailsView,
  DetailsViewBody,
  DetailsViewHeader,
  FieldView,
} from '@/components/adease';
import { students } from '@/db/schema';
import { formatDate } from '@/lib/utils';
import { deleteStudent } from '@/server/students/actions';
import { ActionIcon, Grid, Group, Paper, Stack, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCopy } from '@tabler/icons-react';

type Props = {
  student: typeof students.$inferSelect;
};

export default function StudentView({ student }: Props) {
  return (
    <DetailsView>
      <DetailsViewHeader title={student.name} queryKey={['students']} />
      <DetailsViewBody>
        <Stack gap='md'>
          <Paper shadow='xs' p='md' radius='md'>
            <Stack gap='md'>
              <Title order={4}>Personal Information</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Group justify='space-between' wrap='nowrap'>
                    <FieldView label='National Id'>
                      {student.nationalId}
                    </FieldView>
                    <CopyButton text={student.nationalId} />
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Group justify='space-between' wrap='nowrap'>
                    <FieldView label='Name'>{student.name}</FieldView>
                    <CopyButton text={student.name} />
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Group justify='space-between' wrap='nowrap'>
                    <FieldView label='Email'>{student.email}</FieldView>
                    <CopyButton text={student.email} />
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <FieldView label='Date Of Birth'>
                    {formatDate(student.dateOfBirth)}
                  </FieldView>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <FieldView label='Gender'>{student.gender}</FieldView>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <FieldView label='Marital Status'>
                    {student.maritalStatus}
                  </FieldView>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>

          <Paper shadow='xs' p='md' radius='md'>
            <Stack gap='md'>
              <Title order={4}>Contact Information</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Group justify='space-between' wrap='nowrap'>
                    <FieldView label='Phone 1'>{student.phone1}</FieldView>
                    <CopyButton text={student.phone1} />
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Group justify='space-between' wrap='nowrap'>
                    <FieldView label='Phone 2'>{student.phone2}</FieldView>
                    <CopyButton text={student.phone2} />
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <FieldView label='Birth Place'>
                    {student.birthPlace}
                  </FieldView>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <FieldView label='Home Town'>{student.homeTown}</FieldView>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>

          <Paper shadow='xs' p='md' radius='md'>
            <Stack gap='md'>
              <Title order={4}>Education & Background</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <FieldView label='High School'>
                    {student.highSchool}
                  </FieldView>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <FieldView label='Religion'>{student.religion}</FieldView>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>

          <Paper shadow='xs' p='md' radius='md'>
            <Stack gap='md'>
              <Title order={4}>Emergency Contact</Title>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Group justify='space-between' wrap='nowrap'>
                    <FieldView label='Next Of Kin Names'>
                      {student.nextOfKinName}
                    </FieldView>
                    <CopyButton text={student.nextOfKinName} />
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Group justify='space-between' wrap='nowrap'>
                    <FieldView label='Next Of Kin Phone'>
                      {student.nextOfKinPhone}
                    </FieldView>
                    <CopyButton text={student.nextOfKinPhone} />
                  </Group>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <FieldView label='Next Of Kin Relationship'>
                    {student.nextOfKinRelationship}
                  </FieldView>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        </Stack>
      </DetailsViewBody>
    </DetailsView>
  );
}

function CopyButton({ text }: { text: string | null }) {
  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      notifications.show({
        message: 'Copied to clipboard',
        color: 'green',
      });
    }
  };

  return (
    <ActionIcon
      variant='subtle'
      size='sm'
      onClick={handleCopy}
      aria-label='Copy to clipboard'
    >
      <IconCopy size='1rem' />
    </ActionIcon>
  );
}
