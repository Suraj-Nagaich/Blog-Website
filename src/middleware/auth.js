
// src/middlewares/auth.js
const jwt = require("jsonwebtoken");

module.exports = function isAuthenticated(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.redirect("/users/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to req
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.clearCookie("token");
    return res.redirect("/users/login");
  }
};
// const jwt = require("jsonwebtoken");

// module.exports = function isAuthenticated(req, res, next) {
//   const token = req.cookies?.token;
//   if (!token) return res.redirect("users/login");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // ✅ sets email, name, etc.
//     next();
//   } catch (err) {
//     return res.redirect("use/login");
//   }
// };
