/// src/components/AddPlace.js

import { useState } from "react";
import axios from "axios";

function AddPlace(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  
  const handleSubmit = (e) => {      //  <== UPDATE THE FUNCTION
    e.preventDefault();

    // We need the trip id when creating the new Place
    const { tripId } = props;
    // Create an object representing the body of the POST request
    const requestBody = { title, description, tripId };

    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${process.env.REACT_APP_API_URL}/places`,  requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
        // Reset the state to clear the inputs
        setTitle("");
        setDescription("");
      
        // Invoke the callback function coming through the props
        // from the tripDetailsPage, to refresh the trip details
        props.refreshTrip();
      })
      .catch((error) => console.log(error));
  };

  
  return (
    <div className="AddPlace">
      <h3>Add New Place</h3>
      
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Place</button>
      </form>
    </div>
  );
}

export default AddPlace;
