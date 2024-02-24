import bcrypt from "bcrypt";
import User from "../Schema/User.js";
import { formatdatatosend } from "../userAuthenticationController/signupAuth.js";

const signin = (req, res) => {
  let { email, password } = req.body;
  let user = User.findOne({ "personal_info.email": email }).then((user) => {
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }

    bcrypt.compare(password, user.personal_info.password, (err, result) => {
      if (err) {
        return res
          .status(403)
          .json({ error: "Error occurred during login please try again" });
      }

      if (!result) {
        return res.status(403).json({ error: "Incorrect Password" });
      } else {
        return res.status(200).json(formatdatatosend(user));
      }
    });
  });
};

export default signin;
