
import { Outlet, useLocation } from 'react-router-dom';
import { useMediaQuery, Box } from '@mui/material';
import type { Theme } from '@mui/material';
import { useChat } from '../context/ChatContext';
import ChatList from '../components/ChatList';
import ChatListHeader from '../components/ChatListHeader';




function ChatLayout() {
    const { profile } = useChat();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { friends } = profile;
    const location = useLocation();
    const isChatSelected = location.pathname.includes('/chat/');

    // Converte i friends dal profile in formato compatibile con ChatList
    const convertedChats = friends.map(friend => ({
        id: friend.id,
        name: friend.name,
        picture: friend.picture,
        chatlog: friend.chatlog,
        lastChat: friend.lastChat || (friend.chatlog && friend.chatlog.length > 0 ? friend.chatlog[friend.chatlog.length - 1].text : ''),
        latest_timestamp: friend.latest_timestamp || (friend.chatlog && friend.chatlog.length > 0 ? friend.chatlog[friend.chatlog.length - 1].timestamp : '')
    }));

    return (
        <Box 
            display="flex" 
            height="100vh" 
            width="100vw" 
            overflow="hidden"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}
        >
            {/* Chat List - Sempre visibile su desktop, nascosta in mobile quando chat è selezionata */}
            <Box 
                sx={{
                    width: isMobile ? '100%' : '380px',
                    borderRight: '1px solid #e0e0e0',
                    overflow: 'hidden',
                    flexShrink: 0,
                    height: '100%',
                    display: isMobile && isChatSelected ? 'none' : 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header principale - sempre visibile */}

               <ChatListHeader title="Chat List"/>
                
                {/* Lista delle chat */}
                <Box sx={{ flex: 1, overflow: 'auto' }}>
                    <ChatList chats={convertedChats} />
                </Box>
            </Box>

            {/* Chat Area - occupa lo spazio rimanente */}
            <Box
                sx={{
                    flex: 1,
                    overflow: 'hidden',
                    display: isMobile && !isChatSelected ? 'none' : 'flex',
                    flexDirection: 'column',
                    background: '#f0f2f5'
                }}
            >
        
                <Outlet />  
               
            </Box>
        </Box>
    );
}

export default ChatLayout;