// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { StreamProvider } from './Context/StreamProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Router>
    <StreamProvider>
      <App />
    </StreamProvider>
  </Router>,
  // </React.StrictMode>,
);
