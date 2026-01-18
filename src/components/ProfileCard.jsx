import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const ProfileCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(id));
    } catch (error) {
      console.log(error);
    }
  };

  const { _id, firstName, lastName, photoURL, age, gender, about, skills } =
    user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="h-96 overflow-hidden">
        <img
          src={photoURL}
          alt="profile-image"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body h-80">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <h3 className="card-title">{age + ", " + gender}</h3>}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <span key={index} className="badge badge-primary">
                {skill}
              </span>
            ))}
          </div>
        )}
        <p className="overflow-y-auto">{about}</p>
        <div className="card-actions justify-center mt-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleRequest("ignore", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleRequest("like", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
