const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    isPublish: {
      type: Boolean,
      default:false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Blog =new mongoose.model("Blog" , blogSchema)
