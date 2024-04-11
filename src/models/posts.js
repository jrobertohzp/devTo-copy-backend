const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  date: {
    type: String,
    // required: true,
  },
  hashtag1: {
    type: String,
    required: true,
  },
  hashtag2: {
    type: String,
    required: true,
  },
  hashtag3: {
    type: String,
    required: true,
  },
  hashtag4: {
    type: String,
    required: true,
  },
  isRelevant: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  postImg: {
    type: String,
    required: true,
  },
  timeToRead: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  userImg: {
    type: String,
    required: true,
    match: /^(http:\/\/|https:\/\/).*\.(jpg|png)$/,
  },
  userName: {
    type: String,
    required: true,
  },
  postOwner: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
