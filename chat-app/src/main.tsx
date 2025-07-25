import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChatProvider } from './context/ChatContext.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'

import App from './App.tsx'
const theme = createTheme(); 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
 <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ChatProvider>
          <App />
        </ChatProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
