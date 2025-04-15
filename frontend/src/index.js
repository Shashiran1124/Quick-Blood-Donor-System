import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import './index.css';

import reportWebVitals from './reportWebVitals';
import DonAppointment from './components/DonAppointment';
import DonAT from './components/DonAT';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import CreateDonorCenter from './components/CreateDonorCenter';
import DonorCenterList from './components/DonorCenterList'
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import DashBloodInventoryTable from './components/Icomponents/DashBloodInventoryTable';
import DashBloodInventoryForm from './components/Icomponents/DashBloodInventoryForm';
import DashSentBloodTable from './components/Icomponents/DashSentBloodTable';
import DashSentBloodForm from './components/Icomponents/DashSentBloodForm';
import HomePageInventory from './components/Icomponents/HomePageInventory';
import Dashinvlevel from './components/Icomponents/Dashinvlevel';

import HospitalBloodInventory from './components/HospitalBloodInventory';


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

    <Route path="/" element={<HomePageInventory />} />
    <Route path="/dashBloodInventoryTable" element={<DashBloodInventoryTable />} />
    <Route path="/dashBloodInventoryForm" element={<DashBloodInventoryForm />} />
    <Route path="/dashsentBloodTable" element={<DashSentBloodTable />} />
    <Route path="/dashsentBloodForm" element={<DashSentBloodForm />} />
    <Route path="/Dashinvlevel" element={<Dashinvlevel />} />
    <Route path="/" element={<HospitalBloodInventory />}/>

    </Routes>
  </BrowserRouter>



    
);

reportWebVitals();




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

