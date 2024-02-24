import Blog from "../Schema/Blog.js"

const getTrendingBlogs = (req, res) => {

    Blog.find({draft: false})
    .populate("author", "personal_info.profile_img personal_info.fullname personal_info.username -_id")
    .sort({"publishedAt": -1, "activity.total_read": -1, "activity.total_likes": -1})
    .select("blog_id title publishedAt -_id")
    .limit(5)
    .then((blogs) => {
        res.status(200).json({blogs})
    })
    .catch((err) => {
        res.status(500).json({message: "Internal server error"})
    })

}

export default getTrendingBlogs