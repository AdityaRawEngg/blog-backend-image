const multer = require("multer");
const uniqid = require("uniqid");
const path = require("path");
const fs = require("fs");
const Blog = require("../models/blogSchema");
const AppError = require("../helpers/appErrorClass");
const sendError = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const { send } = require("process");
const imageDestination = path.join(__dirname, "..", "/blogImage");

//Create a new blog with banner Image
const createBlog = (req, resp) => {
  const storage = multer.diskStorage({
    destination: imageDestination,
    filename: function (req, file, filename) {
      filename(
        null,
        "blog" + "-" + uniqid() + "." + file.originalname.split(".")[1]
      );
    },
  });
  const imageUploader = multer({ storage: storage }).single("blogImage");
  imageUploader(req, resp, (err) => {
    if (err) {
      return sendError(new AppError(500, "Internal Error", err.message), resp);
    }
    // Image path in image Url and blogId and image unique identifier is same
    if (req.file) {
      req.body.imageUrl = req.file.path;
      req.body.blogId = req.file.filename.split("-")[1].split(".")[0];
    }
    // let newBlog = new Blog(req.body);
    new Blog(req.body)
      .save()
      .then((data) => {
        sendResponse(200, data, resp);
      })
      .catch((err) => {
        return sendError(new AppError(400, "Unsuccessful", err.message), resp);
      });
  });
};

// Get all blog
const getAllBlog = (req, resp, next) => {
  Blog.find(req.query)
    .select("-_id")
    .then((data) => {
      if (!data) {
        return sendResponse(200, "Blogs not Found", resp);
      }
      sendResponse(200, data, resp);
    })
    .catch((err) => {
      return sendError(new AppError(500, "Internal Error", err.message), resp);
    });
};

// get single blog by Id
const getBlogById = (req, resp) => {
  Blog.findOne(req.params)
    .select("-_id")
    .then((data) => {
      if (data == null) {
        return sendResponse(
          200,
          `No blog Found with id ${req.params.blogId}`,
          resp
        );
      }
      sendResponse(200, data, resp);
    })
    .catch((err) => {
      return sendError(new AppError(500, "Internal Error", err.message), resp);
    });
};

//update single blog by id
const updateBlogById = (req, resp) => {
  //if related links the convert it to Array and split it by comma
  if (req.body.relatedLinks) {
    req.body.relatedLinks = req.body.relatedLinks.split(",");
  }
  //Blog update
  Blog.updateOne(req.params, req.body, { runValidators: true })
    .then((result) => {
      if (result.ok == 0) {
        return resp.send("Blog not found or cannot be updated");
      }
      resp.status(200).json({
        status: "Successful",
        message: "Blog Successfully Updated",
      });
    })
    .catch((err) => {
      return sendError(new AppError(500, "Internal Error", err.message), resp);
    });
};

//update blog Image
const updateImageById = async (req, resp) => {
  let blog = await Blog.findOne(req.params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return sendError(new AppError(500, "Internal Error", err.message), resp);
    });
  if (blog == null) {
    return resp.status(200).json({
      status: "Unsuccessful",
      message: "Blog Not found",
    });
  }

  const storage = multer.diskStorage({
    destination: imageDestination,
    filename: function (req, file, filename) {
      filename(
        null,
        "blog" + "-" + blog.blogId + "." + file.originalname.split(".")[1]
      );
    },
  });
  const imageUploader = multer({ storage: storage }).single("blogImage");
  imageUploader(req, resp, (err) => {
    if (err) {
      return sendError(new AppError(500, "Internal Error", err.message), resp);
    }
    if (!req.file) {
      return sendError(
        new AppError(400, "Unsuccessful", "Image not uploaded"),
        resp
      );
    }
    //Blog Image on local machine deleted
    // update Image Url
    Blog.updateOne(
      req.params,
      { imageUrl: req.file.path },
      { runValidators: true }
    )
      .then((result) => {
        if (result.ok == 0) {
          return sendResponse(
            200,
            `No blog updated with id = ${req.params.blogId}`,
            resp
          ); //resp.send();
        }
        resp.status(200).json({
          status: "Successful",
          message: "Blog Successfully Updated",
        });
      })
      .catch((err) => {
        return sendError(
          new AppError(500, "Internal Error", err.message),
          resp
        );
      });
  });
};

const deleteBlogById = (req, resp) => {
  Blog.deleteOne(req.params)
    .then((result) => {
      if (result.n == 0) {
        return resp.status(200).json({
          status: "Unsuccessful",
          message: "Blog Not found",
        });
      }
      resp.status(200).json({
        status: "Successful",
        message: "blog Successfully Deleted",
      });
    })
    .catch((err) => {
      return sendError(new AppError(500, "Internal Error", err.message), resp);
    });
};

module.exports = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlogById,
  updateImageById,
  deleteBlogById,
};
