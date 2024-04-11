const Post = require("../models/posts");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      let post = await Post.find(req.params);
      next({ status: 200, send: { msg: "Posts", data: post } });
    } catch (error) {
      next({
        status: 404,
        send: { msg: "Posts not found", data: error },
      });
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      let post = await Post.findById(id);
      console.log("post", post);
      console.log("id", id);
      next({ status: 200, send: { msg: "Post found", data: post } });
    } catch (error) {
      next({ status: 404, send: { msg: "Post not found", data: error } });
    }
  },
  post: async (req, res, next) => {
    try {
      let post = await Post.create(req.body);
      next({ status: 201, send: { msg: "Post created", data: post } });
    } catch (error) {
      next({
        status: 400,
        send: { msg: "Post not created", data: error },
      });
    }
  },
  put: async (req, res, next) => {
    try {
      const { id } = req.params;
      let post = await Post.findByIdAndUpdate(id, req.body);
      next({
        status: 201,
        send: { msg: "Updated post", data: req.body },
      });
    } catch (error) {
      next({
        status: 400,
        send: { msg: "Post not updated", data: error },
      });
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      let post = await Post.findByIdAndDelete(id);
      next({ status: 201, send: { msg: "Deleted post" } });
    } catch (error) {
      next({ status: 400, send: { msg: "Post not deleted", data: error } });
    }
  },
};
