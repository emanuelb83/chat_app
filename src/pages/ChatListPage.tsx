
import { Typography, Box } from '@mui/material';
import { useChat } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';

function ChatListPage() {
  const navigate = useNavigate();
  const { profile } = useChat();

  return (
    <Box>
      <List>
        {profile.chatlists.friends.map((friend) => (
          <ListItemButton
            key={friend.id}
            onClick={() => navigate(`/chatlist/${profile.id}/chat/${friend.id}`)}
          >
            <ListItemAvatar>
              <Avatar src={friend.picture} />
            </ListItemAvatar>
            <ListItemText
              primary={friend.name}
              secondary={
                <Typography
                  variant="body2"
                  color="textSecondary"
                  noWrap
                >
                  {friend.lastChat}
                </Typography>
              }
            />
            <Typography variant="caption" color="textSecondary">
              {friend.latest_timestamp}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default ChatListPage;
