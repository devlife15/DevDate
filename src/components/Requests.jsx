import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/pending", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data));
    } catch (error) {}
  };

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
    } catch (error) {}
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <ul className="list bg-base-100 rounded-box shadow-lg">
          <li className="p-4 pb-2 text-md tracking-wide uppercase font-mono">
            All Pending Requests
          </li>

          {requests &&
            requests.map((request, index) => {
              const {
                firstName,
                lastName,
                photoURL,
                age,
                gender,
                about,
                skills,
              } = request.fromUserId;

              return (
                <li
                  className="list-row bg-base-300 hover:bg-base-200 transition-colors"
                  key={index}
                >
                  <div className="shrink-0">
                    <img
                      className="size-12 rounded-full object-cover"
                      src={photoURL}
                      alt={`${firstName}'s profile`}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium truncate">
                      {firstName + " " + lastName}
                    </div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {age + ", " + gender}
                    </div>
                  </div>
                  <p className="list-col-wrap text-xs opacity-80">{about}</p>
                  <div className="flex gap-2 shrink-0">
                    <button
                      className="btn btn-secondary"
                      onClick={() => reviewRequest("accept", request._id)}
                    >
                      Interested
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => reviewRequest("reject", request._id)}
                    >
                      Ignore
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
