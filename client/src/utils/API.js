function gutendexApiData() {
    fetch('https://gutendex.com/books/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Run gutendexApiData initially
gutendexApiData();

// Set up an interval to run gutendexApiData every 8 hours (in milliseconds)
const intervalInMilliseconds = 8 * 60 * 60 * 1000; // 8 hours
setInterval(gutendexApiData, intervalInMilliseconds);

