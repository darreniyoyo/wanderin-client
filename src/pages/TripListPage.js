import { useState, useEffect } from "react";
import axios from "axios";
import AddTrip from "../components/AddTrip";
import TripCard from "../components/TripCard";


function TripListPage() {
    const storedToken = localStorage.getItem("authToken");
    const [trips, setTrips] = useState(null);


    const getAllTrips = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/trips`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => setTrips(response.data))
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        getAllTrips();
    }, []);
    
    
    return (
        <div className="TripListPage">

            <AddTrip refreshTrips={getAllTrips} />
            <hr />
            
            {trips && trips?.map((trip) => {
                return (
                  <TripCard key={trip._id} {...trip} />
                );
            })}
        </div>
    );
}

export default TripListPage;
