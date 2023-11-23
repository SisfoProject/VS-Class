import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from 'react-router-dom';
import Navbarcom from './components/navbar.jsx';
import 'flowbite'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbarcom />
      <ThemeProvider>
        <div className="p-4 sm:ml-60 mt-32">
          <App />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
