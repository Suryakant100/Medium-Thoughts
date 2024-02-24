import admin from "firebase-admin";
import serviceAccountKey from "../react-js-blog-website-5f3c3-firebase-adminsdk-19dez-6b8ee884b4.json" assert { type: "json" };
import User from "../Schema/User.js";

import {
  formatdatatosend,
  generateUsername,
} from "../userAuthenticationController/signupAuth.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const googleAuthSign = (req, res) => {
  let { access_token } = req.body;
  admin
    .auth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { email, name, picture } = decodedUser;
      picture = picture.replace("s96-c", "s384-c");

      let user = await User.findOne({ "personal_info.email": email })
        .select(
          "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
        )
        .then((u) => {
          return u || null;
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });

      if (user) {
        if (!user.google_auth) {
          return res
            .status(403)
            .json({ error: "User already exists using email and password" });
        } else {
          let username = await generateUsername(email);

          user = new User({
            personal_info: {
              fullname: name,
              username,
              profile_img: picture,
              email,
            },
            google_auth: true,
          });

          await user
            .save()
            .then((u) => {
              user = u;
            })
            .catch((err) => {
              return res.status(500).json({ error: err.message });
            });
        }

        return res.status(200).json(formatdatatosend(user));
      }
    })
    .catch((err) => {
      return res.status(500).json({
        error: "Failed to authenticate with google, try with another account",
      });
    });
};

export default googleAuthSign;
