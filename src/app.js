const express = require("express");
const indexRouter = require("./router/index.router");
const postRouter = require("./router/post.router"); // renamed
const userRouter = require("./router/user.router");
const cookieParser = require("cookie-parser"); // fixed typo
require("dotenv").config();

const path = require("path");
const app = express();

app.use(cookieParser()); // fixed typo: cookirParser → cookieParser

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRouter);


app.use("/posts", postRouter);

app.use("/users", userRouter);

module.exports = app;
