import "./roomsManagement.css";
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
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#0056b3',
  color: 'white',
  cursor: 'pointer',
  margin: '10px 5px 10px 0'
};

const UpdateModal = ({ room, setShowUpdateModal, handleRoomQuery }) => {
  const { _id, ...roomWithoutId } = room;
  const [newRoom, setNewRoom] = useState(roomWithoutId);
  const handleRoomUpdate = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:8800/api/rooms/${room._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
      });
    } catch (err) {
      return err;
    }
    setShowUpdateModal(false);
    handleRoomQuery(e);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewRoom((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="updateModal">
      <div className="wrapper">
        <span>Title:</span>
        <input
          value={newRoom.title}
          id="title"
          placeholder="Enter new title"
          onChange={handleChange}
        />
        <span>Desc:</span>
        <input
          value={newRoom.desc}
          id="desc"
          placeholder="Enter new desc"
          onChange={handleChange}
        />
        <span>Price:</span>
        <input
          value={newRoom.price}
          id="price"
          placeholder="Enter new price"
          onChange={handleChange}
        />
        <span>Max People:</span>
        <input
          value={newRoom.maxPeople}
          placeholder="Enter new maxPeople"
          id="maxPeople"
          onChange={handleChange}
        />
        <button onClick={handleRoomUpdate}>Update</button>
        <button onClick={() => setShowUpdateModal(false)}>Close</button>
      </div>
    </div>
  );
};

const RoomsManagement = () => {
  const [room, setRoom] = useState({
    roomId: "",
    title: undefined,
    desc: undefined,
    price: undefined,
    maxPeople: undefined,
    roomNumbers: [],
    hotelId: undefined,
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  const handleChange = (e) => {
    setRoom((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRoomQuery = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8800/api/rooms/${room.roomId}`
      );
      const result = await response.json();
      setRooms(result);
    } catch (err) {
      return err;
    }
  };

  const handleRoomDelete = async (e, roomId, hotelId) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8800/api/rooms/${roomId}/${hotelId}`, {
        method: "DELETE",
      });
      setRooms(rooms.filter((room) => room._id !== roomId));
    } catch (err) {
      return err;
    }
  };

  const handleRoomAdd = async (e) => {
    e.preventDefault();
    const newRoom = {};
    for (let key in room) {
      if (key !== "roomId") {
        newRoom[key] = room[key];
      }
    }
    try {
      await fetch(`http://localhost:8800/api/rooms/${room.hotelId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
      });
      handleRoomQuery(e);
      alert("Add Successfully");
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="rooms" style={{ fontFamily: 'Arial', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h2>Room Management</h2>
      <form id="roomForm" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
        <div className="wrapper" style={{ marginBottom: '20px' }}>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Title"
            id="title"
            style={inputStyle}
            // className="input"
            onChange={handleChange}
            required
          />
          Desc:
          <input
            type="text"
            placeholder="Desc"
            id="desc"
            className="input"
            onChange={handleChange}
            required
          />
          Price:
          <input
            type="text"
            placeholder="Price"
            id="price"
            className="input"
            onChange={handleChange}
            required
          />
          maxPeople:
          <input
            type="text"
            placeholder="Max People"
            id="maxPeople"
            className="input"
            onChange={handleChange}
            required
          />
          Room Numbers:
          <input
            type="text"
            placeholder="Room Numbers"
            id="roomNumbers"
            className="input"
            onChange={handleChange}
            required
          />
          Hotel Id:
          <input
            type="text"
            placeholder="Hotel Id"
            id="hotelId"
            className="input"
            onChange={handleChange}
            required
          />
        </div>
        <button className="button" style={buttonStyle} onClick={handleRoomAdd}>
          Add
        </button>
      </form>

      <form id="roomForm">
        <label>Room Id:</label>
        <input
          type="text"
          placeholder="room Id"
          id="roomId"
          style={inputStyle}
          // className="input"
          onChange={handleChange}
        />
        <button className="button" style={buttonStyle} onClick={handleRoomQuery}>
          Query
        </button>
      </form>
      <div class="query-results" style={{ overflowX: 'auto' }}>
        <table class="recordsTable" style={{ width: '60%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Desc</th>
              <th>Price</th>
              <th>maxPeople</th>
              <th>roomNumbers</th>
              <th>hotelId</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => {
              return (
                <tr key={room._id}>
                  <td>{room._id}</td>
                  <td>{room.title}</td>
                  <td>{room.desc}</td>
                  <td>{room.price}</td>
                  <td>{room.maxPeople}</td>
                  <td>
                    {room.roomNumbers.map((roomNumber) => {
                      return roomNumber.number + " ";
                    })}
                  </td>
                  <td>{room.hotelId}</td>
                  <td>
                    <button
                      onClick={(e) =>
                        handleRoomDelete(e, room._id, room.hotelId)
                      }
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setShowUpdateModal(true);
                        setSelectedRoom(room);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
            {showUpdateModal && (
              <UpdateModal
                room={selectedRoom}
                setShowUpdateModal={setShowUpdateModal}
                handleRoomQuery={handleRoomQuery}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsManagement;
