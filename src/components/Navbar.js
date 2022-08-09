
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
    <nav>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
      
      {isLoggedIn && (
        <>
          <NavLink to="/trips">
            <button>Trips</button>
          </NavLink>
        
          {/*   UPDATE   */}
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <NavLink to="/signup"> <button>Sign Up</button> </NavLink>
          <NavLink to="/login"> <button>Login</button> </NavLink>
        </>
      )}      

    </nav>
  );
}

export default Navbar;
