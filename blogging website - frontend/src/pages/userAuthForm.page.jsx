import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useContext, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
// import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {
  const authForm = useRef();

  const { userAuth, setUserAuth } = useContext(UserContext);
  const access_token = userAuth?.data?.access_token;
  const token = userAuth?.accessToken;
  // console.log(token);

  const userAuthThroughServer = (serverRoute, formData) => {
    let { fullname, email, password, access_token } = formData;

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, {
        fullname,
        email,
        password,
        access_token,
      })
      .then((response) => {
        storeInSession("user", JSON.stringify(response));
        toast.success("Logged in successfully");
        setUserAuth(response);
      })
      .catch((error) => {
        toast.error("Wrong credentials");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type == "sign-in" ? "/signin" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/; // regex for password

    const form = new FormData(authForm.current);
    const formData = [];
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { fullname, email, password } = formData;

    if (fullname) {
      if (!fullname.length) {
        return toast.error("Enter Fullname");
      }

      if (fullname.length < 3) {
        return toast.error("Fullname must be greater than 3 characters");
      }
    }

    if (!email.length) {
      return toast.error("Enter email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }

    if (!password.length) {
      return toast.error("Enter password");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be at least 6 to 12 characters long with a numeric value and special characters"
      );
    }

    userAuthThroughServer(serverRoute, formData);
  };

  // const handleGoogleAuth = (e) => {
  //   e.preventDefault();

  //   authWithGoogle()
  //     .then((user) => {
  //       storeInSession("user", JSON.stringify(user));
  //       setUserAuth(user);
  //       toast.success("Logged in successfully");

  //       // userAuthThroughServer(serverRoute, formData);
  //     })
  //     .catch((err) => {
  //       toast.error("Trouble logging with google");
  //       return console.log(err);
  //     });
  // };

  return access_token || token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex item-center justify-center ">
        <Toaster />
        <form ref={authForm} className=" mt-20 w-[80%] max-w-[400px] md:mt-12">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-16">
            {type == "sign-in" ? "Welcome back" : "Join Us"}
          </h1>
          {type !== "sign-in" ? (
            <InputBox
              name="fullname"
              placeholder="Full name"
              type="text"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}

          <InputBox
            name="email"
            placeholder="Email"
            type="email"
            icon="fi-rr-envelope"
          />

          <InputBox
            name="password"
            placeholder="Password"
            type="password"
            icon="fi-rr-lock"
          />

          <button
            className="btn-dark center mt-10 input-box w-[40%] bg-black px-1"
            type="submit"
            onClick={handleSubmit}
          >
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 font-bold uppercase opacity-100 text-dark-grey">
            <hr className=" w-1/2 border-dark-grey"></hr>
            <p>or</p>
            <hr className=" w-1/2 border-dark-grey"></hr>
          </div>

          <button
            className="btn-dark flex items-center justify-center gap-4 w-[90%] center input-box bg-black px-4"
            // onClick={handleGoogleAuth}
          >
            <img src={googleIcon} className="w-5" />
            continue with google
          </button>

          {type == "sign-in" ? (
            <p className="mt-6 text-center items-center text-dark-grey text-xl">
              Don't have an account?
              <Link to="/signup" className="ml-2 underline text-black">
                Sign Up here
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-center items-center text-dark-grey text-xl">
              Already a member ?
              <Link to="/signin" className="ml-2 underline text-black">
                Sign In here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
