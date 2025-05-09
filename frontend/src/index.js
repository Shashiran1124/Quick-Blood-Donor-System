import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import HospitalBloodInventory from './components/HospitalBloodInventory';
import CommonPage from './components/CommonPage';
import Login from './components/Login';
import AdminDashbord from './components/AdminDashbord';
import AboutUs from './components/AboutUs';
import ClientDashBord from './components/ClientDashBord';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
       <Routes>
       <Route path="/ClientDashBord" element={<ClientDashBord />} />,
       <Route path="/AboutUs" element={<AboutUs />} />,
       <Route path="/admin-dashbord" element={<AdminDashbord />} />
       <Route path="/Login" element={<Login />} />,
       <Route path="/CommonPage" element={<CommonPage />} />,
       <Route path="/" element={<HospitalBloodInventory />}/>
       

       </Routes>

    </BrowserRouter>
  </React.StrictMode>
);
    //<App />

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
