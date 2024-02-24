import { getDay } from "../common/date";
import {Link } from "react-router-dom"

const BlogPostCard = ({ content, author }) => {
  let {
    title,
    des,
    banner,
    tags,
    publishedAt,
    activity: { total_likes },
    blog_id: id,
  } = content;
    let {profile_img, username, fullname} = author

  return (
    <>
    <Link to={`/blog/${id}`} className=" px-4 py-2 flex gap-8 items-center border-b border-r border-grey pb-5 mb-4">
    <div className="w-full mb-2 px-2  ">
      <div className="flex gap-2 items-center mb-4 ">
        <img src={profile_img} className="w-6 h-6 rounded-full" />
        <p className="line-clamp-1 capitalize">@{username} </p>
        <p className="min-w-fit">{getDay(publishedAt)}</p>
      </div>
      <h1 className="blog-title">{title}</h1>
      <p className="my-3 text-xl font-gelasio leading-7 line-clamp-4 max-sm:hidden md:max-[1100px]:hidden">{des}</p>

      <div className="mb-8 mt-7 gap-4 flex ">
        <span className="py-1 px-4 btn-light rounded-full" >{tags[0]}</span>
        <span className="flex gap-2 items-center  text-dark">
            <i className="fi fi-rr-heart text-xl"></i>
            {total_likes}
        </span>
      </div>
    </div>

    <div className=" aspect-square h-28 mb-12 bg-grey">
        <img className="aspect-square w-full h-full object-cover rounded-lg" src={banner} alt="banner" />
    </div>
    </Link>

    </>
  );
};

export default BlogPostCard;
