import { categories } from "../data";
import "../styles/Categories.scss"
import { Link } from "react-router-dom";
import styled from "styled-components"

const Para = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #16bc2c;
  font-size: 1.6em;
  background-color: #565151;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Categories = () => {
  return (
    <div className="categories">
      <h1>Discover Top Places to Visit </h1>
      <Para>
        Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
      </Para>

      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`}>
            <div className="category" key={index}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
