import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  //  <== IMPORT 


function EditTripPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const { tripId } = useParams(); //  // Get the URL parameter `:tripId` 
    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");

    // This effect will run after the initial render and each time
    // the trip id coming from URL parameter `tripId` changes
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/trips/${tripId}`)
            .then((response) => {
                /* 
                  We update the state with the trip data coming from the response.
                  This way we set inputs to show the actual title and description of the project
                */
                const oneTrip = response.data;
                setTitle(oneTrip.title);
                setDescription(oneTrip.description);
            })
            .catch((error) => console.log(error));

    }, [tripId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the body of the PUT request
        const requestBody = { title, description };

        // Make a PUT request to update the trip
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/trips/${tripId}`, 
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                // Once the request is resolved successfully and the trip
                // is updated we navigate back to the details page
                navigate(`/trips/${tripId}`)
            });
    };


    return (
        <div className="EditTripPage">
            <h3>Edit the Trip</h3>

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

                <button type="submit">Update Trip</button>
            </form>
        </div>
    );
}

export default EditTripPage;
