import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import { useChat } from "../context/ChatContext";
// In ChatListSelector.tsx
import type { ChatListName } from "../context/ChatContext";

import type { SelectChangeEvent } from "@mui/material/Select";

function ChatListSelector() {
  const { id_chatlist } = useParams();
  const navigate = useNavigate();
  const { activeList, setActiveList } = useChat();

  // Mappa ID a nomi delle liste
  const getListName = (id: string): ChatListName => {
    const mapping: Record<string, ChatListName> = {
      "1": "friends",
      "2": "lavoro",
      "3": "famiglia",
    };
    return mapping[id] || "friends";
  };

  const handleChange = (e: SelectChangeEvent) => {
    const newList = e.target.value as ChatListName;
    const listIdMapping = {
      friends: "1",
      lavoro: "2",
      famiglia: "3",
    };
    navigate(`/chatlist/${listIdMapping[newList]}`);
  };

  // Sincronizza lo stato con l'URL al mount
  useEffect(() => {
    setActiveList(getListName(id_chatlist || "1"));
  }, [id_chatlist, setActiveList]);

  return (
    <Box mb={2} mt={2} px={2}>
      <Typography variant="subtitle2" gutterBottom>
        Seleziona gruppo chat
      </Typography>
      <Select value={activeList} onChange={handleChange} fullWidth size="small">
        <MenuItem value="friends">Amici</MenuItem>
        <MenuItem value="lavoro">Lavoro</MenuItem>
        <MenuItem value="famiglia">Famiglia</MenuItem>
      </Select>
    </Box>
  );
}

export default ChatListSelector;
