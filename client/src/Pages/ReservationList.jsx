
import { useEffect, useState } from "react";
import { Typography,styled } from '@mui/material';
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
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

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);

  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `https://homenest-backend.onrender.com/users/${userId}/reservations`,
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
      <h1 className="title-list">Your Reservation List</h1>
      <div className="list">
        {reservationList && reservationList.length > 0 ? (
          reservationList.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
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
          <EmptyMessage variant="body1">Your reservation list is empty.</EmptyMessage>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;