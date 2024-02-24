import User from "../Schema/User.js";

const getProfile = (req, res) => {

    let {username} = req.body;

    User.findOne({"personal_info.username": username})
    .select("-personal.password -google_auth -updatedAt -blogs")
    .then((user) => {
        res.status(200).json(user)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message: "Internal server error"})
    })

}

export default getProfile;