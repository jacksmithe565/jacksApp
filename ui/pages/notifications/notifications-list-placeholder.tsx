import React from 'react';
import {
  Box,
  Icon,
  Text,
} from '../../components/component-library';

type NotificationsPlaceholderProps = {
  title: string;
  text: string;
};

export function NotificationsPlaceholder({ title, text }: NotificationsPlaceholderProps) {
  return (
    <Box
      height="full"
      width="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
    >
      <Icon name={'Notification'} size={'xl'} />
      <Text variant={'headingSm'}>{title}</Text>
      <Text variant={'bodyMd'} textAlign={'center'}>{text}</Text>
    </Box>
  );
}
