import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from 'react-router-dom';
import NavbarX from './components/NavbarX'
import 'flowbite'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarX />
      <ThemeProvider>
        <div className="p-4 md:ml-60 mt-16">
          <App />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
