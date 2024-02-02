// Use axios to fetch
const axios = require('axios');

// export fetch function
module.exports = async function fetchData() {
  // page passed in from runGutFetchLoop()
  function fetchData(page) {
    const apiUrl = `https://gutendex.com/books/?page=${page}`;
    // fetch 32 books from page
    axios.get(apiUrl)
      .then(async (response) => {
        // response is the 32 books from the page
        // loop through the 32 books from the page to retrieve id of each book
        for (let i = 0; i <= 5; i++) {
          const bookData = response.data.results[i];

          const bookId = bookData.id;
          const title = bookData.title;
          const authors = bookData.authors;
          const image = bookData.formats['image/jpeg'];
          const text = `https://www.gutenberg.org/ebooks/${bookId}.txt.utf-8`

          console.log(bookId, title, authors, image, text);

          // insert id into book text's url structure
         

          // fetch and logs actual book text 
          // [because the response is too long for temrinal, comment this .get() block of code to see the other logged data in terminal]
          //COMMENT BACK IN TO SEE THE BOOK TEXT

          // axios.get(text)
          //   .then(response => {
          //     console.log(response.data)
          //   })
        }

        // this logs each book from the page we are on
        // console.log(`Data from page ${page}:`, response.data);

      })
      .catch(error => {
        console.error(`Error fetching data from page ${page}:`, error);
      });
  }

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
