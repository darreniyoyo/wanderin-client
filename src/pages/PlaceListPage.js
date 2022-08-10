import { useState, useEffect } from "react";
import axios from "axios";
import AddPlace from "../components/AddPlace";
import PlaceCard from "../components/PlaceCard";


function PlaceListPage() {
    const [places, setPlaces] = useState([]);

    const storedToken = localStorage.getItem("authToken");

    const getAllPlaces = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/places`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => setPlaces(response.data))
            .catch((error) => console.log(error));
    };

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getAllPlaces();
    }, []);

    return (
        <div className="PlaceListPage">

            <AddPlace refreshPlaces={getAllPlaces} />
            <hr />

            {places?.map((place) => {
                return (
                  <PlaceCard key={place._id} {...place} />
                );
            })}

        </div>
    );
}

export default PlaceListPage;
