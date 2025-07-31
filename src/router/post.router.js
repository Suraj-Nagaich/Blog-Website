const express = require("express");
const ImageKit = require("imagekit");
const multer = require("multer");
const postModel = require("../models/post.model");
require("dotenv").config();

const router = express.Router();

// Multer setup: Store file in memory buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ImageKit config
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// ------------------------ ROUTES ----------------------------

// Show blog post detail
router.get("/detail/:id", async (req, res) => {
  const post = await postModel.findById(req.params.id);
  res.render("postDetail.ejs", { post });
});

// Show blog post update form
router.get("/update/:id", async (req, res) => {
  const post = await postModel.findById(req.params.id);
  res.render("postUpdate.ejs", { post });
});

// Handle blog post update
router.post("/update/:id", upload.single("image"), async (req, res) => {
  const { title, author, category, content } = req.body;
  const postId = req.params.id;

  const updateData = { title, author, category, content };

  if (req.file) {
    try {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "/blog-posts"
      });
      updateData.image = result.url;
    } catch (err) {
      console.error("ImageKit upload error:", err.message);
      return res.status(500).send("Image upload failed");
    }
  }

  await postModel.findByIdAndUpdate(postId, updateData);
  res.redirect(`/posts/detail/${postId}`);
});

// Delete blog post
router.get("/delete/:id", async (req, res) => {
  await postModel.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Show add blog post form
router.get("/add", (req, res) => {
  res.render("postForm");
});

// Handle new blog post submission
router.post("/add", upload.single("image"), async (req, res) => {
  const { title, author, category, content } = req.body;

  try {
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/blog-posts"
    });

    const newPost = new postModel({
      title,
      author,
      category,
      content,
      image: result.url,
      date: new Date(),
    });

    await newPost.save();
    res.redirect("/");
  } catch (err) {
    console.error("ImageKit upload error:", err.message);
    res.status(500).send("Image upload failed");
  }
});

module.exports = router;
