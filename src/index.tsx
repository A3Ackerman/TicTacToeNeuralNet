import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <p>Welcome to the Tic Tac Toe Neural Net! This project is currently under development.</p>
    <p>This is a Neural Net consisting of a single fully connected layer (no hidden layers) with a sigmoid activation function and cross-entropy loss</p>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
