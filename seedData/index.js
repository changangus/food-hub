const mongoose = require('mongoose');
const User = require('../models/User');
const cities = require('./cities');
const { firstNames, lastNames } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/food-hub', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database Connected')
});

const randomNum = (num) => {
  return Math.floor(Math.random() * num);
}

const seedDB = async () => {
    await User.deleteMany({});
    for(let i = 0; i < 50; i++){
      const randomCity = randomNum(1000);
      const randomFirstName = randomNum(25);
      const randomLastName = randomNum(25);

      const user = new User({
        name: `${firstNames[randomFirstName]} ${lastNames[randomLastName]}`,
        email: `${firstNames[randomFirstName]}${lastNames[randomLastName]}@email.com`,
        location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
      })

      await user.save()
    } 
}

seedDB().then(() => {
  mongoose.connection.close()
})