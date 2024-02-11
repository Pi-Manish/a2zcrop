const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports= Subscriber = new mongoose.model("Subscriber", subscriberSchema);
