import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";


function PlaceDetailsPage(props) {
    const [place, setPlace] = useState(null);

    const { placeId } = useParams();


    const getPlace = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/Places/${placeId}`)
            .then((response) => {
                const onePlace = response.data;
                setPlace(onePlace);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getPlace();
    }, []);


    return (
        <div className="PlaceDetails">
            {place && (
                <>
                    <h1>{place.title}</h1>
                    <p>{place.description}</p>
                </>
            )}

            {place &&
                place.trips.map((trip) => (
                    <li className="TaskCard card" key={trip._id}>
                        <h3>{trip.title}</h3>
                        <h4>Description:</h4>
                        <p>{trip.description}</p>
                    </li>
                ))}

            <Link to={`/places/edit/${placeId}`}>
                <button>Edit</button>
            </Link>

            &nbsp;

            <Link to="/places">
                <button>Back to places</button>
            </Link>
        </div>
    );
}

export default PlaceDetailsPage;