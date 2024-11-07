const Book = require("../models/book.js");

// Function to add a book
exports.addBook = async (req, res) => {
  const { title, category, author, genre, price } = req.body;

  // Create a new book object with the data from the request body
  const book = new Book({
    title,
    category,
    author,
    genre,
    price,
  });

  try {
    // Save the book to the database
    await book.save();

    // Respond with a success message and the book data
    res.status(201).json({
      message: "Buku berhasil ditambahkan",
      data: book,
    });
  } catch (err) {
    // If there was an error, respond with the error message
    res.status(400).json({
      error: err.message || "Terjadi kesalahan saat menambahkan buku",
    });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the database

    if (books.length > 0) {
      // If there are books in the database, send them in the response
      res.status(200).json(books);
    } else {
      // If no books are found
      res.status(404).json({ message: "Buku tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
};

// Get a book by title
exports.getBookByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const book = await Book.findOne({ title });

    if (book) {
      // Book found, send it in the response
      res.status(200).json(book);
    } else {
      // If no book is found with the given title
      res
        .status(404)
        .json({ message: `Buku berjudul '${title}' tidak ditemukan` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving book", error: error.message });
  }
};

// Delete a book by title
exports.deleteBookByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const book = await Book.findOneAndDelete({ title });

    if (book) {
      // Book found and deleted, send a success message
      res
        .status(200)
        .json({ message: `Buku berjudul '${title}' berhasil dihapus` });
    } else {
      // If no book was found with the given title
      res
        .status(404)
        .json({ message: `Buku berjudul '${title}' tidak ditemukan` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting book", error: error.message });
  }
};

// Get a book by price
exports.getBookByPrice = async (req, res) => {
  const { price } = req.params;

  try {
    const books = await Book.find({ price: price });

    if (books.length > 0) {
      // If books with the given price are found, send them in the response
      res.status(200).json(books);
    } else {
      // If no books are found with the given price
      res
        .status(404)
        .json({ message: `Tidak ada buku dengan harga '${price}'` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books by price", error: error.message });
  }
};

// Update a book by title
exports.updateBookByTitle = async (req, res) => {
  const { title } = req.params;
  const { category, author, genre, price } = req.body;

  try {
    // Find the book by title and update its details
    const book = await Book.findOneAndUpdate(
      { title },
      { category, author, genre, price },
      { new: true, runValidators: true }
    );

    if (book) {
      // If the book is found and updated
      res.status(200).json({
        message: `Buku berjudul '${title}' berhasil di-update`,
        data: book,
      });
    } else {
      // If no book is found with the given title
      res
        .status(404)
        .json({ message: `Buku berjudul '${title}' tidak ditemukan` });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating book",
      error: error.message,
    });
  }
};
