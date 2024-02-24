import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const MinimalBlogPost = ({ content, index }) => {
  let {
    title,
    publishedAt,
    blog_id: id,
    author: {
      personal_info: { fullname, username, profile_img },
    },
  } = content;

  return (
    <Link to={`/blog/${id}`} className="flex gap-5, mb-10">
      <h1 className="blog-index ">
        {index < 9 ? "0" + (index + 1) : index + 1}
      </h1>
      <div>
        <div className="flex gap-4 items-center mb-4 pl-4">
            <img className="w-6 h-6 rounded-full" src={profile_img} alt="profile_img" />
            <p className="line-clamp-1">{fullname} @{username}</p>
            <p className="min-w-fit">{getDay(publishedAt)}</p>
        </div>
        <h1 className="blog-title pl-4">{title}</h1>
      </div>
    </Link>
  );
};

export default MinimalBlogPost;
