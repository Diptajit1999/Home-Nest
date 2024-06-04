import styled from "styled-components";
import "../Styles/List.scss";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";

const EmptyMessage = styled.p`
  margin: 20px 0;
  padding: 20px;
  text-align: center;
  color: #16bc2c;
  font-size: 1.6em;
  background-color: #565151;
  border-radius: 10px;
`;


const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList?.length > 0 ? (
          wishList.map(
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
          <EmptyMessage>Your wish list is empty.</EmptyMessage>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishList;
