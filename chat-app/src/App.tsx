
import { Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import ChatLayout from './layouts/ChatLayout';
import EmptyChat from './pages/EmptyChat';

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Navigate to="/chatlist/1" />} />

      <Route path="/chatlist/:id_chatlist" element={<ChatLayout />}>
        <Route path="" element={<EmptyChat/>}/> {/* Elemento vuoto per ChatArea su Desktop */}
        <Route path="chat/:id_chat" element={<ChatPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
