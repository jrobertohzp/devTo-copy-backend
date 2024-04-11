const User = require("../models/users.js");
const jwt = require("../utils/jwt.js");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      let user = await User.find(req.params);
      next({ status: 200, send: { msg: "Users", data: user } });
    } catch (error) {
      next({
        status: 404,
        send: { msg: "Users not found", data: error },
      });
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      let user = await User.findById(id);
      next({ status: 200, send: { msg: "User found", data: user } });
    } catch (error) {
      next({
        status: 404,
        send: { msg: "User not found", data: error },
      });
    }
  },
  post: async (req, res, next) => {
    try {
      let user = await User.create(req.body);
      next({ status: 201, send: { msg: "User created", data: user } });
    } catch (error) {
      next({ status: 400, send: { msg: "User not created", data: error } });
    }
  },
  put: async (req, res, next) => {
    try {
      const { id } = req.params;
      let user = await User.findByIdAndUpdate(id, req.body);
      next({
        status: 201,
        send: { msg: "Updated user", data: req.body },
      });
    } catch (error) {
      next({
        status: 400,
        send: { msg: "User not updated", data: error },
      });
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      let user = await User.findByIdAndDelete(id);
      next({ status: 201, send: { msg: "Deleted user" } });
    } catch (error) {
      next({ status: 400, send: { msg: "User not deleted", data: error } });
    }
  },
  login: async (req, res, next) => {
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user.password != req.body.password) {
        next({ status: 401, send: { msg: "Invalid password" } });
      }
      let token = jwt.create(user);


      next({ status: 200, send: { msg: "Access granted", token: token } });
    } catch (error) {
      next({ status: 401, send: { msg: "Access not allowed", err: error } });
    }
  },
};
