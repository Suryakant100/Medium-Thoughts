import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Navigate, useParams } from "react-router-dom";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";
import { createContext } from "react";
import Loader from "../components/loader.component";
import axios from 'axios'

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: { personal_info: {} },
};

export const EditorContext = createContext({});

function Editor() {

  let {blog_id} = useParams()

  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [loading, setLoading] = useState(true)


  let { userAuth, setUserAuth } = useContext(UserContext);
  let access_token = userAuth?.data?.access_token;
  //   let { data: { access_token } = {} } = userAuth || {};


  useEffect(() => {

    if (!blog_id) {
      return setLoading(false);
    }

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/get-blog', {blog_id, draft: true, mode: "edit"})
    .then(({data: {blog}}) => {
      setBlog(blog)
      setLoading(false)
    })
    .catch((err) => {
      setBlog(null)
      setLoading(null)
      console.log(err)
    })

  }, [])

  return (
    <>
      <EditorContext.Provider
        value={{
          blog,
          setBlog,
          editorState,
          setEditorState,
          textEditor,
          setTextEditor,
        }}
      >
        {access_token === null ? <Navigate to="/signin" />
          :
          loading ? <Loader/>
         : editorState == "editor" ? (
          <BlogEditor />
        ) : (
          <PublishForm />
        )}
      </EditorContext.Provider>
    </>
  );
}

export default Editor;
