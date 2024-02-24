import Blog from "../Schema/Blog.js";
import User from "../Schema/User.js";

const getBlog = (req, res) => {

    let {blog_id, draft, mode} = req.body;
    let incrementVal = mode !== "edit"? 1 : 0

    Blog.findOneAndUpdate({blog_id}, {$inc : {"activity.total_reads" : incrementVal}})
    .populate("author", "personal_info.fullname personal_info.username personal_info.profile_img")
    .select("title banner des content tags activity publishedAt blog_id")
    .then((blog) => {

        User.findOneAndUpdate({_id: blog.author._id}, {$inc: {"account_info.total_reads": incrementVal}})
        .catch((err) => {
            console.log(err)
            res.status(500).json({error: "Internal server error"})
        })

        if (blog.draft && !draft){
            res.status(500).json({error: "you can not access draft blogs"})
        }

        res.status(200).json({blog})
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    })
};

export default getBlog;