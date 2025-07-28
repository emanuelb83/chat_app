import { AppBar, Toolbar, Typography } from '@mui/material';
import { useChat } from '../context/ChatContext';   


function ChatListHeader() {
    const { activeList } = useChat();
    
    // Mappa i valori di activeList ai titoli desiderati
    const getTitle = () => {
        switch(activeList) {
            case 'friends':
                return 'Amici';
            case 'lavoro':
                return 'Lavoro';
            case 'famiglia':
                return 'Famiglia';
            default:
                return 'Chat';
        }
    }
    return (
        
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
                <Typography component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>
                    {getTitle()}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default ChatListHeader;