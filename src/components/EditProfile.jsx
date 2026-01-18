import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Toast from "./Toast";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(
    Array.isArray(user?.skills) ? user.skills.join(", ") : "",
  );
  const [toast, setToast] = useState(false);

  const updateProfile = async () => {
    try {
      const skillsArray = skills
        ? skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : [];
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
          skills: skillsArray,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      console.log("Error details:", error);
      console.log("Error response:", error.response?.data);
      console.log("Error status:", error.response?.status);
    }
  };

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm p-6">
        <h3 className="card-title">Edit Profile</h3>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">First Name</legend>
          <input
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Last Name</legend>
          <input
            type="text"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">PhotoURL</legend>
          <input
            type="text"
            className="input"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Age</legend>
          <input
            type="text"
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Gender</legend>
          <select
            className="select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option>Choose your gender</option>
            <option>male</option>
            <option>female</option>
            <option>others</option>
            <option>prefer not to say</option>
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">About</legend>
          <textarea
            className="textarea"
            placeholder="Bio"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Skills</legend>
          <input
            type="text"
            className="input"
            placeholder="e.g., JavaScript, React, Node.js"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </fieldset>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary" onClick={updateProfile}>
            Save Profile
          </button>
        </div>
      </div>
      {toast && <Toast />}
    </div>
  );
};

export default EditProfile;
