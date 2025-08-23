import React from "react";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <h2>Profile</h2>
      <nav>
        <Link to="details">Details</Link> |{" "}
        <Link to="settings">Settings</Link>
      </nav>
      <div>
        {/* Nested routes render here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
