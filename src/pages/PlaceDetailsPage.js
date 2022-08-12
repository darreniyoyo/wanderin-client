import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
const storedToken = localStorage.getItem("authToken");


function PlaceDetailsPage(props) {
    const [place, setPlace] = useState(null);

    const { placeId } = useParams();


    const getPlace = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/Places/${placeId}`, 
            { headers: { Authorization: `Bearer ${storedToken}` } }
            )
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

            <NavLink to={`/places/edit/${placeId}`}>
                <button className="btn btn-light">Edit</button>
            </NavLink>

            &nbsp;

            <NavLink to="/places">
                <button className="btn btn-light">Back to places</button>
            </NavLink>
        </div>
    );
}

export default PlaceDetailsPage;