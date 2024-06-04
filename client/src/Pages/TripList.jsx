import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";

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

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}Components/users/${userId}/trips`,
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
        {tripList?.length > 0 ? (
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
          <NoTripsMessage>No trips booked yet.</NoTripsMessage>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
