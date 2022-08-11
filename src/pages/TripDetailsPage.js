import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
const storedToken = localStorage.getItem("authToken");

function TripDetailsPage(props) {
    const [trip, setTrip] = useState(null);
    const navigate = useNavigate();
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

    const deleteTrip = () => {                  
        axios
          .delete(`${process.env.REACT_APP_API_URL}/trips/${tripId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then(() => {
            navigate("/trips");
          })
          .catch((err) => console.log(err));
      };  

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
            <button onClick={deleteTrip}>Delete</button>
        </div>
    );
}

export default TripDetailsPage;