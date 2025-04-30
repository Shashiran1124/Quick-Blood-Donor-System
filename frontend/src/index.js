import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DashBloodInventoryTable from './components/Icomponents/DashBloodInventoryTable';
import DashBloodInventoryForm from './components/Icomponents/DashBloodInventoryForm';
import DashSentBloodTable from './components/Icomponents/DashSentBloodTable';
import DashSentBloodForm from './components/Icomponents/DashSentBloodForm';
import HomePageInventory from './components/Icomponents/HomePageInventory';
import Dashinvlevel from './components/Icomponents/Dashinvlevel';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<HomePageInventory />} />
        <Route path="/dashBloodInventoryTable" element={<DashBloodInventoryTable />} />
        <Route path="/dashBloodInventoryForm" element={<DashBloodInventoryForm />} />
        <Route path="/dashsentBloodTable" element={<DashSentBloodTable />} />
        <Route path="/dashsentBloodForm" element={<DashSentBloodForm />} />
        <Route path="/Dashinvlevel" element={<Dashinvlevel />} />


        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
