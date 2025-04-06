import './App.css';

import React, { useEffect, useState } from "react";
import axios from "axios";
import HospitalBloodInventory from './components/HospitalBloodInventory';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(response => setMessage(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1>Backend Message: {message}</h1>
      <HospitalBloodInventory></HospitalBloodInventory>
    </div>
  );
}

export default App;