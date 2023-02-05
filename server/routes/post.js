const express = require("express");
const router = express.Router();

const Posts = require("../models/Post");

const verifyToken = require("../middleware/auth");

// @route POST api/posts
// @desc create post
// @access Private
router.post("/create", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  // Simple validation
  if (!title) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }
  try {
    const newPost = new Posts({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status ?? "To learn",
      user: req.userId,
    });
    await newPost.save();
    res.json({
      success: true,
      message: "Should learn everyday",
      post: newPost,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Interval error" });
  }
});

// @route get api/posts
// @desc get post
// @access Private
router.get("/get", verifyToken, async (req, res) => {
  try {
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 1,
      limit: parseInt(req.query.limit, 10) || 0,
    };
    const listPost = await Posts.find({
      user: req.userId,
    });
    const totalPage = pageOptions.limit ? Math.ceil(listPost.length / pageOptions.limit) : 0
    const posts = await Posts.find({
      user: req.userId,
    })
      .populate("user", ["userName"])
      .skip((pageOptions.page - 1) * pageOptions.limit)
      .limit(pageOptions.limit);

    res.json({
      success: true,
      message: "get list posts successfully",
      posts: posts ?? [],
      totalPage,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Interval error" });
  }
});

// @route PUT api/posts
// @desc update post
// @access Private
router.put("/:id/update", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  // Simple validation
  if (!title) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }
  try {
    let updatedPost = {
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status ?? "To learn",
    };
    const postUpdateCondition = { _id: req.params.id, user: req.userId };
    updatedPost = await Posts.findByIdAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );
    if (updatedPost) {
      res.json({
        success: true,
        message: "update post successfully",
        post: new Posts(updatedPost),
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Interval error" });
  }
});

// @route GET DETAIL api/posts
// @desc get detail post
// @access Private
router.get("/:id/detail", verifyToken, async (req, res) => {
  try {
    Posts.findById(req.params.id)
      .populate("user", ["userName"])
      .exec((err, post) => {
        if (err)
          res.json({
            success: true,
            message: "get posts successfully",
            posts: {},
          });
        else {
          res.json({
            success: true,
            message: "get posts successfully",
            posts: post ?? {},
          });
        }
      });

    // const posts = await Posts.findById(req.params.id).populate("user", [
    //   "userName",
    // ]);
    // res.json({
    //   success: true,
    //   message: "get list posts successfully",
    //   posts: posts ?? [],
    // });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Interval error" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Posts.findByIdAndRemove(
      req.params.id,
      postDeleteCondition
    );
    if (deletedPost) {
      return res.json({
        success: true,
        message: "delete post succesfully",
      });
    } else {
      return res.json({
        success: false,
        message: "cannot find post to deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Interval error" });
  }
});

module.exports = router;
