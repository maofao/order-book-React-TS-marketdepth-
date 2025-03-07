import React from 'react';
import ReactDOM from 'react-dom/client';
import { MarketDepth } from './market-depth.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <MarketDepth />
  </React.StrictMode>
);