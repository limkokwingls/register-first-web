'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { findAllStudents } from '@/server/students/actions';
import {
  IconCheck,
  IconCircleCheck,
  IconExclamationCircle,
} from '@tabler/icons-react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/students'}
      queryKey={['students']}
      getData={findAllStudents}
      actionIcons={[<NewLink key={'new-link'} href='/admin/students/new' />]}
      renderItem={(it) => (
        <ListItem
          id={it.id}
          label={it.name}
          rightSection={
            it.paid ? (
              <IconCheck size={'1rem'} />
            ) : (
              <IconExclamationCircle size={'1rem'} />
            )
          }
        />
      )}
    >
      {children}
    </ListLayout>
  );
}
