import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
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
                    <p>{trip.description}</p>
                </>
            )}

            {/* {trip &&
                trip.places.map((places) => (
                    <li className="PlaceCard card" key={places._id}>
                        <h3>{places.title}</h3>
                        <h4>Description:</h4>
                        <p>{places.description}</p>
                    </li>
                ))} */}

            <Link to={`/trips/edit/${tripId}`}>
                <button>Edit</button>
            </Link>

            &nbsp;

            <Link to="/trips">
                <button>Back to trips</button>
            </Link>
        </div>
    );
}

export default TripDetailsPage;