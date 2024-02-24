import { nanoid } from "nanoid";
import Blog from "../Schema/Blog.js";
import User from "../Schema/User.js";

const createBlog = (req, res) => {
  let authorId = req.user;
  let { title, banner, content, des, tags, draft } = req.body;

  if (!title.length) {
    return res.status(403).json({ error: "Title is required." });
  }

  if (!draft) {
    if (!des || des.length > 200) {
      return res
        .status(403)
        .json({ error: "You must provide description under 200 characters." });
    }

    if (!banner.length) {
      return res.status(403).json({ error: "You must provide a banner." });
    }

    if (!content.blocks.length) {
      return res
        .status(403)
        .json({ error: "You must provide content to publish a blog." });
    }

    if (!tags.length || tags.length > 10) {
      return res
        .status(403)
        .json({ error: "You must provide tags and it should be under 10." });
    }
  }

  tags = tags.map((tag) => tag.toLowerCase());

  let blog_id =
    id ||
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();

  if (id) {
    Blog.findOneAndUpdate({blog_id}, {title, des, banner, content, tags, draft: draft? draft: false})
    .then(() => {
      res.status(200).json({id: blog_id})
    })
    .catch((err) => {
      res.status(500).json({error: err})
    })

  } else {
    let blog = new Blog({
      blog_id,
      title,
      banner,
      des,
      content,
      tags,
      author: authorId,
      draft: Boolean(draft),
    });

    blog
      .save()
      .then((blog) => {
        let incrementValue = draft ? 0 : 1;
        User.findOneAndUpdate(
          { _id: authorId },
          {
            $inc: { "account_info.total_posts": incrementValue },
            $push: {
              blogs: blog._id,
            },
          }
        )
          .then((user) => {
            return res.status(200).json({
              id: blog.blog_id,
              message: "Blog created successfully.",
            });
          })
          .catch((error) => {
            return res
              .status(500)
              .json({ error: "Failed to update total post number" });
          });
      })
      .catch((error) => {
        return res.status(500).json({ error: "Failed to create blog" });
      });
  }
};

export default createBlog;
