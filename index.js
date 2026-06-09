// index.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Linux Server!");
});
app.get("/user", (req, res) => {
  res.send("hello users");
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
