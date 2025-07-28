import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { ArrowBack, Search, AttachFile, MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";

type ChatHeaderProps = {
  isMobile: boolean;
  id_chatlist?: string;
  name?: string;
  onBack?: () => void;
};

function ChatHeader({ isMobile, id_chatlist, name, onBack }: ChatHeaderProps) {
  const navigate = useNavigate();
  const { getContactPicture } = useChat();

  // Recupera la picture direttamente dal context usando il nome
  const picture = name ? getContactPicture(name) : null;

  console.log("Name:", name);
  console.log("Picture from getContactPicture:", picture);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(`/chatlist/${id_chatlist}`);
    }
  };

  // Genera l'iniziale del nome se non c'è foto
  const getInitial = (contactName?: string) => {
    return contactName ? contactName.charAt(0).toUpperCase() : "?";
  };

  // Verifica se la picture è valida (non vuota e non solo spazi)
  const isValidPicture = picture && picture.trim().length > 0;

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

      {/* Avatar con foto o iniziale */}
      <Avatar
        src={isValidPicture ? picture : undefined}
        sx={{ width: 40, height: 40, mr: 2 }}
      >
        {!isValidPicture && getInitial(name)}
      </Avatar>

      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="medium">
          {name || "Chat"}
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
