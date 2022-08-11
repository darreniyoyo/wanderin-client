import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
const storedToken = localStorage.getItem("authToken");

function TripDetailsPage(props) {
    const [trip, setTrip] = useState(null);

    const { tripId } = useParams();


    const getTrip = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/Trips/${tripId}`, 
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then((response) => {
                const oneTrip = response.data;
                setTrip(oneTrip);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getTrip();
    }, []);


    return (
        <div className="TripDetails">
            {trip && (
                <>
                    <h1>{trip.title}</h1>
                    <p>{trip.location}</p>
                    <p>{trip.description}</p>
                </>
            )}

            <NavLink to={`/trips/edit/${tripId}`}>
                <button>Edit</button>
            </NavLink>

            &nbsp;

            <NavLink to="/trips">
                <button>Back to trips</button>
            </NavLink>
        </div>
    );
}

export default TripDetailsPage;