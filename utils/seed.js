const connection = require('../config/connection');
const { User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await User.deleteMany({});

  const users = [
    {
      username: "katebee",
      email: "katebee@kate.com",
      thoughts: [],
      friends: []
    }
  ];


  await User.collection.insertMany(users);

  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
