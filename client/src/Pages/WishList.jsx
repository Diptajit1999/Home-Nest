// import "../styles/List.scss";
// import { useSelector } from "react-redux";
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"

// const WishList = () => {
//   const wishList = useSelector((state) => state.user.wishList);

//   return (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Wish List</h1>
//       <div className="list">
//         {wishList?.map(
//           ({
//             _id,
//             creator,
//             listingPhotoPaths,
//             city,
//             province,
//             country,
//             category,
//             type,
//             price,
//             booking = false,
//           }) => (
//             <ListingCard
//               listingId={_id}
//               creator={creator}
//               listingPhotoPaths={listingPhotoPaths}
//               city={city}
//               province={province}
//               country={country}
//               category={category}
//               type={type}
//               price={price}
//               booking={booking}
//             />
//           )
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default WishList;


import { useSelector } from "react-redux";
import { Typography,styled } from '@mui/material';
import "../styles/List.scss";
import Navbar from "../components/Navbar";
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

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {wishList && wishList.length > 0 ? (
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
          <EmptyMessage variant="body1">Your wishlist is empty.</EmptyMessage>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishList;

