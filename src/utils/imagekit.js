const ImageKit = require("imagekit");
require("dotenv").config();
const imagekit = new ImageKit({
  publicKey: process.env.public_iKERHi/EkubHXgB+fC39itJKVwM=,
  privateKey: process.env.private_+qc6vSXnV5PdwRFWxJonzfKkOcQ=,
  urlEndpoint:process.env.https://ik.imagekit.io/SURAJ/
});

module.exports = imagekit;

