// import { useEffect, useState } from "react";
// import { categories } from "../data";
// import "../styles/Listings.scss";
// import ListingCard from "./ListingCard";
// import Loader from "./Loader";
// import { useDispatch, useSelector } from "react-redux";
// import { setListings } from "../redux/state";

// const Listings = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);

//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const listings = useSelector((state) => state.listings);

//   const getFeedListings = async () => {
//     try {
//       const response = await fetch(
//         selectedCategory !== "All"
//           ? `https://homenest-backend.onrender.com/properties?category=${selectedCategory}`
//           : "https://homenest-backend.onrender.com/properties",
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       dispatch(setListings({ listings: data }));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Listings Failed", err.message);
//     }
//   };

//   useEffect(() => {
//     getFeedListings();
//   }, [selectedCategory]);

//   return (
//     <>
//       <div className="category-list">
//         {categories?.map((category, index) => (
//           <div
//             className={`category ${category.label === selectedCategory ? "selected" : ""}`}
//             key={index}
//             onClick={() => setSelectedCategory(category.label)}
//           >
//             <div className="category_icon">{category.icon}</div>
//             <p>{category.label}</p>
//           </div>
//         ))}
//       </div>

//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="listings">
//           {listings.map(
//             ({
//               _id,
//               creator,
//               listingPhotoPaths,
//               city,
//               province,
//               country,
//               category,
//               type,
//               price,
//               booking=false
//             }) => (
//               <ListingCard
//                 listingId={_id}
//                 creator={creator}
//                 listingPhotoPaths={listingPhotoPaths}
//                 city={city}
//                 province={province}
//                 country={country}
//                 category={category}
//                 type={type}
//                 price={price}
//                 booking={booking}
//               />
//             )
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Listings;


import { useEffect, useState } from "react";
import { Typography,styled } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";

const EmptyMessage = styled(Typography)`
  margin: 20px 0;
  padding: 20px;
  text-align: center;
  color: green;
  font-size: 1.2em;
  background-color: #c7b1b1;
  border-radius: 10px;
`;

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
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
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

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
                booking=false
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
            <EmptyMessage variant="body1">There are no listings in this category right now.</EmptyMessage>
          )}
        </div>
      )}
    </>
  );
};

export default Listings;
