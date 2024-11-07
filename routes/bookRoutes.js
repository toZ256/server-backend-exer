const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController.js");

router.post("/addBuku", bookController.addBook);
router.get("/", bookController.getAllBooks);
router.get("/title/:title", bookController.getBookByTitle);
router.delete("/title/:title", bookController.deleteBookByTitle);
router.put("/title/:title", bookController.updateBookByTitle);
router.get("/price/:price", bookController.getBookByPrice);

module.exports = router;
