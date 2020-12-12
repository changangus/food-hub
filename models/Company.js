const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: String,
  image: String,
  type: String,
  location: String,
  description: String,
  employees: Array
});

module.exports = mongoose.model('Company', CompanySchema);