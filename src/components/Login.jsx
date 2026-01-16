import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import NavbarAuth from "./NavbarAuth";

const Login = () => {
  const [emailId, setEmailId] = useState("marcus@gmail.com");
  const [password, setPassword] = useState("Marcus@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //     <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
    //   <legend className="fieldset-legend">Login</legend>

    //   <label className="label">Email</label>
    //   <input type="email" className="input" placeholder="Email" />

    //   <label className="label">Password</label>
    //   <input type="password" className="input" placeholder="Password" />

    //   <button className="btn btn-neutral mt-4">Login</button>
    // </fieldset>
    <div>
      <div className="flex justify-center mt-20">
        <div className="card card-border bg-base-100 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">
              Enter your credentials!
            </h2>
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
    </div>
  );
};

export default Login;
