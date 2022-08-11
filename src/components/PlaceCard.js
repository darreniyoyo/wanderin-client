import { NavLink } from "react-router-dom";

function PlaceCard({ title, description, _id }) {
    return (
      <div className="PlaceCard card">
        <h3>{title}</h3>
        <p>{description}</p>
          <NavLink to={`/places/${_id}`}>More details
      </NavLink>
      </div>
    );
  }
  
  export default PlaceCard;
  