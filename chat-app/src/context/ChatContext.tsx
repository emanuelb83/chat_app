// src/context/ChatContext.tsx

import { createContext, useContext, useState } from 'react';
import dummyDataRaw from '../data/dummyChats.json';

// Tipi
// Type assertion per garantire i tipi corretti
const dummyData = dummyDataRaw as {
  profile: Profile;
  friends: Friend[];
};

type Message = {
  message_id: number;
  text: string;
  timestamp: string;
  side: 'left' | 'right'; // 'left' per il destinatario, 'right' per l'utente
};

type Friend = {
  id: number;
  name: string;
  picture: string;
  chatlog: Message[];
};

type ProfileFriend = Friend & { // Estende Friend
  latest_timestamp: string;
  lastChat: string;
};

type Profile = {
  id: number;
  name: string;
  picture: string;
  status: string;
  friends: ProfileFriend[];
};
type ChatContextType = {
  profile: Profile;
  messages: Friend[]; // contiene chatlog
  sendMessage: (friendId: number, text: string) => void;
};

// Context

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(dummyData.profile); // anagrafica e anteprime profilo utente loggato

  function getLocalISOTimestamp() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, -1);
    return localISOTime;
}
  const sendMessage = (friendId: number, text: string) => {
  const newMessage: Message = {
    message_id: Date.now(),
    text,
    timestamp: getLocalISOTimestamp(),
    side: 'right'
  };



  // Update profilo friends
  setProfile(prevProfile => ({
    ...prevProfile,
    friends: prevProfile.friends.map(friend => {
      if (friend.id === friendId) {
        return {
          ...friend,
          chatlog: [...friend.chatlog, newMessage],
          latest_timestamp: newMessage.timestamp,
          lastChat: text
        };
      }
      return friend;
    })
  }));
};

  return (
    // Fornisce il profilo e le funzioni per inviare messaggi
    <ChatContext.Provider value={{ profile, messages: profile.friends, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};


// Hook per usare il context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat deve essere contenuto all\'interno di un ChatProvider');
  return context;
}
