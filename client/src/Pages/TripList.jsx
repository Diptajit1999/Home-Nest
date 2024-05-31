
import { useEffect, useState } from "react";
import { Typography,styled } from '@mui/material';
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const EmptyMessage = styled(Typography)`
  margin: 20px 0;
  padding: 20px;
  text-align: center;
  color: green;
  font-size: 1.2em;
  background-color: #c7b1b1;
  border-radius: 10px;
`;

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `https://homenest-backend.onrender.com/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList && tripList.length > 0 ? (
          tripList.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
            <ListingCard
              key={listingId._id}
              listingId={listingId._id}
              creator={hostId._id}
              listingPhotoPaths={listingId.listingPhotoPaths}
              city={listingId.city}
              province={listingId.province}
              country={listingId.country}
              category={listingId.category}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
            />
          ))
        ) : (
          <EmptyMessage variant="body1">Your trip list is empty.</EmptyMessage>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
