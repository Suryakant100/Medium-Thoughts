import bcrypt from "bcrypt";
import User from "../Schema/User.js";
import { nanoid } from "nanoid";
import "dotenv/config.js";
import jwt from "jsonwebtoken";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

export const generateUsername = async (email) => {
  let username = email.split("@")[0];
  let isUsernameExist = await User.exists({
    "personal_info.username": username,
  }).then((result) => result);
  isUsernameExist ? (username += nanoid().substring(0, 5)) : "";
  return username;
};

export const formatdatatosend = (user) => {
  const access_token = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_TOKEN
  );
  return {
    access_token: access_token,
    profile_img: user.personal_info.profile_img,
    fullname: user.personal_info.fullname,
    username: user.personal_info.username,
  };
};

const signup = async (req, res) => {
  let { fullname, email, password } = req.body;

  if (!fullname.length) {
    return res.status(403).json(("error", "Enter Fullname"));
  }

  if (fullname.length < 3) {
    return res
      .status(403)
      .json(("error", "Fullname must be greater than 3 characters"));
  }

  if (!email.length) {
    return res.status(403).json(("error", "Enter email"));
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json(("error", "Email is invalid"));
  }

  if (!passwordRegex.test(password)) {
    return res
      .status(403)
      .json(
        ("error",
        "Password should be at least 6 to 12 characters long with a numeric value and special characters")
      );
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    try {
      let username = await generateUsername(email);
      let user = new User({
        personal_info: { fullname, email, password: hashed_password, username },
      });

      await user.save();
      return res.status(200).json(formatdatatosend(user));
    } catch (err) {
      if (err.code === 11000) {
        return res.status(500).json({ error: "Email already exist" });
      }
    }
  });
};

export default signup;
