

import type { Friend } from '../types';
import ChatItem from './ChatItem';
import { Stack } from '@mui/material';

type Props = {
  chats: Friend[];
};

function ChatList({ chats }: Props) {
  return (
    <Stack spacing={1}>
{chats.length > 0 ? (
  chats.map(chat => (
    <ChatItem key={chat.id} chat={chat} />
  ))
) : (
  <div style={{textAlign:"center", fontWeight:"bold", justifyContent:"left"}}>Nessuna conversazione per la lista selezionata</div>
)}
    </Stack>
  );
}

export default ChatList;
