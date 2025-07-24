import { AppBar, Toolbar, Typography } from '@mui/material';

interface ChatListHeaderProps {
    title: string;
    logo?: string; // Aggiunto per eventuale logo
}

function ChatListHeader({ title }: ChatListHeaderProps) {
    return (
        
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default ChatListHeader;