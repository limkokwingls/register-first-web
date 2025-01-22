import { students } from '@/db/schema';
import { updateStudent } from '@/server/students/actions';
import { Flex, Switch, rem, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconCircleCheck,
  IconExclamationCircle,
  IconExclamationMark,
} from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useTransition } from 'react';

type Props = {
  student: typeof students.$inferSelect;
};

export default function PaymentSwitch({ student }: Props) {
  const theme = useMantineTheme();
  const [isPaid, setIsPaid] = useState<boolean>(student.paid);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  function update() {
    const status = !isPaid;
    setIsPaid(status);

    startTransition(async () => {
      try {
        await updateStudent(student.id, {
          ...student,
          paid: status,
        });
        queryClient.invalidateQueries({
          queryKey: ['students'],
        });
        notifications.show({
          title: status ? 'Paid' : 'Unpaid',
          message: `Payment status updated to ${status ? 'paid' : 'unpaid'}`,
          color: status ? 'green' : 'gray',
          icon: status ? (
            <IconCircleCheck size={rem(20)} />
          ) : (
            <IconExclamationCircle size={rem(20)} />
          ),
        });
      } catch (error) {
        setIsPaid(isPaid);
        notifications.show({
          title: 'Error updating payment status',
          message: error instanceof Error ? error.message : 'An error occurred',
          color: 'gray',
          icon: <IconExclamationCircle size={rem(20)} />,
        });
      }
    });
  }

  return (
    <Flex justify='space-between'>
      <Switch
        checked={isPaid}
        onChange={update}
        color='green'
        size='sm'
        label={isPending ? 'Updating...' : isPaid ? 'Paid' : 'Unpaid'}
        description={`Click switch to mark as ${isPaid ? 'unpaid' : 'paid'}`}
        disabled={isPending}
        thumbIcon={
          isPaid ? (
            <IconCheck
              style={{ width: rem(12), height: rem(12) }}
              color={theme.colors.green[5]}
              stroke={3}
            />
          ) : (
            <IconExclamationMark
              style={{ width: rem(12), height: rem(12) }}
              color={theme.colors.red[6]}
              stroke={3}
            />
          )
        }
      />
      {isPaid ? (
        <IconCircleCheck size='2rem' color={theme.colors.green[5]} />
      ) : (
        <IconExclamationCircle size='2rem' color={theme.colors.gray[5]} />
      )}
    </Flex>
  );
}
