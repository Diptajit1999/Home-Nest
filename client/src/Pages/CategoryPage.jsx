import { useState, useEffect } from "react";
import "../Styles/List.scss";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../Components/Loader";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";
import styled from "styled-components"



const NoCategoryMessage = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #16bc2c;
  font-size: 1.6em;
  background-color: #565151;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/properties?category=${category}`,
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
  }, [category]);


  return (
    <>
      <Navbar />
      <h1 className="title-list">{category} listings</h1>
      <div className="list">
        {loading ? (
          <Loader />
        ) : listings.length > 0 ? (
          listings.map(
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
              booking = false,
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
          )
        ) : (
          <NoCategoryMessage>There are no {category} listings yet.</NoCategoryMessage>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
