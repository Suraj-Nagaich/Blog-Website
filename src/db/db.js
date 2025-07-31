const mongoose = require("mongoose");
require("dotenv").config(); // Load .env file

const connect = () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
};

module.exports = connect;
