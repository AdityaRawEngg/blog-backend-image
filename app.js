const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const blogRoute = require("./routes/blogRoute");

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, connection) => {
    if (err) {
      return console.log("Error while connecting");
    }
    app.use("/blogs", blogRoute);
    app.listen(process.env.PORT, () => {
      console.log(`Server started on Port ${PORT}`);
    });
  }
);
