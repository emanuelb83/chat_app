
import type { Friend } from '../types';
import { Card, CardContent, Typography, Avatar, Box, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  chat: Friend;
};

function ChatItem({ chat }: Props) {
  const { id_chatlist } = useParams();
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`/chatlist/${id_chatlist}/chat/${chat.id}`);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const now = new Date();
    
    const diffDays = Math.floor((now.getTime() - localDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Ieri';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  // Ottieni l'ultimo messaggio e il timestamp
  const getLastMessageInfo = () => {
    if (!chat.chatlog || chat.chatlog.length === 0) {
      return { sender: '', lastMessage: 'Nessun messaggio', timestamp: '' };
    }
    
    const lastMessage = chat.chatlog[chat.chatlog.length - 1];
    let sender = '';
  
    if (lastMessage.side === 'right') {
      sender = 'Tu: ';
    } else if (lastMessage.side === 'left') {
      sender = `${chat.name.split(' ')[0]}: `;
    }

    return {
      sender,
      lastMessage: lastMessage.text,
      timestamp: formatTimestamp(lastMessage.timestamp)
    };
        
 

  };

    
  const { sender, lastMessage, timestamp } = getLastMessageInfo();


  return (
    <Card 
      onClick={handleClick} 
      elevation={0}
      sx={{ 
        cursor: 'pointer',
        borderRadius: 0,
        '&:hover': {
          backgroundColor: '#f5f5f5'
        },
        borderBottom: '1px solid #f0f2f5'
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
<Box display="flex" alignItems="center" gap={2}>
  <Avatar
    alt={chat.name}
    src={chat.picture || undefined}
    sx={{
      width: 56,
      height: 56,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      bgcolor: chat.picture ? 'transparent' : 'grey.500',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.5rem',
    }}
  >
    {!chat.picture && chat.name?.charAt(0).toUpperCase()}
  </Avatar>


          
          <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography 
                variant="subtitle1" 
                sx={{
                  fontFamily: "'Segoe UI', Roboto, sans-serif",
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: '#111b21',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {chat.name}
              </Typography>
              {timestamp && (
                <Typography 
                  variant="caption" 
                  sx={{
                  fontFamily: "'Segoe UI', Roboto, sans-serif",
                  fontSize: '0.75rem',
                  color: '#667781',
                  whiteSpace: 'nowrap',
                  ml: 1
                  }}
                >
                  {timestamp}
                </Typography>
              )}
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{
                fontFamily: "'Segoe UI', Roboto, sans-serif",
                fontWeight: 400,
                fontSize: '0.875rem',
                color: '#667781',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                lineHeight: 1.4,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Box component="span" sx={{ 
                fontWeight: 500,
                color: sender.startsWith('Tu:') ? '#128C7E' : '#111b21',
                mr: 0.5
              }}>
                {sender}
              </Box>
              {lastMessage}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ChatItem;