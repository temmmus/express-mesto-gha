const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: ownerSchema,
  likes: [
    {
      type: ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    required: true,
  },
});

const ownerSchema = new mongoose.Schema({
  name: {
    type: ObjectId,
    required: true,
  },
});
module.exports = mongoose.model("card", cardSchema);
