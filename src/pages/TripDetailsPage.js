import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function TripDetailsPage(props) {
    const [trip, setTrip] = useState(null);

    const { tripId } = useParams();


    const getTrip = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/Trips/${tripId}`)
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

            {trip &&
                trip.tasks.map((task) => (
                    <li className="TaskCard card" key={task._id}>
                        <h3>{task.title}</h3>
                        <h4>Description:</h4>
                        <p>{task.description}</p>
                    </li>
                ))}

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