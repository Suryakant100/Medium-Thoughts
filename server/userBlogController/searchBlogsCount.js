import Blog from "../Schema/Blog.js"

const searchBlogsCount = (req, res) => {

    let {tag, author, query} = req.body
    let findQuery
    if (tag) findQuery = {tags: tag, draft: false }
    else if (query) findQuery = {title: new RegExp(query, 'i'), draft: false}
    else if (author) findQuery = {author, draft: false}

    Blog.countDocuments(findQuery)
    .then((count) => {
        return res.status(200).json({totalDocs: count})
    })
    .catch((err) => {
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    })
}

export default searchBlogsCount;