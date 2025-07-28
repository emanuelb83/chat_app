import { useParams } from "react-router-dom";
import { Box, Stack, useMediaQuery } from "@mui/material";
import type { Theme } from "@mui/material";
import { useChat } from "../context/ChatContext";
import MessageItem from "../components/MessageItem";
import MessageInput from "../components/MessageInput";
import ChatHeader from "../components/ChatHeader";

function ChatPage() {
  const { id_chat } = useParams();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const { profile, activeList } = useChat();

  const chatId = id_chat ? parseInt(id_chat) : null;

  // Cerca il contatto nella lista attiva
  const currentChat = profile.chatlists[activeList].find(
    (friend) => friend.id === chatId
  );
  const chatMessages = currentChat ? currentChat.chatlog : [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "#e5ddd5",
        zIndex: 2,
      }}
    >
      {/* Header */}
      <ChatHeader
        isMobile={isMobile}
        //picture={currentChat?.picture && currentChat.name?.[0]?.toUpperCase()}
        name={currentChat?.name}
      />

      {/* Area messaggi */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          pb: 10,
          backgroundColor: "#e5ddd5",

          backgroundRepeat: "repeat",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#e5ddd5",

            zIndex: -1,
          },
        }}
      >
        <Stack spacing={1}>
          {chatMessages.map((msg) => (
            <MessageItem key={msg.message_id} message={msg} />
          ))}
        </Stack>
      </Box>

      {/* Input messaggio */}
      <Box
        sx={{
          backgroundColor: "transparent !important",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent !important",
            zIndex: -1,
          },
        }}
      >
        {chatId && <MessageInput chatId={chatId} />}
      </Box>
    </Box>
  );
}

export default ChatPage;
