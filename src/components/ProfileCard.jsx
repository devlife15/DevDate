import React from "react";

const ProfileCard = ({ user }) => {
  const { firstName, lastName, photoURL, age, gender, about, skills } = user;
  return (
    <div>
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
          {age && gender && (
            <h3 className="card-title">{age + ", " + gender}</h3>
          )}
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
