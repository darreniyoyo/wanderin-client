function PlaceCard({ title, description }) {
    return (
      <div className="PlaceCard card">
        <h3>{title}</h3>
        <h4>Description:</h4>
        <p>{description}</p>
      </div>
    );
  }
  
  export default PlaceCard;
  