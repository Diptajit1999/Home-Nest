import { useParams } from "react-router-dom";

import { Typography,styled } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";
import "../Styles/List.scss";

const EmptyMessage = styled(Typography)`
  margin: 20px 0;
  padding: 20px;
  text-align: center;
  color: #16bc2c;
  font-size: 1.6em;
  background-color: #565151;
  border-radius: 10px;
`;

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
  const listings = useSelector((state) => state.listings);

  const dispatch = useDispatch();

  const getSearchListings = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}Components/properties/search/${search}`, {
        method: "GET",
      });

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{search}</h1>
      <div className="list">
        {listings.length > 0 ? (
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
          <EmptyMessage variant="body1">
            No listings match the search term "{search}".
          </EmptyMessage>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
