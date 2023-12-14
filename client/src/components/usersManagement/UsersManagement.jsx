import "./usersManagement.css";
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

const UpdateModal = ({ userId, setShowUpdateModal, handleUserQuery }) => {
  const [newPassword, setNewPassword] = useState("");

  const handleUserUpdate = async (e) => {
    e.preventDefault();
   
    try {
      await fetch(`http://localhost:8800/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"password" : newPassword})
      });
    } catch (err) {
      return err;
    }
    setShowUpdateModal(false);
    handleUserQuery(e);
  };

  return (
    <div className="updateModal">
      <input
        value={newPassword}
        placeholder="Enter new password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleUserUpdate}>Update</button>
      <button onClick={() => setShowUpdateModal(false)}>Close</button>
    </div>
  );
};

const UsersManagement = () => {
  const [userId, setUserId] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleUserQuery = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8800/api/users/${userId}`);
      const result = await response.json();
      setUsers(result);
    } catch (err) {
      return err;
    }
  };

  const handleUserDelete = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8800/api/users/${e.target.value}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user._id !== e.target.value));
    } catch (err) {
      return err;
    }
  };

  return (
    <div className="users" style={{ fontFamily: 'Arial', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h2>User Management</h2>
      <form id="userForm" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
        <label>UserId:</label>
        <input
          type="text"
          placeholder="userId"
          id="userId"
          style={inputStyle}
          // className="input"
          onChange={handleChange}
        />
        <button className="button" style={buttonStyle} onClick={handleUserQuery}>
          Query
        </button>
      </form>
      <div className="query-results" style={{ overflowX: 'auto' }}>
        <table className="recordsTable" style={{ width: '30%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>UserId</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <button onClick={handleUserDelete} value={user._id}>
                    Delete
                  </button>
                  <button onClick={() => {
                    setShowUpdateModal(true);
                    setSelectedUserId(user._id);
                  }} >
                    Update
                  </button>
                </tr>
              );
            })}
            {showUpdateModal && (<UpdateModal userId={selectedUserId} setShowUpdateModal={setShowUpdateModal} handleUserQuery={handleUserQuery}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
