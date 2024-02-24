import Blog from "../Schema/Blog.js";

const allLatestBlogsCount = (req, res) => {

    Blog.countDocuments({draft: false})
    .then((count) => {
        res.status(200).json({totalDocs: count})
    })
    .catch((err) => {
        res.status(500).json({message: "Internal server error"})
        console.log(err)
    })

}

export default allLatestBlogsCount;