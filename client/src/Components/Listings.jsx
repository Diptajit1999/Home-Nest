import { useEffect, useState } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import styled from "styled-components"
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";


const NoTripsMessage = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #16bc2c;
  font-size: 1.6em;
  background-color: #565151;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoginPrompt = styled.p`
  text-align: center;
  color: #16bc2c;
  font-size: 1.6em;
  background-color: #565151;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 30%;
  max-width: 40%;
  margin: 0 auto; /* Centers horizontally */
`;


const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);
  const user = useSelector((state) => state.user);

  
  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `https://homenest-backend.onrender.com/properties?category=${selectedCategory}`
          : "https://homenest-backend.onrender.com/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  // Function to check if there are no listings for the selected category
  const noListingsForCategory = () => {
    if (selectedCategory !== "All" && listings.length === 0) {
      return <NoTripsMessage className="no-listings-message">No listings available for {selectedCategory}</NoTripsMessage>;
    }
    return null;
  };

  return (
    <>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${category.label === selectedCategory ? "selected" : ""}`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {user? (loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {noListingsForCategory()}
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking=false
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
                key={_id}
              />
            )
          )}
        </div>
      )):(
        <LoginPrompt>Login to see the listings of the places</LoginPrompt>
      )}
    </>
  );
};

export default Listings;

