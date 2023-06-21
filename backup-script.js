const axios = require('axios');
const fs = require('fs');

const rssFeedUrl = process.env.GHOST_URL // Replace with the actual RSS feed URL

axios.get(rssFeedUrl)
  .then(response => {
    const rssFeed = response.data;
    fs.writeFile('rss-feed.xml', rssFeed, err => {
      if (err) {
        throw err;
      }
      console.log('RSS feed saved!');
    });
  })
  .catch(err => {
    console.error(err);
  });
