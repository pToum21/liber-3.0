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

// call gutendex Api Data
gutendexApiData();

// Set up an interval to run gutendex Api every 8 hours
const intervalInMilliseconds = 8 * 60 * 60 * 1000; 
setInterval(gutendexApiData, intervalInMilliseconds);

