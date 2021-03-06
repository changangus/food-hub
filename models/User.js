const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  location: String,
  description: String,
})

module.exports = mongoose.model('User', UserSchema)