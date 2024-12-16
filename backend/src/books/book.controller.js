const Book = require("./book.model");

const postABook =  async (req, res) => {
    try {
      const newBook = new Book({
        ...req.body
      });
      await newBook.save();
      res.status(200).send(
        JSON.stringify({
          message: "Book posted successfully",
          book: newBook
        }, null, 2)  // `2` is the number of spaces for indentation
      );
    }catch (error) {
      console.error("Error creating book:", error);
      res.status(500).send(
        JSON.stringify({
          message: "Failed to create book"
        }, null, 2)  // `null` skips any replacer function, and `2` sets indentation to 2 spaces
      );
    }
  }
  
  //get all books
  const getAllBooks = async(req,res) => {
         try {
          const books = await Book.find().sort({ createdAt: -1});
          res.status(200).send(
            JSON.stringify({
            books
            }, null, 2)  // `2` is the number of spaces for indentation
          );
         } catch(error){
            console.error("Error Fetching books:", error);
            res.status(500).send(
              JSON.stringify({
                message: "Failed to fetch books"
              }, null, 2)  // `null` skips any replacer function, and `2` sets indentation to 2 spaces
            ); 
         }
  }


  //get single book

  const getSingleBook = async(req,res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            res.status(404).send(
                JSON.stringify({
                  message: "Book not found!",
                }, null, 2)  // `2` is the number of spaces for indentation
              );
        }
        res.status(200).send(
          JSON.stringify({
          book
          }, null, 2)  // `2` is the number of spaces for indentation
        );
       } catch(error){
          console.error("Error Fetching books:", error);
          res.status(500).send(
            JSON.stringify({
              message: "Failed to fetch books"
            }, null, 2)  // `null` skips any replacer function, and `2` sets indentation to 2 spaces
          ); 
       }
  }

 // update book data
 const UpdateBook = async(req,res) => {
   try {
      const {id} = req.params;
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
      if(!updatedBook){
        res.status(404).send(
            JSON.stringify({
              message: "Book is not found!",
            }, null, 2)  // `2` is the number of spaces for indentation
          );
      }

      res.status(200).send(
        JSON.stringify({
          message: "Book Updated successfully",
          book: updatedBook
        }, null, 2)  // `2` is the number of spaces for indentation
      );

   } catch (error) {
    console.error("Error Updating books:", error);
    res.status(500).send(
      JSON.stringify({
        message: "Failed to update a books"
      }, null, 2)  // `null` skips any replacer function, and `2` sets indentation to 2 spaces
    ); 
   }
 }

 //Delete a Book
 
 const deleteABook = async(req,res) => {
     try {
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            res.status(404).send(
                JSON.stringify({
                  message: "Book is not found!",
                }, null, 2)  // `2` is the number of spaces for indentation
              );   
        }
        
        res.status(200).send(
            JSON.stringify({
              message: "Book Deleted successfully",
              book: deletedBook
            }, null, 2)  // `2` is the number of spaces for indentation
          );

     } catch (error) {
        console.error("Error Deleting a book:", error);
        res.status(500).send(
          JSON.stringify({
            message: "Failed to delete a books"
          }, null, 2)  // `null` skips any replacer function, and `2` sets indentation to 2 spaces
        ); 
     }
 };


  module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    UpdateBook,
    deleteABook
  }