import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credential, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });
      
      if (response.ok) alert("Successfully registered!");
      else {
        const result = await response.json();
        alert(result.message);
      }
    } catch (err) {
      return err;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });
      const result = await response.json();
      if (!response.ok) dispatch({ type: "LOGIN_FAILURE", payload: result });
      else {
        dispatch({ type: "LOGIN_SUCCESS", payload: result });
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FALURE", payload: err });
    }
  };

  return (
    <div className="login">
      <div className="loginHeader">StayInn</div>
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <div className="btms">
          <button onClick={handleLogin} className="lButton">
            Login
          </button>
          <button onClick={handleRegister} className="lButton">
            Register
          </button>
        </div>
        {error && <span>{error}</span>}
      </div>
    </div>
  );
};

export default Login;
