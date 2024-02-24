import Navbar from "./components/navbar.component";
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useState, useEffect } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages";
import HomePage from "./pages/home.page";
import SearchPage from "./pages/search.page";
import PageNotFound from "./pages/404.page";
import ProfilePage from "./pages/profile.page";
import BlogPage from "./pages/blog.page";

export const UserContext = createContext({});

const App = () => {
  const [userAuth, setUserAuth] = useState();

  useEffect(() => {
    let userInSession = lookInSession("user");
    if (userInSession) {
      setUserAuth(JSON.parse(userInSession));
    } else {
      setUserAuth({ access_token: null });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/editor" element={<Editor />}></Route>
        <Route path="/editor/:blog_id" element={<Editor />}></Route>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage/>}></Route>
          <Route
            path="/signin"
            element={<UserAuthForm type="sign-in" />}
          ></Route>
          <Route
            path="/signup"
            element={<UserAuthForm type="sign-up" />}
          ></Route>
          <Route
          path="/search/:query" element={<SearchPage />}>
          </Route>
          <Route path="/user/:id" element={<ProfilePage/>}></Route>
          <Route path="/blog/:blog_id" element={<BlogPage/>}></Route>
          <Route path="*" element={<PageNotFound/>}></Route>
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
