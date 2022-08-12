
import { NavLink } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";  // <== IMPORT


function Navbar() {
  const { 
    isLoggedIn,
    user,                   // <== UPDATE
    logOutUser              // <== UPDATE
  } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-dark bg-dark">
        <NavLink className="nav-link" to="/">
        <button className="btn btn-sm btn-outline-secondary" type="button">Home</button>
      </NavLink>
      &nbsp;
      {isLoggedIn && (
        <>
          <NavLink className="nav-link" to="/trips">
            <button className="btn btn-sm btn-outline-secondary" type="button">Trips</button>
          </NavLink>
          &nbsp;
          <NavLink className="nav-link" to="/places">
          <button className="btn btn-sm btn-outline-secondary" type="button">Places</button>
          </NavLink>
          &nbsp;
          <button className="btn btn-sm btn-outline-secondary" onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <NavLink className="nav-link" to="/signup"> <button className="btn btn-sm btn-outline-secondary" type="button">Sign Up</button> </NavLink>
          &nbsp;
          <NavLink className="nav-link" to="/login"> <button className="btn btn-sm btn-outline-secondary" type="button">Login</button> </NavLink>
        </>
      )}     
    </nav>
  );
}

export default Navbar;
