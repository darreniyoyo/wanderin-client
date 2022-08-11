import { useState, useEffect} from "react";
import axios from "axios";

function AddTrip(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState("");
  const [location, setLocation] = useState(null)
  const [places, setPlace] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  
  const getAllPlaces = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/places`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setPlace(response.data))
      .catch((error) => console.log(error));
};

useEffect(() => {
  getAllPlaces();
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, days, location };
console.log(requestBody);

    axios
      .post(`${process.env.REACT_APP_API_URL}/trips`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTitle("");
        setDescription("");
        setDays("");
        setLocation("");
        props.refreshTrips();
      })
      .catch((error) => console.log(error));
  };
  
  const handleChange = (e) => {
    setLocation(e.target.value)
    console.log(location)
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
    <label>Place:</label>
     <select onChange={handleChange} multiple={false}> 
      <option value={places}> -- Select a place -- </option>  
      {places?.map((places) => <option key={places._id} value={places.title}>{places.title}</option>)}
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
          type="number"
          name="days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
}

export default AddTrip;
