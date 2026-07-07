const express = require("express");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/items", itemRoutes);

module.exports = app;
