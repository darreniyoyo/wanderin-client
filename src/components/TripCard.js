// src/components/TripCard.js

import { NavLink } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function TripCard ( { title, description, days, location, _id } ) {
  
  return (
    <div className="TripCard card">
      <h3>{title}</h3>
      <p style={{ maxWidth: "400px" }}>{description} </p>
      <p style={{ maxWidth: "400px" }}>{days} days</p>
      <p style={{ maxWidth: "400px" }}>{location}</p>
      <NavLink to={`/trips/${_id}`}>
        <button>More Details</button>
      </NavLink>
    </div>
  );
}

export default TripCard;
