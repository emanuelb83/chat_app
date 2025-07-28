import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { ArrowBack, Search, AttachFile, MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

type ChatHeaderProps = {
  isMobile: boolean;
  id_chatlist?: string;
  picture?: string;
  name?: string;
  onBack?: () => void;
};
console.log(useContext);

function ChatHeader({
  isMobile,
  id_chatlist,
  picture,
  name,
  onBack,
}: ChatHeaderProps) {
  const navigate = useNavigate();

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

      <Avatar src={picture} sx={{ width: 40, height: 40, mr: 2 }} />

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
