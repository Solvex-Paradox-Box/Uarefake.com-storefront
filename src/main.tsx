import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Analytics} from '@vercel/analytics/react';
import {SolvexAppRouter} from './router/SolvexAppRouter';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SolvexAppRouter />
    <Analytics />
  </StrictMode>,
);

