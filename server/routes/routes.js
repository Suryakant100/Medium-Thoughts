import express from "express";
import signup from "../userAuthenticationController/signupAuth.js";
import signin from "../userAuthenticationController/signinAuth.js";
import generateUploadUrl from "../userAuthenticationController/awsConnection.js";
import googleAuthSign from "../userAuthenticationController/googleAuth.js";
import verifyJwt from "../userAuthenticationController/jwtVerification.js";
import createBlog from "../userBlogController/blogController.js";
import getLatestBlogs from "../userBlogController/getLatestBlogs.js";
import getTrendingBlogs from "../userBlogController/getTrendingBlogs.js";
import getBlogByTags from "../userBlogController/getBlogByTags.js";
import allLatestBlogsCount from "../userBlogController/allLatestBlogCount.js";
import searchBlogsCount from "../userBlogController/searchBlogsCount.js";
import searchUser from "../userBlogController/searchUser.js";
import getProfile from "../userBlogController/getProfile.js";
import getBlog from "../userBlogController/getBlog.js";


export const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/get-upload-url", generateUploadUrl);
router.post("/latest-blogs", getLatestBlogs);
router.post("/all-latest-blogs-count", allLatestBlogsCount)
router.get("/trending-blogs", getTrendingBlogs)
router.post("/search-blogs", getBlogByTags)
router.post("/search-blogs-count", searchBlogsCount)
router.post("/search-user", searchUser)
router.post("/get-profile", getProfile)
router.post("/get-blog", getBlog)
router.use(verifyJwt);
router.post("/create-blog", createBlog);
router.post("/google-auth", googleAuthSign);

