const { response } = require("express");

const mongoose = require("mongoose");
const uniqid = require("uniqid");

const blogSchema = new mongoose.Schema({
  blogId: {
    type: String,
    default: uniqid(),
  },
  blogAuthor: {
    type: String,
    required: [true, "blogAuthor Name Cannot be empty"],
  },
  blogTitle: {
    type: String,
    required: [true, "blogTitle of the blog cannot be empty"],
  },
  blogContent: {
    type: String,
    required: [true, "Please Entre blogContent of the blog"],
  },
  relatedLinks: {},
  imageUrl: {
    type: String,
    required: [true, "Please Upload a image"],
  },
});

blogSchema.pre("save", function (next) {
  this.relatedLinks = this.relatedLinks.split(",");
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
