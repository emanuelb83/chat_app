// Messaggi Singoli
export type Message = {
  text: string;
  timestamp: string;
  side: 'left' | 'right';
  message_id: number;
};

// Chat tra amici
export type Friend = {
  id: number;
  name: string;
  picture: string;
  latest_timestamp: string;
  lastChat: string;
  chatlog?: Message[];
};
// Profilo Utente
export type Profile = {
  id: number;
  name: string;
  picture: string;
  status: string;
  chatlog: Message[]; // chat completa
};
// Profilo Completo con amici
export type ChatData = {
  profile: Profile;
  friends: Friend[]; // Elenco dei friends con chat
};


