import { Link, useParams } from "react-router-dom";
import Logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog-banner.png";
import uploadImage from "../common/aws";
import { Toaster, toast } from "react-hot-toast";
import { useContext, useRef, useEffect } from "react";
import { EditorContext } from "../pages/editor.pages";
import EditorJs from "@editorjs/editorjs";
import { tools } from "./tools.component";
import axios from "axios";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function BlogEditor() {
  let {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
    textEditor,
    setTextEditor,
    editorState,
    setEditorState,
  } = useContext(EditorContext);

  const navigate = useNavigate();

  const { userAuth, setUserAuth } = useContext(UserContext);
  const access_token = userAuth?.data?.access_token;
  let {blog_id} = useParams()

  useEffect(() => {
    setTextEditor(
      new EditorJs({
        holderId: "textEditor",
        data: Array.isArray(content) ? content[0]: content,
        tools: tools,
        placeholder: "Let write a awesome post",
      })
    );
  }, []);

  function handleBannerUpload(e) {
    let img = e.target.files[0];
    if (img) {
      let loader = toast.loading("Uploading image");
      uploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loader);
            setBlog({ ...blog, banner: url });
            toast.success("Successfully uploaded 👍");
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          toast.dismiss(loader);
          toast.error("Failed to upload image 😢");
        });
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };

  const handlePublishEvent = () => {
    if (!banner.length) {
      return toast.error("Please upload a banner for the blog");
    }

    if (!title.length) {
      return toast.error("Please write a title for the blog");
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((outputState) => {
          // console.log(outputState);
          if (outputState.blocks.length) {
            setBlog({ ...blog, content: outputState });
            setEditorState("publish");
          } else {
            toast.error("Write something to publish");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleSaveDraft = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }

    if (!title.length) {
      toast.error("Title should be at least 10 characters long");
      return;
    }

    let loadingToast = toast.loading("Saving Draft...");
    e.target.classList.add("disable");

    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        let blogObj = { title, des, tags, content, banner, draft: true };
        axios
          .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", {...blogObj, blog_id}, {
            headers: { Authorization: `Bearer ${access_token}` },
          })
          .then(() => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            toast.success("Draft save successfully 👍");

            setTimeout(() => {
              navigate("/");
            }, 500);
          })
          .catch((response) => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            toast.error(response.data.error);
          });
      });
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={Logo} />
        </Link>

        <p className="max-md:hidden text-black w-full line-clamp-1">
          {title.length ? title : "New Blog"}
        </p>
        <div className="flex ml-auto gap-2">
          <button
            className="btn-dark py-2 rounded-full "
            onClick={handlePublishEvent}
          >
            Publish
          </button>
          <button
            className="btn-light py-2 rounded-full"
            onClick={handleSaveDraft}
          >
            Save Draft
          </button>
        </div>
      </nav>
      <Toaster />
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white border-grey border-4 hover:opacity-80">
              <label htmlFor="uploadBanner">
                <img src={banner ? banner : defaultBanner} className="z-20" />
                <input
                  id="uploadBanner"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>

            <textarea
              defaultValue={title}
              className="text-4xl font-medium w-full mt-10
              h-30 pt-2 px-3 resize-none leading-tight
              outline-none placeholder:opacity-50"
              placeholder="Blog Title"
              onKeyDown={handleKeyDown}
              onChange={handleTitleChange}
            ></textarea>

            <hr className="w-full opacity-10"></hr>

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
}

export default BlogEditor;
