import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

global.requestAnimationFrame = function(callback) {
  setTimeout(callback);
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
