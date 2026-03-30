import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@gsrosa/atlas-ui/styles';
import '@/styles/global.css';
import App from './shell-app';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
