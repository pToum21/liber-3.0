// Use axios to fetch
const axios = require('axios');
// require mongoose to save to database
const mongoose = require('mongoose');
// book model so we can make a new book to save to database
const { Book } = require('../models');

// export fetch function
module.exports = async function fetchData() {
  // page passed in from runGutFetchLoop()
  function fetchData(page) {
    // try { <--comment back in. use try catch block when trying to save to db
    const apiUrl = `https://gutendex.com/books/?page=${page}`;
    // fetch 32 books from page
    axios.get(apiUrl)
      .then(async (response) => {

        // // ATTEMPT TO SAVE SINGLE BOOK TO DATABASE -- if successful, author will need to be in a for loop for potential multiple authors
        // // currently gonna test saving one book in db, commenting out loop, hardcoding in bookid
        // // each book is put into variable so we dont have to repeat same line of code for each property we access

        // const bookData = response.data.results[0];

        // const bookId = bookData.id;
        // const title = bookData.title;
        // const authors = bookData.authors[0].name;
        // // image comes in form of url; problem is if that image no longer exists in gutdendex, we have no image. may want to fetch image? i tried it though, and when i console logged, it was funky looking. maybe its binary stuff? idk what i was looking at. - Ryan
        // const image = bookData.formats['image/jpeg'];
        // // actual book text, bookId is inserted into url structure
        // const textUrl = `https://www.gutenberg.org/ebooks/${bookId}.txt.utf-8`


        // // fetch and logs actual book text 
        // // [because the response is too long for temrinal, comment this .get() block of code to see the other logged data in terminal]
        // //COMMENT BACK IN TO SEE THE BOOK TEXT

        // const text = axios.get(textUrl)
        //   .then(response => {
        //     console.log(response.data)
        //   })

        // console.log(bookId, title, authors, image, text);

        // const newBook = new Book({
        //   bookId: bookId,
        //   title: title,
        //   authors: authors,
        //   image: image,
        //   text: text,
        // });

        // await newBook.save();
        // // console.log('Book saved to db', newBook)



        //=================================

        // response is the 32 books from the page
        // loop through the 32 books from the page to retrieve id of each book
        // i is a book. results is the array of books

        for (let i = 0; i <= 1; i++) {
          // each book is put into variable so we dont have to repeat same line of code for each property we access
          const bookData = response.data.results[i];

          const bookId = bookData.id;
          const title = bookData.title;
          const authors = bookData.authors.map(author => author.name);
          // image comes in form of url; problem is if that image no longer exists in gutdendex, we have no image. may want to fetch image? i tried it though, and when i console logged, it was funky looking. maybe its binary stuff? idk what i was looking at. - Ryan
          const image = bookData.formats['image/jpeg'];
          // actual book text, bookId is inserted into url structure
          const text = `https://www.gutenberg.org/ebooks/${bookId}.txt.utf-8`

          const newBook = new Book({
            title: title,
            bookId: bookId,
            authors: bookData.authors,
            image: image,
            text: text
          });
          try {
            await newBook.save()
            console.log("Book saved", newBook)
          } catch (error) {
            console.error("error saving to book:", error)
            
          }
          console.log(bookId, title, authors, image, text);


          //   // fetch and logs actual book text 
          //   // [because the response is too long for terminal, comment this .get() block of code to see the other logged data in terminal]
          //   // response.data is actual book text

          //   //COMMENT BACK IN TO SEE THE BOOK TEXT
          //   // axios.get(text)
          //   //   .then(response => {
          //   //     console.log(response.data)
          //   //   })
          // }

          // this logs each book from the page we are on
          // console.log(`Data from page ${page}:`, response.data);

        } //closes for loop
      }) // closes .then()
      .catch(error => {
        console.error(`Error fetching data from page ${page}:`, error);
      });

    // COMMENT BELOW CATCH BACK IN WHEN USING TRY CATCH BLOCK
    // } catch (error) {
    //   console.error(`Error fetching and saving data from page ${page}:`, error);
    // }
  }//ends function

  function runGutFetchLoop() {
    // Fetch data from page 1 to page 50
    for (let page = 1; page <= 1; page++) {
      fetchData(page);
    }
  }

  // Run the fetch cycle initially
  runGutFetchLoop();

  // Set up an interval to run the fetch cycle every 8 hours (in milliseconds)
  const intervalInMilliseconds = 8 * 60 * 60 * 1000;
  setInterval(runGutFetchLoop, intervalInMilliseconds);






}

// Call the function to fetch data
