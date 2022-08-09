// src/App.js

import "./App.css";
import { Routes, Route } from "react-router-dom"; // <== IMPORT

import Navbar from "./components/Navbar"; // <== IMPORT
import HomePage from "./pages/HomePage"; // <== IMPORT
import TripDetailsPage from "./pages/TripDetailsPage";
import TripListPage from "./pages/TripListPage";
import EditTripPage from "./pages/EditTripPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

// src/App.js
// ... previous imports stay unchanged

import IsPrivate from "./components/IsPrivate";  // <== IMPORT
import IsAnon from "./components/IsAnon";  // <== IMPORT

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route path="/" element={ <HomePage /> } />

        <Route
          path="/trips"
          element={ <IsPrivate> <TripListPage /> </IsPrivate> } 
        />

        <Route
          path="/trips/:tripId"
          element={ <IsPrivate> <TripDetailsPage /> </IsPrivate> }
        />

        <Route
          path="/trips/edit/:tripId"
          element={ <IsPrivate> <EditTripPage /> </IsPrivate> } 
        />
        
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

      </Routes>
    </div>
  );
}

export default App;

