const GhostAdminAPI = require('@tryghost/admin-api');
const fs = require('fs');

const api = new GhostAdminAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_KEY,
  version: 'v5.51.1'
});

// Prepare an object to hold all our data
const backup = {
  db: [{
    meta: {
      exported_on: Date.now(),
      version: '4.48.9'
    },
    data: {}
  }]
};

// Fetch all posts, tags, users, and settings
Promise.all([
  api.posts.browse({ limit: 'all' }).then(posts => (backup.db[0].data.posts = posts)),
  api.tags.browse({ limit: 'all' }).then(tags => (backup.db[0].data.tags = tags)),
  api.users.browse({ limit: 'all' }).then(users => (backup.db[0].data.users = users)),
  api.settings.browseAll().then(settings => (backup.db[0].data.settings = settings))
])
  .then(() => {
    // Write our data to a JSON file
    fs.writeFile('ghost-backup.json', JSON.stringify(backup, null, 2), err => {
      if (err) {
        throw err;
      }
      console.log('Backup complete!');
    });
  })
  .catch(err => {
    console.error(err);
  });
