
import type { Friend } from '../types';
import ChatItem from './ChatItem';
import { Stack } from '@mui/material';

type Props = {
  chats: Friend[];
};

function ChatList({ chats }: Props) {
  return (
    <Stack spacing={1}>
      {chats.map(chat => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </Stack>
  );
}

export default ChatList;
