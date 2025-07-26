// src/components/MessageInput.tsx
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { b } from 'framer-motion/client';


type Props = {
  chatId: number;
};

function MessageInput({ chatId }: Props) {
  const [text, setText] = useState('');
  const { sendMessage } = useChat();

  const handleSend = () => {
    if (text.trim() === '') return;
    sendMessage(Number(chatId), text);
    setText('');
  };

  return (
<Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    bottom: '0px',
    padding: '12px 8px',
    zIndex: 10,
    backgroundColor: '#e5ddd5', // Stesso sfondo conversazione
  
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#e5ddd5',
      backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-light_a4be512e7195b6b733d9110b408f075d.png")',
      zIndex: 0,
    }
  }}
>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Scrivi un messaggio"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputBase-input': {
            padding: '12px 16px',
          },
          backgroundColor: '#ffffff', // Solo il TextField ha sfondo bianco
          borderRadius: '24px',
        }}
        />
            <InputAdornment position="end">
              <IconButton 
                onClick={handleSend}
                sx={{
                  borderRadius: '50%',
                  backgroundColor: '#00bfa5',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#00bfa5',
                    opacity: 0.9,
                  },
                  width: '40px',
                  height: '40px',
                  marginRight: '4px',
                }}
              >
              <SendIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          
    </Box>
  );
}

export default MessageInput;