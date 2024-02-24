import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import { activeTabRef } from "../components/inpage-navigation.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState(null);
  const [pageState, setPageState] = useState("home");

  const category = [
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
    "tech",
    "view",
    "adventure",
    "anime",
    "finance",
    "rich",
    "tag1",
  ];

  const fetchLatestBlogs = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
      .then(async ({ data }) => {
        // console.log(data.blogs)
        let formattedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/all-latest-blogs-count",
        });
        setBlogs(formattedData);
      })
      .catch((err) => {
        console.log({ err: err });
      });
  };

  const fetchBlogByCategory = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        tag: pageState,
        page,
      })
      .then(async ({ data }) => {
        console.log(data.blogs);
        let formattedData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { tag: pageState },
        });
        setBlogs(formattedData);
      })
      .catch((err) => {
        console.log({ err: err });
      });
  };

  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlogs(data.blogs);
      })
      .catch(() => {
        console.log(err);
      });
  };

  useEffect(() => {
    activeTabRef.current.click();
    if (pageState == "home") {
      fetchLatestBlogs({ page: 1 });
    } else {
      fetchBlogByCategory({ page: 1 });
    }

    if (!trendingBlogs) {
      fetchTrendingBlogs();
    }
  }, [pageState]);

  const loadBlogByCategory = async (e, req, res) => {
    let category = e.target.innerText.toLowerCase();
    setBlogs(null);
    if (pageState == category) {
      setPageState("home");
      return;
    }

    setPageState(category);
  };

  return (
    <AnimationWrapper>
      <section className="dark-mode h-cover flex gap-10">
        {/* Blog section */}
        <div className="w-full">
          <InPageNavigation
            routes={[pageState, "trending blogs"]}
            defaultHidden={["trending blogs"]}
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
              <LoadMoreDataBtn
                state={blogs}
                fetchDataFun={
                  pageState == "home" ? fetchLatestBlogs : fetchBlogByCategory
                }
              />
            </>

            {trendingBlogs == null ? (
              <Loader />
            ) : trendingBlogs.length ? (
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.2 }}
                    key={i}
                  >
                    <MinimalBlogPost content={blog} index={i} />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataMessage message="No trending blogs" />
            )}
          </InPageNavigation>
        </div>

        {/*filter and trending blogs*/}

        <div
          className="min-w-[40%] lg:min-w-[400px] max-w-min border-1 border-grey 
           pl-12 pt-3 max-md:hidden"
        >
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="text-xl font-medium mb-8">
                This is a side for tags and trending blogs
              </h1>

              <div className="flex flex-wrap gap-3 ">
                {category.map((tag, i) => {
                  return (
                    <button
                      onClick={loadBlogByCategory}
                      className={
                        "tag " +
                        (pageState == tag ? " bg-black text-white " : "")
                      }
                      key={i}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h1 className="text-xl font-medium mb-8">
                Trending{" "}
                <i className="fi fi-rr-arrow-trend-up text-xl text-red"></i>
              </h1>

              {trendingBlogs == null ? (
                <Loader />
              ) : trendingBlogs.length ? (
                trendingBlogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.2 }}
                      key={i}
                    >
                      <MinimalBlogPost content={blog} index={i} />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message="No trending blogs" />
              )}
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
