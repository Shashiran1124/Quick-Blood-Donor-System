import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DonorCenterList = () => {
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate();

  // Fetch centers on load
  useEffect(() => {
    axios.get(`http://localhost:5000/donorCenters/get`)
      .then((res) => setCenters(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this center?")) {
      try {
        await axios.delete(`http://localhost:5000/donorCenters/delete/${id}`);
        setCenters(centers.filter(center => center._id !== id));
      } catch (error) {
        console.error("Error deleting center:", error);
      }
    }
  };

  // Update handler (navigates to form with data)
  const handleUpdate = (center) => {
    navigate('/CreateDonorCenter', { state: { center } });
  };

  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {centers.map((center) => (
        <div key={center._id} className="bg-white p-4 shadow-md rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">{center.centerName}</h2>
          <p><strong>Location:</strong> {center.city}</p>
          <p><strong>Contact:</strong> {center.phone}</p>
          <p><strong>Opening Hours:</strong> {center.openingStart} - {center.openingEnd}</p>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handleUpdate(center)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(center._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonorCenterList;
