const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  author: {
    type: String,
    required: [true, "author is required"],
  },
  genre: {
    type: String,
    required: [true, "genre is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
