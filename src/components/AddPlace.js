/// src/components/AddPlace.js

import { useState } from "react";
import axios from "axios";

function AddPlace(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  
  const handleSubmit = (e) => {      //  <== UPDATE THE FUNCTION
    e.preventDefault();

  
    const requestBody = { title, description };

    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${process.env.REACT_APP_API_URL}/places`,  requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then((response) => {
       
        setTitle("");
        setDescription("");
      
        props.refreshPlaces();
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

        <button className="btn btn-light" type="submit">Add Place</button>
      </form>
    </div>
  );
}

export default AddPlace;
