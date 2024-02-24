import { useContext } from "react";
import { UserContext } from "../App";
import { EditorContext } from "../pages/editor.pages";

const Tags = ({ tag, tagIndex }) => {
  let {
    blog,
    blog: { tags },
    setBlog,
  } = useContext(EditorContext);

  const handleEditable = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };

  const handleTagEdit = (e) => {
    if (e.key === "Enter" || e.keyCode === 188) {
      e.preventDefault();

      let currentTag = e.target.innerText;
      tags[tagIndex] = currentTag;
      setBlog({ ...blog, tags });
      e.target.setAttribute("contentEditable", false);
    }
  };

  const handleTagDelete = () => {
    tags = tags.filter((t) => t !== tag);
    setBlog({ ...blog, tags });
  };

  return (
    <div
      className="relative p-2 mt-2 mr-2 px-5 inline-block
  bg-white rounded-full hover:bg-opacity-50 pr-8"
    >
      <p
        className="outline-none"
        onKeyDown={handleTagEdit}
        onClick={handleEditable}
      >
        {tag}
      </p>
      <button
        className="mt-[1px] mr-[3px] absolute rounded-full top-1/2 right-2
      -translate-y-1/2 "
        onClick={handleTagDelete}
      >
        <i className="fi fi-br-cross text-red text-[10px] pointer-events-none"></i>
      </button>
    </div>
  );
};
export default Tags;
