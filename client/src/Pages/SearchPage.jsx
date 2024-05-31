// import { useParams } from "react-router-dom";
// import "../styles/List.scss"
// import { useSelector,useDispatch  } from "react-redux";
// import { setListings } from "../redux/state";
// import { useEffect, useState } from "react";
// import Loader from "../components/Loader"
// import Navbar from "../components/Navbar";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"

// const SearchPage = () => {
//   const [loading, setLoading] = useState(true)
//   const { search } = useParams()
//   const listings = useSelector((state) => state.listings)

//   const dispatch = useDispatch()

//   const getSearchListings = async () => {
//     try {
//       const response = await fetch(`https://homenest-backend.onrender.com/properties/search/${search}`, {
//         method: "GET"
//       })

//       const data = await response.json()
//       dispatch(setListings({ listings: data }))
//       setLoading(false)
//     } catch (err) {
//       console.log("Fetch Search List failed!", err.message)
//     }
//   }

//   useEffect(() => {
//     getSearchListings()
//   }, [search])
  
//   return loading ? <Loader /> : (
//     <>
//       <Navbar />
//       <h1 className="title-list">{search}</h1>
//       <div className="list">
//         {listings?.map(
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
// }

// export default SearchPage


import { useParams } from "react-router-dom";
import { Typography,styled } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import "../styles/List.scss";

const EmptyMessage = styled(Typography)`
  margin: 20px 0;
  padding: 20px;
  text-align: center;
  color: green;
  font-size: 1.2em;
  background-color: #c7b1b1;
  border-radius: 10px;
`;

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
  const listings = useSelector((state) => state.listings);

  const dispatch = useDispatch();

  const getSearchListings = async () => {
    try {
      const response = await fetch(`https://homenest-backend.onrender.com/properties/search/${search}`, {
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
