import { useState, useEffect } from "react";
import axios from "axios";
const storedToken = localStorage.getItem("authToken");

function AddTrip(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState("");
  const [places, setPlace] = useState([]);

const getAllPlaces = () => {
  axios
      .get(`${process.env.REACT_APP_API_URL}/places`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setPlace(response.data))
      .catch((error) => console.log(error));
};

// We set this effect will run only once, after the initial render
// by setting the empty dependency array - []
useEffect(() => {
  getAllPlaces();
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, days };


    axios
      .post(`${process.env.REACT_APP_API_URL}/trips`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        setDays("");

        props.refreshTrips(); //   <== ADD
      })
      .catch((error) => console.log(error));
  };
  
  const handleChange = (e) => {
    setPlace([e.target.value])
  }

  return (
    <div className="AddTrip">
      <h3>Add Trip</h3>

      <form onSubmit={handleSubmit}>
        {" "}
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
     <select onChange={handleChange} multiple={false}> 
      <option value={places}> -- Select a place -- </option>
          
      {places?.map((places) => <option key={places.title} value={places._id}>{places.title}</option>)}
    </select>
        
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value) }
        />
        <label>Number of Days:</label>
        <input
          type="Number"
          name="days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddTrip;
