import AnimationWrapper from "../common/page-animation";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {
  let navigate = useNavigate()
  const { userAuth, setUserAuth } = useContext(UserContext);
  const username = userAuth?.data?.username;
  // const username1 =

  function signOutUser() {
    removeFromSession("user");
    setUserAuth({ access_token: null });
    navigate("/");

  }

  return (
    <>
      <AnimationWrapper transition={{ duration: 0.2 }}>
        <div className=" bg-white absolute right-0 border border-grey w-60 duration-200 ">
          <Link to="/editor" className="flex gap-2 link pl-8 md:hidden py-4">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link>
          <Link
            to={`/user/${username}`}
            className=" flex gap-2 link pl-8 py-4 "
          >
            <i className="fi fi-rr-user"></i>
            <p>Profile</p>
          </Link>

          <Link to="/dashboard/blogs" className=" flex gap-2 link pl-8 py-4 ">
            <i className="fi fi-rs-rectangle-list"></i>
            <p>Dashboard</p>
          </Link>

          <Link
            to="/settings/edit-profile"
            className=" flex gap-2 link pl-8 py-4 "
          >
            <i className="fi fi-rs-user-pen"></i>
            <p>Settings</p>
          </Link>

          <span className="absolute border-t border-grey w-[100%] "></span>
          <button
            className="text-left hover:bg-grey p-4 pl-8 w-full"
            onClick={signOutUser}
          >
            <h1 className="text-left font-bold text-xl mg-1">Sign Out</h1>
            <p className="text-dark-grey">@{username}</p>
          </button>
        </div>
      </AnimationWrapper>
    </>
  );
};

export default UserNavigationPanel;
