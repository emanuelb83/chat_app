// src/context/ChatContext.tsx

import { createContext, useContext, useState } from "react";
import dummyDataRaw from "../data/dummyChats.json";

// Tipi
type Message = {
  message_id: number;
  text: string;
  timestamp: string;
  side: "left" | "right";
};

type Friend = {
  id: number;
  name: string;
  picture: string;
  chatlog: Message[];
  latest_timestamp: string;
  lastChat: string;
};

export type ChatListName = "friends" | "lavoro" | "famiglia";

type Profile = {
  id: number;
  name: string;
  picture: string;
  status: string;
  chatlists: {
    [key in ChatListName]: Friend[];
  };
};

type ChatContextType = {
  profile: Profile;
  activeList: ChatListName;
  setActiveList: (list: ChatListName) => void;
  messages: Friend[]; // messaggi della lista attiva
  sendMessage: (friendId: number, text: string) => void;
};

// Type assertion dei dati dummy
const dummyData = dummyDataRaw as { profile: Profile };

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(dummyData.profile);
  const [activeList, setActiveList] = useState<ChatListName>("friends");

  const getLocalISOTimestamp = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, -1);
  };

  const sendMessage = (friendId: number, text: string) => {
    const newMessage: Message = {
      message_id: Date.now(),
      text,
      timestamp: getLocalISOTimestamp(),
      side: "right",
    };

    setProfile((prevProfile) => {
      const updatedList = prevProfile.chatlists[activeList].map((friend) =>
        friend.id === friendId
          ? {
              ...friend,
              chatlog: [...friend.chatlog, newMessage],
              latest_timestamp: newMessage.timestamp,
              lastChat: text,
            }
          : friend
      );

      return {
        ...prevProfile,
        chatlists: {
          ...prevProfile.chatlists,
          [activeList]: updatedList,
        },
      };
    });
  };

  const messages = profile.chatlists[activeList];

  return (
    <ChatContext.Provider
      value={{ profile, activeList, setActiveList, messages, sendMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
}
