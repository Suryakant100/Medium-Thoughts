import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../imgs/logo.png";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import User from "../../../server/Schema/User.js";
import UserNavigationPanel from "./user-navigation.component";

const Navbar = () => {
  const navigate = useNavigate()
  const [searchbarvisibility, setSearchbarVisibility] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);

  const { userAuth, setUserAuth } = useContext(UserContext);
  const access_token = userAuth?.data?.access_token;
  const profile_Image = userAuth?.data?.profile_img;

  const handleSearch = (e) => {
    let query = e.target.value

    if (e.keyCode == 13 && query.length) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} alt="Logo image" className="w-full" />
        </Link>

        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchbarvisibility ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="Search"
            onKeyDown={handleSearch}
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder: text-dark-grey focus:outline-none md:pl-12"
          />
          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
        </div>

        <div className="flex item-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex-item-center justify-center pt-1 hover:bg-black/10"
            onClick={() => {
              setSearchbarVisibility(!searchbarvisibility);
            }}
          >
            <i className="fi fi-rr-search text-xl"></i>
          </button>

          {/* <Link to="/editor" className="hidden md:flex gap-2 link">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link> */}

          {access_token ? (
            <>
              <Link to="/editor" className="hidden md:flex gap-2 link">
                <i className="fi fi-rr-file-edit"></i>
                <p>Write</p>
              </Link>
              <Link to="/dashboard/notification">
                <button className="w-12 h-12 relative rounded-full bg-grey hover:bg-black/10 pt-1 ">
                  <i className="fi fi-rr-bell rounded-full text-2xl block"></i>
                </button>
              </Link>

              <div className="relative">
                <button
                  className=" rounded-full w-12 h-12"
                  onClick={() => {
                    setUserNavPanel(!userNavPanel);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setUserNavPanel(false);
                    }, 250);
                  }}
                >
                  <img
                    className="rounded-full w-full h-full border "
                    src={profile_Image}
                  />
                </button>
                {userNavPanel ? <UserNavigationPanel /> : ""}
              </div>
            </>
          ) : (
            <>
              <Link to="/signin" className="hidden md:flex gap-2 link">
                <i className="fi fi-rr-file-edit"></i>
                <p>Write</p>
              </Link>
              <Link to="/signin" className="btn-dark py-3 rounded-full">
                Sign In
              </Link>
              <Link to="/signup" className="btn-light py-3 rounded-full hidden md:block">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
