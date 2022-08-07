// src/components/TripCard.js

import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function TripCard ( { title, description, _id } ) {
  
  return (
    <div className="TripCard card">
      <Link to={`/trips/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{description} </p>
    </div>
  );
}

export default TripCard;
