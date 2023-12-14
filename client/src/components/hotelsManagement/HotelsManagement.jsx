import "./hotelsManagement.css";
import { useState } from "react";

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '4px',
  border: '1px solid #ddd',
  background: '#fcfcfc'
};

const buttonStyle = {
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#0056b3',
  color: 'white',
  cursor: 'pointer',
  margin: '10px 5px 10px 0'
};

const UpdateModal = ({ hotel, setShowUpdateModal, handleHotelQuery }) => {
  const { _id, ...hotelWithoutId } = hotel;
  const [newHotel, setNewHotel] = useState(hotelWithoutId);
  const handleHotelUpdate = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:8800/api/hotels/${hotel._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHotel),
      });
    } catch (err) {
      return err;
    }
    setShowUpdateModal(false);
    handleHotelQuery(e);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewHotel((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="updateModal">
      <div className="wrapper">
        <span>Name:</span>
        <input
          value={newHotel.name}
          id="name"
          placeholder="Enter new name"
          onChange={handleChange}
        />
        <span>Type:</span>
        <input
          value={newHotel.type}
          id="type"
          placeholder="Enter new type"
          onChange={handleChange}
        />
        <span>City:</span>
        <input
          value={newHotel.city}
          id="city"
          placeholder="Enter new city"
          onChange={handleChange}
        />
        <span>Address:</span>
        <input
          value={newHotel.address}
          id="address"
          placeholder="Enter new address"
          onChange={handleChange}
        />
        <span>Distance:</span>
        <input
          value={newHotel.distance}
          placeholder="Enter new distance"
          id="distance"
          onChange={handleChange}
        />
        <span>Photos:</span>
        <input
          value={newHotel.photos}
          placeholder="Enter new photos"
          id="photos"
          onChange={handleChange}
        />
        <span>Title:</span>
        <input
          value={newHotel.title}
          placeholder="Enter new title"
          id="title"
          onChange={handleChange}
        />
        <span>Desc:</span>
        <input
          value={newHotel.desc}
          placeholder="Enter new desc"
          id="desc"
          onChange={handleChange}
        />
        <span>Rating:</span>
        <input
          value={newHotel.rating}
          placeholder="Enter new rating"
          id="rating"
          onChange={handleChange}
        />
        <span>CheapestPrice:</span>
        <input
          value={newHotel.cheapestPrice}
          placeholder="Enter new cheapestPrice"
          id="cheapestPrice"
          onChange={handleChange}
        />
        <button onClick={handleHotelUpdate}>Update</button>
        <button onClick={() => setShowUpdateModal(false)}>Close</button>
      </div>
    </div>
  );
};

const HotelsManagement = () => {
  const [hotel, setHotel] = useState({
    hotelId: "",
    name: undefined,
    type: undefined,
    city: undefined,
    address: undefined,
    distance: undefined,
    photos: [],
    title: undefined,
    desc: undefined,
    rating: undefined,
    cheapestPrice: undefined,
    featured: false,
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotels, setHotels] = useState([]);

  const handleChange = (e) => {
    setHotel((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleHotelQuery = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8800/api/hotels/find/${hotel.hotelId}`
      );
      const result = await response.json();
      setHotels(result);
    } catch (err) {
      return err;
    }
  };

  const handleHotelDelete = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8800/api/hotels/${e.target.value}`, {
        method: "DELETE",
      });
      setHotels(hotels.filter((hotel) => hotel._id !== e.target.value));
    } catch (err) {
      return err;
    }
  };

  const handleHotelAdd = async (e) => {
    e.preventDefault();
    const newHotel = {};
    for (let key in hotel) {
      if (key !== "hotelId") {
        newHotel[key] = hotel[key];
      }
    }
    try {
      await fetch(`http://localhost:8800/api/hotels/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHotel),
      });
      handleHotelQuery(e);
      alert("Add Successfully");
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="hotels" style={{ fontFamily: 'Arial', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h2>Hotel Management</h2>
      <form id="hotelForm" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
        <div className="wrapper" style={{ marginBottom: '20px' }}>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            style={inputStyle}
            // className="input"
            onChange={handleChange}
            required
          />
          Type
          <input
            type="text"
            placeholder="Type"
            id="type"
            className="input"
            onChange={handleChange}
            required
          />
          City
          <input
            type="text"
            placeholder="city"
            id="city"
            className="input"
            onChange={handleChange}
            required
          />
          Address
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="input"
            onChange={handleChange}
            required
          />
          Distance
          <input
            type="text"
            placeholder="Distance"
            id="distance"
            className="input"
            onChange={handleChange}
            required
          />
          Photos
          <input
            type="text"
            placeholder="Photos"
            id="photos"
            className="input"
            onChange={handleChange}
            required
          />
          Title
          <input
            type="text"
            placeholder="Title"
            id="title"
            className="input"
            onChange={handleChange}
            required
          />
          Desc
          <input
            type="text"
            placeholder="Desc"
            id="desc"
            className="input"
            onChange={handleChange}
            required
          />
          Rating
          <input
            type="text"
            placeholder="Rating"
            id="rating"
            className="input"
            onChange={handleChange}
            required
          />
          CheapestPrice
          <input
            type="text"
            placeholder="Cheapest Price"
            id="cheapestPrice"
            className="input"
            onChange={handleChange}
            required
          />
        </div>
        <button className="button" style={buttonStyle} onClick={handleHotelAdd}>
          Add
        </button>
      </form>

      <form id="hotelForm">
        <label>Hotel Id:</label>
        <input
          type="text"
          placeholder="hotel Id"
          id="hotelId"
          style={inputStyle}
          // className="input"
          onChange={handleChange}
        />
        <button className="button" style={buttonStyle} onClick={handleHotelQuery}>
          Query
        </button>
      </form>
      <div class="query-results">
        <table class="recordsTable" style={{ width: '60%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>City</th>
              <th>Address</th>
              <th>Distance</th>
              <th>Title</th>
              <th>Desc</th>
              <th>Rating</th>
              <th>CheapestPrice</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => {
              return (
                <tr key={hotel._id}>
                  <td>{hotel._id}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.type}</td>
                  <td>{hotel.city}</td>
                  <td>{hotel.address}</td>
                  <td>{hotel.distance}</td>
                  <td>{hotel.title}</td>
                  <td>{hotel.desc}</td>
                  <td>{hotel.rating}</td>
                  <td>{hotel.cheapestPrice}</td>
                  <button onClick={handleHotelDelete} value={hotel._id}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setShowUpdateModal(true);
                      setSelectedHotel(hotel);
                    }}
                  >
                    Update
                  </button>
                </tr>
              );
            })}
            {showUpdateModal && (
              <UpdateModal
                hotel={selectedHotel}
                setShowUpdateModal={setShowUpdateModal}
                handleHotelQuery={handleHotelQuery}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelsManagement;

