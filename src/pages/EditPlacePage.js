import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT 

const storedToken = localStorage.getItem("authToken");

function EditPlacePage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const { placeId } = useParams(); //  // Get the URL parameter `:placeId` 
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/places/${placeId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
              })
            .then((response) => {
                const onePlace = response.data;
                setTitle(onePlace.title);
                setDescription(onePlace.description);
            })
            .catch((error) => console.log(error));

    }, [placeId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();

        const requestBody = { title, description };

        axios
            .put(
                `${process.env.REACT_APP_API_URL}/places/${placeId}`, 
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                navigate(`/places/${placeId}`)
            });
    };


    return (
        <div className="EditTripPage">
            <h3>Edit the Place</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditPlacePage;
