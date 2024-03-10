import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.tsx';

import { Provider } from 'react-redux';

import store from './services/store';

const rootElement: HTMLElement | null = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);