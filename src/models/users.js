const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.__v;
  delete obj.password;
  return obj;
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
