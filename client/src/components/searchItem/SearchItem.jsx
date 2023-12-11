import "./searchItem.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"

const SearchItem = ({ item }) => {
  console.log(item);
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siType">{item.type}</span>
        <span className="siAddress">{item.address}</span>
        <span className="siFeatures">{item.desc}</span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>{item.rating >= 4 ? "Excellent" : "Mediocre"}</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

SearchItem.propTypes = {
  item: PropTypes.shape({
    address: PropTypes.string.isRequired,
    cheapestPrice: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired,
    rooms: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  })
}
