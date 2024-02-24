import User from "../Schema/User.js";

const searchUser = (req, res)=> {

    let {query} = req.body
    let findquery;
    if (query) findquery={"personal_info.username": new RegExp(query, "i")}
    
    User.find(findquery)
    .select("personal_info.username personal_info.fullname personal_info.profile_img -_id")
    .limit(10)
    .then((users) => {
        res.status(200).json({users})
    })
    .catch((err) => {
        console.log(err)
    })

}

export default searchUser;