import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7780/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Enter your credentials!</h2>
          <div>
            <input
              type="text"
              placeholder="Email ID"
              className="input my-2"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
