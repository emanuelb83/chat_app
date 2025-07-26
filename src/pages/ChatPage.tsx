import { useParams } from 'react-router-dom';
import { 
  Box, 
  Stack, 
  useMediaQuery,

} from '@mui/material';

import type { Theme } from '@mui/material';
import { useChat } from '../context/ChatContext';
import MessageItem from '../components/MessageItem';
import MessageInput from '../components/MessageInput';
import ChatHeader from '../components/ChatHeader';

function ChatPage() {
// Ottieni i parametri dalla URL
  const {id_chatlist, id_chat } = useParams();  

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { profile } = useChat();  // prendiamo i dati da profile
  
  
;
  const chatId = id_chat ? parseInt(id_chat) : null;
  const currentChat = profile.friends.find(friend => friend.id === chatId);
  const chatMessages =  currentChat ? currentChat.chatlog : [];

  return (

<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  backgroundColor: '#e5ddd5', // Sfondo stile WhatsApp
 
  zIndex: 2
  }}>
    
      {/* Header stile WhatsApp */}
      <ChatHeader 
        isMobile={isMobile}
        id_chatlist={id_chatlist}
        picture={currentChat?.picture}
        name={currentChat?.name}
      />
      
      {/* Area messaggi con scroll */}
      <Box sx={{
  flex: 1,
  overflowY: 'auto',
  p:2,
  pb: 10, // Spazio per l'input messaggio
  backgroundColor: '#e5ddd5', // Sfondo stile WhatsApp
  backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e7195b6b733d9110b408f075d.png")',
  backgroundRepeat: 'repeat',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e5ddd5', // Doppio rinforzo dello sfondo
    backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e7195b733d9110b408f075d.png")',
    zIndex: -1,
  }
}}>
        <Stack spacing={1}>
          {chatMessages.map((msg) => (
            <MessageItem key={msg.message_id} message={msg} />
          ))}
        </Stack>
      </Box>
      
      {/* Input messaggio */}
  <Box sx={{
    
    backgroundColor: 'transparent !important',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent !important',
      zIndex: -1,
    }
  }}>
    {chatId && <MessageInput chatId={chatId} />}
  </Box>
    </Box>
  );
}

export default ChatPage;
