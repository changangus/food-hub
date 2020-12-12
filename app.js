// Imported Dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMateEngine = require('ejs-mate');
// Imported Models
const User = require('./models/User');
const Company = require('./models/Company');

// Connecting Database
mongoose.connect('mongodb://localhost:27017/food-hub', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database Connected')
})

// Using Dependencies
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMateEngine);

// Basic Routes (TODO: refactor to use express router and have routes folder)
app.get('/', (req, res) => {
  res.render('home')
});

app.get('/companies', async (req, res) => {
  const companies = await Company.find();
  res.render('Companies/index', { companies });
});

app.get('/companies/new', (req, res) => {
  res.render('companies/new');
});

app.post('/companies', async (req, res) => {
  const newCompany = new Company(req.body.company);
  await newCompany.save();
  res.redirect(`/companies/${newCompany._id}`);
})

app.get('/companies/:id', async (req, res) => {
  const company = await Company.findById(req.params.id);
  res.render('companies/show', { company });
});

app.get('/companies/:id/edit', async(req, res) => {
  const company = await Company.findById(req.params.id);
  res.render('companies/edit', { company });
});

app.put('/companies/:id', async(req, res) => {
  const company = await Company.findByIdAndUpdate(req.params.id, {...req.body.company});
  res.redirect(`/companies/${company._id}`);
})

app.delete('/companies/:id', async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.redirect('/companies');
})

app.listen(3000, () => {
  console.log('serving on port 3000')
});