

import type { Message } from '../types';
import { Box, Typography, Paper } from '@mui/material';



type Props = {
  message: Message;
};

function MessageItem({ message }: Props) {
  const isMine = message.side === 'right';
const timestamp = message.timestamp?.match(/\d{2}:\d{2}/)?.[0] ?? '';

  return (
    <Box
      display="flex"
      justifyContent={isMine ? 'flex-end' : 'flex-start'}
    >
      <Paper
        elevation={2}
        sx={{
          p: 1.5,
          maxWidth: '60%',
          bgcolor: isMine ? '#DCF8C6' : '#FFFFFF',
          borderRadius: isMine ? '18px 18px 0 18px' : '18px 18px 18px 0'
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
        <Typography variant="caption" display="block" textAlign="right">
          {timestamp}
        </Typography>
      </Paper>
    </Box>
  );
}

export default MessageItem;
