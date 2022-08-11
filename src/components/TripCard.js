// src/components/TripCard.js

import { NavLink } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function TripCard ( { title, description, days, _id } ) {
  
  return (
    <div className="TripCard card">
      <h3>{title}</h3>
      <p style={{ maxWidth: "400px" }}>{description} </p>
      <p style={{ maxWidth: "400px" }}>{days} days</p>
      <NavLink to={`/trips/${_id}`}>More Details
      </NavLink>
    </div>
  );
}

export default TripCard;
