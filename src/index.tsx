import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { TaskContextProvider } from "./store/TaskContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TaskContextProvider>
      <App />
    </TaskContextProvider>
  </React.StrictMode>
);
