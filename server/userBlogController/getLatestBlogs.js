import Blog from "../Schema/Blog.js";

const getLatestBlogs = (req, res) => {

    let {page} = req.body

    Blog.find({draft: false})
    .populate("author", "personal_info.profile_img personal_info.fullname personal_info.username -_id")
    .sort({"publishedAt": -1})
    .select("blog_id title des banner activity tags publishedAt -_id" )
    .skip((page-1) * 5)
    .limit(5)
    .then((blogs) => {
        res.status(200).json({blogs})
    })
    .catch((err) => {
        res.status(500).json({message: "Internal server error"})
    })
}


export default getLatestBlogs;