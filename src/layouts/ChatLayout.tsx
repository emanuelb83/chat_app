import { Outlet, useLocation, useParams } from "react-router-dom";
import { useMediaQuery, Box } from "@mui/material";
import type { Theme } from "@mui/material";
import { useChat } from "../context/ChatContext";
import ChatList from "../components/ChatList";
import { motion, AnimatePresence } from "framer-motion";
import ChatListSelector from "../components/ChatListSelector"; // Corretto il nome del file
import EmptyChat from "../pages/EmptyChat";
import { useEffect } from "react";
import type { ChatListName } from "../types";

function ChatLayout() {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const location = useLocation();
  const { id_chatlist } = useParams();
  const { messages, setActiveList } = useChat();

  const isChatSelected = location.pathname.includes("/chat/");

  // Sincronizza activeList con l'URL
  useEffect(() => {
    const listMapping: Record<string, ChatListName> = {
      "1": "friends",
      "2": "lavoro",
      "3": "famiglia",
    };
    if (id_chatlist && listMapping[id_chatlist]) {
      setActiveList(listMapping[id_chatlist]);
    }
  }, [id_chatlist, setActiveList]);

  return (
    <Box
      component={motion.div}
      display="flex"
      height="100dvh"
      width="100vw"
      overflow="hidden"
      sx={{
        position: "relative",
        backgroundColor: "#f2f0f5",
      }}
    >
      {/* Sezione Lista Chat */}
      <AnimatePresence mode="popLayout">
        {(!isMobile || !isChatSelected) && (
          <motion.div
            key="chat-list"
            initial={{ x: "-100%" }}
            animate={{
              x: 0,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                delay: isChatSelected ? 0.15 : 0,
              },
            }}
            exit={{
              x: "-100%",
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
              },
            }}
            style={{
              width: isMobile ? "100%" : "380px",
              borderRight: "1px solid rgba(0,0,0,0.08)",
              overflow: "hidden",
              flexShrink: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              position: isMobile ? "absolute" : "relative",
              zIndex: 1,
              backgroundColor: "#ffffff",
            }}
          >
            <Box sx={{ flex: 1, overflow: "auto" }}>
              <ChatListSelector />
              <ChatList chats={messages} />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sezione Area Chat */}
      <AnimatePresence mode="popLayout">
        {(!isMobile || isChatSelected) && (
          <motion.div
            key="chat-area"
            initial={{ x: "100%" }}
            animate={{
              x: 0,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                delay: !isChatSelected ? 0.15 : 0,
              },
            }}
            exit={{
              x: "100%",
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
              },
            }}
            style={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              position: isMobile ? "absolute" : "relative",
              width: "100%",
              height: "100%",
              zIndex: 2,
              backgroundColor: "#f2f0f5",
            }}
          >
            {isChatSelected ? <Outlet /> : !isMobile && <EmptyChat />}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default ChatLayout;
