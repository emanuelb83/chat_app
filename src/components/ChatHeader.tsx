import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { ArrowBack, Search, AttachFile, MoreVert } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useChat } from "../context/ChatContext";


type ChatHeaderProps = {
  isMobile: boolean;
  id_chatlist?: string;
  picture?: string;
  name?: string;
  onBack?: () => void;
};

function ChatHeader({
  isMobile,
  id_chatlist,
  onBack,
}: ChatHeaderProps) {
  const id = useParams().id_chat;
  const { messages } = useChat();
  const navigate = useNavigate();

  const currentContact = messages.find(contact => contact.id === Number(id));

  // Usiamo questa logica per determinare cosa mostrare
  const displayName = currentContact?.name
  const avatarSrc = currentContact?.picture
  console.log("Avatar Source:", avatarSrc);
  const showInitials = !avatarSrc || avatarSrc === "";
  const initials = displayName ? displayName.charAt(0).toUpperCase() : "";

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(`/chatlist/${id_chatlist}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        bgcolor: "#86c9afff",
        borderBottom: "1px solid #e9edef",
        height: "60px",
      }}
    >
      {isMobile && (
        <IconButton onClick={handleBack}>
          <ArrowBack />
        </IconButton>
      )}
    
      <Avatar 
        src={!showInitials ? avatarSrc : undefined}
        sx={{
          width: 40,
          height: 40,
          mr: 2,
          bgcolor: showInitials ? '#acacacff' : 'transparent',
          color: showInitials ? 'white' : 'inherit',
          fontSize: '1,5rem',
          fontWeight: 'bold'
        }}
      >
        {showInitials && initials}
      </Avatar>

      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="medium">
          {displayName || "Chat"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          online
        </Typography>
      </Box>

      <Box>
        <IconButton size="small">
          <Search />
        </IconButton>
        <IconButton size="small">
          <AttachFile />
        </IconButton>
        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ChatHeader;