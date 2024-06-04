import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";

const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  margin-left: 100px;
`;

const Message = styled.p`
  margin: 20px 0;
  padding: 20px;
  text-align: center;
  color: #16bc2c;
  font-size: 1.6em;
  background-color: #565151;
  border-radius: 10px;
`;

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);
  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <Title>Your Reservation List</Title>
      <div className="list">
        {reservationList?.length > 0 ? (
          reservationList.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
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
          <Message>No reservations found.</Message>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
