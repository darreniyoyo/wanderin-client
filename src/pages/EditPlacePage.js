import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT 


function EditPlacePage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const { placeId } = useParams(); //  // Get the URL parameter `:placeId` 
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

    // This effect will run after the initial render and each time
    // the place id coming from URL parameter `placeId` changes
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/places/${placeId}`)
            .then((response) => {
                /* 
                  We update the state with the place data coming from the response.
                  This way we set inputs to show the actual title and description of the project
                */
                const onePlace = response.data;
                setTitle(onePlace.title);
                setDescription(onePlace.description);
            })
            .catch((error) => console.log(error));

    }, [placeId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the body of the PUT request
        const requestBody = { title, description };

        // Make a PUT request to update the place
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/places/${placeId}`, 
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                // Once the request is resolved successfully and the place
                // is updated we navigate back to the details page
                navigate(`/places/${placeId}`)
            });
    };


    return (
        <div className="EditPlacePage">
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

                <button type="submit">Update Place</button>
            </form>
        </div>
    );
}

export default EditPlacePage;
