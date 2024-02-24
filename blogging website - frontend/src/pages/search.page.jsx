import { useParams } from "react-router-dom";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import LoadMoreDataBtn from "../components/load-more.component";
import AnimationWrapper from "../common/page-animation";
import BlogPostCard from "../components/blog-post.component";
import NoDataMessage from "../components/nodata.component";
import { useEffect, useState } from "react";
import axios from "axios";
import { filterPaginationData } from "../common/filter-pagination-data";
import UserCard from "../components/usercard.component";

const SearchPage = () => {
  const [blogs, setBlogs] = useState(null);
  const [users, setUsers] = useState(null);

  let { query } = useParams();

  const searchBlogs = ({ page = 1, create_new_arr = false }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        query,
        page,
      })
      .then(async ({ data }) => {
        // console.log(data.blogs)
        let formattedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { query },
          create_new_arr,
        });

        setBlogs(formattedData);
      })
      .catch((err) => {
        console.log({ err: err });
      });
  };

  const searchUser = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-user", { query })
      .then(({ data: { users } }) => {
        setUsers(users);
      });
  };

  useEffect(() => {
    resetState();
    searchBlogs({ page: 1, create_new_arr: true });
    searchUser();
  }, [query]);

  const resetState = () => {
    setBlogs(null);
    setUsers(null);
  };

  const UserCardWrapper = () => {
    return (
      <>
        {users == null ? (
          <Loader />
        ) : users.length ? (
          users.map((user, i) => {
            return (
              <AnimationWrapper
                key={i}
                transition={{ duration: 1, delay: i * 0.08 }}
              >
                <UserCard user={user} />
              </AnimationWrapper>
            );
          })
        ) : (
          <NoDataMessage message="No user found" />
        )}
      </>
    );
  };

  return (
    <section className="h-cover flex justify-content gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={[`Search results for - "${query}"`, "Account matched"]}
          defaultHidden={["Account matched"]}
        >
          <>
            {blogs == null ? (
              <Loader />
            ) : blogs.results.length ? (
              blogs.results.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.2 }}
                    key={i}
                  >
                    <BlogPostCard
                      content={blog}
                      author={blog.author.personal_info}
                    />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataMessage message="No blogs published" />
            )}
            <LoadMoreDataBtn state={blogs} fetchDataFun={searchBlogs} />
          </>
          <UserCardWrapper />
        </InPageNavigation>
      </div>

      <div className=" min-w-[40%] lg:min-w-[300px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden ">
        <h1 className="font-medium text-xl mb-8 ">
          <i className="fi fi-rr-user text-xl pl-2"></i> Users related to search{" "}
        </h1>
        <UserCardWrapper />
      </div>
    </section>
  );
};

export default SearchPage;
