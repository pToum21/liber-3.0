// Use axios to fetch
const axios = require('axios');

// export fetch function
module.exports = async function fetchData() {
  // page passed in from runGutFetchLoop()
  function fetchData(page) {
    const apiUrl = `https://gutendex.com/books/?page=${page}`;
    // fetch 32 books from page
    axios.get(apiUrl)
      .then(response => {
        // loop through the 32 books from the page to retrieve id of each book
        for (let i = 0; i <= 5; i++) {
          const bookId = response.data.results[i].id

          // insert id into book text's url structure
          const txtUrl = `https://www.gutenberg.org/ebooks/${bookId}.txt.utf-8`

          // fetch actual book text
          axios.get(txtUrl)
            .then(response => {

              console.log(response.data)
            })
        }

        console.log(`Data from page ${page}:`, response.data);
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
