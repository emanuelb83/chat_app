// src/layouts/ChatLayout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import { useMediaQuery, Box } from '@mui/material';
import type { Theme } from '@mui/material';
import { useChat } from '../context/ChatContext';
import ChatList from '../components/ChatList';
import ChatListHeader from '../components/ChatListHeader';
import { motion, AnimatePresence } from 'framer-motion';

function ChatLayout() {
    const { profile } = useChat();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { friends } = profile;
    const location = useLocation();
    const isChatSelected = location.pathname.includes('/chat/');

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
            component={motion.div}
            display="flex" 
            height="100vh" 
            width="100vw" 
            overflow="hidden"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#f2f0f5' // Sfondo coerente per tutta l'app
            }}
        >
            {/* Chat List - Animazione ottimizzata */}
            <AnimatePresence mode="popLayout">
                {(!isMobile || !isChatSelected) && (
                    <motion.div
                        key="chat-list"
                        initial={{ x: '-100%' }}
                        animate={{ 
                            x: 0,
                            transition: { 
                                type: 'spring', 
                                stiffness: 400,
                                damping: 40,
                                delay: isChatSelected ? 0.15 : 0
                            }
                        }}
                        exit={{ 
                            x: '-100%',
                            transition: { 
                                type: 'spring', 
                                stiffness: 400,
                                damping: 40
                            } 
                        }}
                        style={{
                            width: isMobile ? '100%' : '380px',
                            borderRight: '1px solid rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            flexShrink: 0,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            position: isMobile ? 'absolute' : 'relative',
                            zIndex: 1,
                            backgroundColor: '#ffffff'
                        }}
                    >
                        <ChatListHeader title="Chat List"/>
                        <Box sx={{ flex: 1, overflow: 'auto' }}>
                            <ChatList chats={convertedChats} />
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Area - Animazione coordinata con sfondo continuo */}
            <AnimatePresence mode="popLayout">
                {(!isMobile || isChatSelected) && (
                    <motion.div
                        key="chat-area"
                        initial={{ x: '100%' }}
                        animate={{ 
                            x: 0,
                            transition: { 
                                type: 'spring', 
                                stiffness: 400,
                                damping: 40,
                                delay: !isChatSelected ? 0.15 : 0
                            }
                        }}
                        exit={{ 
                            x: '100%',
                            transition: { 
                                type: 'spring', 
                                stiffness: 400,
                                damping: 40
                            } 
                        }}
                        style={{
                            flex: 1,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            position: isMobile ? 'absolute' : 'relative',
                            width: '100%',
                            height: '100%',
                            zIndex: 2,
                            backgroundColor: '#f2f0f5' // Stesso colore del container principale
                        }}
                    >
                        <Outlet />
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
}

export default ChatLayout;