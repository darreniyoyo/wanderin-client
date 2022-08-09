// src/pages/tripListPage.js

import { useState, useEffect } from "react";
import axios from "axios";

import AddTrip from "../components/AddTrip"; //  <== IMPORT
 import TripCard from "../components/TripCard"; //  <==  IMPORT

function TripListPage() {
  const [Trips, setTrips] = useState([]);

  const getAllTrips = () => {
    const storedToken = localStorage.getItem("authToken");  
    axios
      .get(`${process.env.REACT_APP_API_URL}/trips`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => setTrips(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllTrips();
  }, [] );

  
  return (
    <div className="TripListPage">
      
      <AddTrip refreshTrips={getAllTrips} />
      
     
      { Trips.map((trip) => (
        <TripCard key={trip._id} {...trip} />
      ))}     
       
    </div>
  );
}

export default TripListPage;

