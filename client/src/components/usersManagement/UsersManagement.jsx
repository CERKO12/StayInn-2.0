import "./usersManagement.css";
import { useState } from "react";

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
    <div className="users">
      <h2>User Management</h2>
      <form id="userForm">
        UserId:
        <input
          type="text"
          placeholder="userId"
          id="userId"
          className="input"
          onChange={handleChange}
        />
        <button className="button" onClick={handleUserQuery}>
          Query
        </button>
      </form>
      <div class="query-results">
        <table class="recordsTable">
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
