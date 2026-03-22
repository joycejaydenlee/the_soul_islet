import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // 確保這裡的 A 是大寫
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)