import React from "react";

const User = ({ user }) => {
  console.log(user);
  return (
    <div className="user">
      <div>
        <label htmlFor="">Id:</label>
        <span>{user.id}</span>
      </div>
      <div>
        <label htmlFor="">Date Created:</label>
        <span>{user.createdAt}</span>
      </div>
      <div>
        <label htmlFor="">Name:</label>
        <span>{user.name}</span>
      </div>
      <div>
        <label htmlFor="">Email:</label>
        <span>{user.email}</span>
      </div>
      <div>
        <label htmlFor="">Password:</label>
        <span>{user.password}</span>
      </div>
      <div>
        <label htmlFor="">Role:</label>
        <span>{user.role}</span>
      </div>
      <div>
        <label htmlFor="">Start Date:</label>
        <span>{user.startDate}</span>
      </div>
      <div>
        <label htmlFor="">End Date:</label>
        <span>{user.endDate}</span>
      </div>
      <div>
        <label htmlFor="">Reason:</label>
        <span>{user.reason}</span>
      </div>
      <div>
        <label htmlFor="">Read Terms of Service?:</label>
        <span>{user.tos ? "Yes" : "No"}</span>
      </div>
    </div>
  );
};

export default User;
