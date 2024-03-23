const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//! routes
const productRoute = require("./routes/product.Routes");

app.use("/api/v1/product", productRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});
// app.get("*", (req, res) =>{
//   res.send("wrong route")
// })
module.exports = app;
