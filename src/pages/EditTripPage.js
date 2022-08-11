import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; //  <== IMPORT

function EditTripPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState("");
  const [location, setLocation] = useState(null);
  const [places, setPlace] = useState([]);

  const { tripId } = useParams(); //  // Get the URL parameter `:tripId`
  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneTrip = response.data;
        setTitle(oneTrip.title);
        setDescription(oneTrip.description);
        setDays(oneTrip.days);
        setLocation(oneTrip.location);
      })
      .catch((error) => console.log(error));
  }, [tripId]);

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, days, location };

    axios
      .put(`${process.env.REACT_APP_API_URL}/trips/${tripId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/trips/${tripId}`);
      });
  };

  return (
    <div className="EditTripPage">
      <h3>Edit Trip</h3>

      <form onSubmit={handleFormSubmit}>
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
          {places?.map((places) => (
            <option key={places._id} value={places.title}>
              {places.title}
            </option>
          ))}
        </select>
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Number of Days:</label>
        <input
          type="number"
          name="days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditTripPage;
