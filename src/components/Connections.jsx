import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import ProfileCard from "./ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {}
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="flex justify-center flex-wrap my-10 gap-5">
      {connections.map((connection, index) => {
        return <ProfileCard key={index} user={connection} />;
      })}
    </div>
  );
};

export default Connections;
