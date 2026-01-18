import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("marcus@gmail.com");
  const [password, setPassword] = useState("Marcus@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
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
        },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        emailId,
        password,
        firstName,
        lastName,
      });
      console.log(res.data);
      dispatch(addUser(res.data.data));

      navigate("/profile");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <div>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-auto">
              <legend className="fieldset-legend">
                Enter your credentials
              </legend>

              {!isLogin && (
                <>
                  <label className="label">First Name</label>
                  <input
                    type="email"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <label className="label">Last Name</label>
                  <input
                    type="email"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}

              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="btn btn-neutral mt-4"
                onClick={isLogin ? handleLogin : handleSignUp}
              >
                {isLogin ? "Login" : "Sign-up"}
              </button>
            </fieldset>
          </div>
          <p className="mt-3" onClick={() => setIsLogin(!isLogin)}>
            {!isLogin ? (
              <>
                Existing User ? Please{" "}
                <span className="cursor-pointer text-blue-500">Login</span>
              </>
            ) : (
              <>
                New User ? Please{" "}
                <span className="cursor-pointer text-blue-500">Sign-Up</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
