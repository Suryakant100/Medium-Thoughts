import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import logo from "../imgs/blog-banner.png";
import Tags from "./tags.component";
import axios from "axios";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function PublishForm() {
  const tagsLimit = 10;
  const charactersLimit = 200;

  const navigate = useNavigate();

  const { userAuth, setUserAuth } = useContext(UserContext);
  const access_token = userAuth?.data?.access_token;

  const {
    blog,
    blog: { banner, tags, title, des, content },
    setEditorState,
    setBlog,
  } = useContext(EditorContext);
  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target.value;
    setBlog({ ...blog, title: input });
  };

  const handleBlogDesChange = (e) => {
    let input = e.target.value;
    setBlog({ ...blog, des: input });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleTopicKeyDown = (e) => {
    if (e.key === "Enter" || e.keyCode === 188) {
      e.preventDefault();

      let tag = e.target.value;

      if (tags.length < tagsLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
      } else {
        toast.error(`You can't add more than ${tagsLimit} tags`);
      }

      e.target.value = "";
    }
  };

  const publishBlog = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }

    if (!title.length) {
      toast.error("Title should be at least 10 characters long");
      return;
    }
    if (!des.length || des.length > charactersLimit) {
      toast.error(`Write a blog under ${charactersLimit} characters`);
      return;
    }
    if (!tags.length || tags.length > tagsLimit) {
      toast.error(`Add at least 1 tag and at most ${tagsLimit} tags`);
      return;
    }

    let loadingToast = toast.loading("Publishing your blog...");
    e.target.classList.add("disable");

    let blogObj = { title, des, tags, content, banner, draft: false };
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", blogObj, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then(() => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        toast.success("Blog published successfully 👍");

        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((response) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        toast.error(response.data.error);
      });
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid lg:grid-cols-2 items-center py-16 lg:gap-4">
        <Toaster />

        <button
          className="w-12 h-12 absolute right-[5vw] top-[5%] z-10 lg:top-[10%]"
          onClick={handleCloseEvent}
        >
          <i className="fi fi-rr-cross bg-white "></i>
        </button>

        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-2 text-xl ">Preview</p>
          <div className="w-full aspect-video overflow-hidden rounded-lg bg-grey mt-4 ">
            <img src={banner ? banner : logo} />
          </div>
          <h1 className="text-4xl font-medium mt-4 leading-tight line-clamp-2">
            {title}
          </h1>
          <p
            className="font-gelasio text-2xl leading-7
          line-clamp-4 my-6"
          >
            {des}
          </p>
        </div>

        <div
          className=" lg:pl-8 lg:border-1 border-grey px-4 
         "
        >
          <p className="text-dark-grey text-xl pl-2 mb-2 mt-9">Blog Title</p>
          <input
            defaultValue={title}
            type="text"
            placeholder="Blog Title"
            className="input-box pl-4"
            onChange={handleBlogTitleChange}
          ></input>

          <p className="text-dark-grey text-xl pl-2 mb-2 mt-6">
            Write short description for your blog
          </p>
          <textarea
            maxLength={200}
            defaultValue={des}
            placeholder="Short description"
            className="h-20 resize-none leading-7 input-box pl-4"
            onChange={handleBlogDesChange}
            onKeyDown={handleKeyDown}
          ></textarea>
          <p className="mt-1 mb-4 text-dark-grey text-sm text-right">
            {charactersLimit - des.length} characters are left
          </p>
          <p className="text-dark-grey text-xl pl-2 mb-2 mt-6">
            Topics - (Help in searching and ranking your blog post )
          </p>
          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Topic"
              className="sticky input-box bg-white top-0 left-0
              pl-4 mb-3 focus:bg-white"
              onKeyDown={handleTopicKeyDown}
            />
            {tags.map((t, i) => {
              return <Tags tag={t} tagIndex={i} key={i} />;
            })}
          </div>

          <p className="mt-1 mb-4 text-dark-grey text-sm text-right">
            {tagsLimit - tags.length} tags are left
          </p>

          <button className="btn-dark py-3" onClick={publishBlog}>
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
}

export default PublishForm;
