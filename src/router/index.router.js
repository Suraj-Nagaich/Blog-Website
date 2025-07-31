
const express = require("express");
const postModel = require("../model/post.model"); // rename to blog post model
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const posts = await postModel.find(filter).sort({ date: -1 }); // newest first

  const token = req.cookies.token;

  let decode = null;

  if (token) {
    decode = jwt.verify(token, "hfdskjasfgksjdfgfdalsdf"); // your JWT secret
  }

  res.render("home.ejs", { posts: posts, decode: decode }); // pass 'posts' now
});

module.exports = router;
