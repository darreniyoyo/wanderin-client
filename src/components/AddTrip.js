import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddTrip(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/projects`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");

        props.refreshTrips(); //   <== ADD
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddTrip">
      <h3>Add Trip</h3>

      <form onSubmit={handleSubmit}>
        {" "}
        {/*  <== UPDATE   */}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddTrip;
