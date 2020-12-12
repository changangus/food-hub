const mongoose = require('mongoose');
// Schemas
const User = require('../models/User');
const Company = require('../models/Company');
// Seed Helpers
const cities = require('./cities');
const { firstNames, lastNames, companyType, descriptors, places } = require('./seedHelpers');

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
    await Company.deleteMany({});
    
    for(let i = 0; i < 50; i++){
      const randomCity = randomNum(1000);
      const randomCompanyName1 = randomNum(18);
      const randomCompanyName2 = randomNum(18);
      const randomCompanyType = randomNum(5);
      const randomFirstName = randomNum(25);
      const randomLastName = randomNum(25);

      const user = new User({
        name: `${firstNames[randomFirstName]} ${lastNames[randomLastName]}`,
        image: 'https://source.unsplash.com/1600x900/?person',
        email: `${firstNames[randomFirstName]}${lastNames[randomLastName]}@email.com`,
        location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
      });

      const company = new Company({
        name: `${descriptors[randomCompanyName1]} ${places[randomCompanyName2]}`,
        image: 'https://source.unsplash.com/1200x750/?farm',
        type: `${companyType[randomCompanyType]}`,
        location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  
      });
      await company.save();
      await user.save();
    } 
}

seedDB().then(() => {
  mongoose.connection.close()
})