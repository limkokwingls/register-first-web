'use client';

import {
  Group,
  Paper,
  Table,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import getStatistics from './actions';

export default function StatisticsPage() {
  const theme = useMantineTheme();
  const { data: programStats, isLoading } = useQuery({
    queryKey: ['statistics'],
    queryFn: getStatistics,
  });

  if (isLoading || !programStats) {
    return <Text>Loading...</Text>;
  }

  const totalStudents = Object.values(programStats).reduce((a, b) => a + b, 0);

  const rows = Object.entries(programStats)
    .sort(([, a], [, b]) => b - a)
    .map(([program, count], index) => {
      const percentage = ((count / totalStudents) * 100).toFixed(1);
      return (
        <Table.Tr key={program}>
          <Table.Td>{program}</Table.Td>
          <Table.Td>{count}</Table.Td>
          <Table.Td>{percentage}%</Table.Td>
        </Table.Tr>
      );
    });

  return (
    <Paper shadow='sm' p='xl' m='xl' radius='md' withBorder>
      <Group justify='space-between' align='center' mb='md'>
        <Title order={2} fw={'normal'}>
          Program Statistics
        </Title>
        <Group>
          <Text>Total: {totalStudents}</Text>
        </Group>
      </Group>

      <Table highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Program</Table.Th>
            <Table.Th>Students</Table.Th>
            <Table.Th>Percentage</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}
