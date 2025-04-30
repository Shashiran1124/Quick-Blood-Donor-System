import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(response => setMessage(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1>Backend Message: {message}</h1>
      <button onClick={() => navigate('/DonAppointment')}>go</button>
    </div>
  );
}

export default App;