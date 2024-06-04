import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import CreateListing from "./Pages/CreateListing";
import ListingDetails from "./Pages/ListingDetails";
import TripList from "./Pages/TripList";
import WishList from "./Pages/WishList"
import PropertyList from "./Pages/PropertyList";
import ReservationList from "./Pages/ReservationList";
import CategoryPage from "./Pages/CategoryPage";
import SearchPage from "./Pages/SearchPage";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
        </Routes>
      </BrowserRouter>
      <p>{process.env.REACT_APP_BACKEND_URL}</p>
    </div>
  );
}

export default App;
