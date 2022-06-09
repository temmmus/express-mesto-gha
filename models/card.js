const mongoose = require('mongoose');
const validator = require('validator');

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
    validate: {
      validator: (value) => validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Передан невалидный url',
    },
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
