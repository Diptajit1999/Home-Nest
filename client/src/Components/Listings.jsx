import { useEffect, useState, useCallback } from "react";
import { categories } from "../data";
import "../Styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings || []);
  console.log(listings);

  const getFeedListings = useCallback(async () => {
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
      console.log("Data properties fetching",data)
      if (Array.isArray(data)) {
        dispatch(setListings({ listings: data }));
      } else {
        dispatch(setListings({ listings: [] }));
      }
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory, getFeedListings]);

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

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
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
              booking = false
            }) => (
              <ListingCard
                key={_id}
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
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
