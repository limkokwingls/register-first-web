import { getStudentStats } from '@/server/students/actions';
import { Stack, Text, Title } from '@mantine/core';

export default async function Page() {
  const { total, paid } = await getStudentStats();
  return (
    <Stack align='center' justify='center' mt='30vh'>
      <div>
        <Title fw={400} c='gray'>
          Students
        </Title>
        <Text pl={3} c='gray' size='xs' ta='start'>
          <Text component='span' c='cyan'>
            {paid}
          </Text>{' '}
          Paid{' / '}
          <Text component='span' c='cyan'>
            {total}
          </Text>{' '}
          Students
        </Text>
      </div>
    </Stack>
  );
}
