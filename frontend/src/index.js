import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import './index.css';
//
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import AllUsers from './components/AllUsers';
import UserUpdateForm from './components/UserUpdateForm';
//import Layout from './components/Layout';
//import RegistrationFoot from './components/RegistrationFoot';
//import RegistrationNav from './components/RegistrationNav';






import DonAppointment from './components/DonAppointment';
import DonAT from './components/DonAT';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import CreateDonorCenter from './components/CreateDonorCenter';
import DonorCenterList from './components/DonorCenterList'
import DonorCenterReport from './components/ReportInCenters'
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';


import DashBloodInventoryTable from './components/Icomponents/DashBloodInventoryTable';
import DashBloodInventoryForm from './components/Icomponents/DashBloodInventoryForm';
import DashSentBloodTable from './components/Icomponents/DashSentBloodTable';
import DashSentBloodForm from './components/Icomponents/DashSentBloodForm';
import HomePageInventory from './components/Icomponents/HomePageInventory';
import Dashinvlevel from './components/Icomponents/Dashinvlevel';
import Dashreport from './components/Icomponents/report';

import HospitalBloodInventory from './components/HospitalBloodInventory';
import CommonPage from './components/CommonPage';
import AboutUsPage from './components/AboutUs';
import Login from './components/Login';
import ClientDashBord from './components/ClientDashBord';
import AdminDashboard from './components/AdminDashbord';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Users />} />
      {/*<Route path="/Users" element={<Users />} />*/}
      <Route path="/AllUsers" element={<AllUsers />} />
      <Route path="/UserUpdateForm/:id" element={<UserUpdateForm />} />
    </Routes>
   
    </BrowserRouter>
    <BrowserRouter>
      <Routes>
         <Route path='/DonAppointment' element={<DonAppointment/>}/>
         <Route path='/DonAT' element={<DonAT/>}/>
         <Route path='/AppointmentConfirmation' element={<AppointmentConfirmation/>}/>
         <Route path='/CreateDonorCenter' element={<CreateDonorCenter/>}/>
         <Route path='/DonorCenterList' element={<DonorCenterList/>}/>

         <Route path='/.' element={<HomePage/>}/>
         <Route path='/Footer' element={<Footer/>}/>
         <Route path='/Navbar' element={<Navbar/>}/>
         <Route path='/ReportInCenters' element={<DonorCenterReport/>}/>
         <Route path="/HomePageInventory" element={<HomePageInventory />} />
         <Route path="/dashBloodInventoryTable" element={<DashBloodInventoryTable />} />
         <Route path="/dashBloodInventoryForm" element={<DashBloodInventoryForm />} />
         <Route path="/dashsentBloodTable" element={<DashSentBloodTable />} />
         <Route path="/dashsentBloodForm" element={<DashSentBloodForm />} />
         <Route path="/Dashinvlevel" element={<Dashinvlevel />} />
         <Route path="/report" element={<Dashreport />} />

         <Route path="HospitalBloodInventry" element={<HospitalBloodInventory />}/>
         <Route path="/AboutUs" element={<AboutUsPage />}/>
         <Route path="/Login" element={<Login />}/>
         <Route path='/' element={<CommonPage/>}/>
         <Route path='/ClientDashBord' element={<ClientDashBord/>}/>
         <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
         

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



);
reportWebVitals();




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

