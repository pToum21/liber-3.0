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
    try {
      const apiUrl = `https://gutendex.com/books/?page=${page}`;
      // fetch 32 books from page
      axios.get(apiUrl)
        .then(async (response) => {
          for (let i = 0; i < response.data.results.length; i++) {
            const bookData = response.data.results[i];
            const bookId = bookData.id;
            const title = bookData.title;
            const imageUrl = bookData.formats['image/jpeg'];
            const textUrl = `https://www.gutenberg.org/ebooks/${bookId}.txt.utf-8`;

            console.log(imageUrl);


            const imageResponse = await axios.get(imageUrl);
              // console.log('this is an image:',imageResponse.data)

            
            const textResponse = await axios.get(textUrl);
            const text= textResponse.data;

            try {
              const newBook = await Book.create({
                title: title,
                bookId: bookId,
                authors: bookData.authors,
                image: {
                  data: imageResponse.data,
                  contentType: 'image/jpeg',
                },
                text: text
              });
              console.log('this is a new book:', newBook);

              // console.log("Book saved", newBook);
            } catch (error) {
              console.error("Error saving to book:", error);
            }
            // console.log(bookId, title, authors, image, text);
          } //closes for loop
        }) // closes .then()
        .catch(error => {
          console.error(`Error fetching data from page ${page}:`, error);
        });
    } catch (error) {
      console.error(`Error fetching and saving data from page ${page}:`, error);
    }
  }//ends function

  function runGutFetchLoop() {
    // Fetch data from page 1 to page 50
    for (let page = 1; page <= 25; page++) {
      fetchData(page);
    }
  }
  // Run the fetch cycle initially
  runGutFetchLoop();

  // Set up an interval to run the fetch cycle every 8 hours (in milliseconds)
  const intervalInMilliseconds = 8 * 60 * 60 * 1000;
  setInterval(runGutFetchLoop, intervalInMilliseconds);
}

