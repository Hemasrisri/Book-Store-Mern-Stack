const express = require('express')
const Book = require('./book.model.js');
const {postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook} = require('./book.controller.js');
const verifyAdminToken = require('../middleware/verifyAdminToken.js');
const router = express.Router();

// frontend => backend server => controller => book schema[valid] => database[request] => send data to server[response] =>
  //back to the frontend[response] 
// post a book
// post = when submit something fronted to db
//get = when get something back fronted to db
// put/patch = when edit or update something
//delete = when delete something

//post a book
router.post("/create-book", verifyAdminToken,postABook)

// get all books
router.get("/", getAllBooks)

//get single books
router.get("/:id",getSingleBook)

// update a book endpoint
router.put("/edit/:id", verifyAdminToken,UpdateBook)

router.delete("/:id", verifyAdminToken,deleteABook)
module.exports = router;