import Blog from "../Schema/Blog.js"

const getBlogByTags = (req, res) => {
    let {tag, query, author, page, limit, eliminate_blog} = req.body
    // tag = tag.toLowerCase()
    let findQuery
    if (tag) findQuery = {tags: tag, draft: false, blog_id: {$ne: eliminate_blog}}
    else if (query) findQuery = {title: new RegExp(query, 'i'), draft: false}
    else if (author) findQuery = {author, draft: false}

    let maxLimit = 3

    Blog.find(findQuery)
    .populate("author", "personal_info.profile_img personal_info.fullname personal_info.username -_id")
    .sort({"publishedAt": -1})
    .select("blog_id title des banner activity tags publishedAt -_id" )
    .limit(maxLimit)
    .skip((page - 1) * maxLimit)
    .then((blogs) => {
        res.status(200).json({blogs})
    })
    .catch((err) => {
        res.status(500).json({message: "Internal server error"})
    })
}


export default getBlogByTags;