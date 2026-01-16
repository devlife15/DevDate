import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import ProfileCard from "./ProfileCard";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="flex justify-center gap-10 mt-10">
        <EditProfile user={user} />
        <ProfileCard user={user} />
      </div>
    )
  );
};

export default Profile;
