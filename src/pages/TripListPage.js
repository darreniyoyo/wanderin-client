import { useState, useEffect } from "react";
import axios from "axios";
import AddTrip from "../components/AddTrip";
import TripCard from "../components/TripCard";


function TripListPage() {
    const [trips, setTrips] = useState([]);

    const getAllTrips = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/trips`)
            .then((response) => setTrips(response.data))
            .catch((error) => console.log(error));
    };

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getAllTrips();
    }, []);


    return (
        <div className="TripListPage">

            <AddTrip refreshTrips={getAllTrips} />
            <hr />

            {trips.map((trip) => {
                return (
                  <TripCard key={trip._id} {...trip} />
                );
            })}

        </div>
    );
}

export default TripListPage;
