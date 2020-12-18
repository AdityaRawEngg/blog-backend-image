const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlogById,
  updateImageById,
  deleteBlogById,
} = require("../controllers/blogController");

router.route("/blog").post(createBlog).get(getAllBlog);
router
  .route("/blog/:blogId")
  .get(getBlogById)
  .put(updateBlogById)
  .delete(deleteBlogById);
router.route("/image/:blogId").put(updateImageById);
module.exports = router;
