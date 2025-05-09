import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

import DonAppointment from './components/DonAppointment';
import DonAT from './components/DonAT';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import CreateDonorCenter from './components/CreateDonorCenter';
import DonorCenterList from './components/DonorCenterList'
import DonorCenterReport from './components/ReportInCenters'
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
    <Route path='/' element={<DonAppointment/>}/>
    <Route path='/DonAT' element={<DonAT/>}/>
    <Route path='/AppointmentConfirmation' element={<AppointmentConfirmation/>}/>
    <Route path='/CreateDonorCenter' element={<CreateDonorCenter/>}/>
    <Route path='/DonorCenterList' element={<DonorCenterList/>}/>

    <Route path='/HomePage' element={<HomePage/>}/>
    <Route path='/Footer' element={<Footer/>}/>
    <Route path='/Navbar' element={<Navbar/>}/>
    <Route path='/ReportInCenters' element={<DonorCenterReport/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
