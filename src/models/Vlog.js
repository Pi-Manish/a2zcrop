const mongoose = require("mongoose");

const vlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    thumbnailUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    isPublish:{
      type:String,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Vlog =new mongoose.model("Vlog" , vlogSchema)
