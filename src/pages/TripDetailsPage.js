// src/pages/tripDetailsPage.js

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom"; // <== IMPORT 
import AddTrip from "../components/AddTrip";
import PlaceCard from "../components/PlaceCard";

const API_URL = "http://localhost:5005";        // <== ADD

function TripDetailsPage (props) {
  const [trip, setTrip] = useState(null);
  const { tripId } = useParams();            // <== ADD
  
  
  // Helper function that makes a GET request to the API
  // and retrieves the trip by id
  const getTrip = () => {  
    const storedToken = localStorage.getItem("authToken");
    axios
    .get(
        `${API_URL}/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneTrip = response.data;
        setTrip(oneTrip);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {                   // <== ADD AN EFFECT
    getTrip();
  }, [] );

  
  return (
    <div className="tripDetails">
      {trip && (
        <>
          <h1>{trip.title}</h1>
          <p>{trip.description}</p>
        </>
      )}

<AddTrip refreshTrip={getTrip} tripId={tripId} />   

{ trip && trip.places.map((place) => (
        <PlaceCard key={place._id} {...place} /> 
      ))} 
      

      <Link to="/trips">
        <button>Back to trips</button>
      </Link>
      

      <Link to={`/trips/edit/${tripId}`}>
        <button>Edit Trip</button>
      </Link>      
      
    </div>
  );
}

export default TripDetailsPage;
