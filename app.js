const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./models/User');

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

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home')
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.render('Users/index', { users });
});

app.get('/users/new', (req, res) => {
  res.render('Users/new');
});

app.post('/users', async (req, res) => {
  const newUser = new User(req.body.user);
  await newUser.save();
  res.redirect(`/users/${newUser._id}`);
})

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('Users/show', { user });
});

app.get('/users/:id/edit', async(req, res) => {
  const user = await User.findById(req.params.id);
  res.render('users/edit', { user });
});

app.put('/users/:id', async(req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {...req.body.user});
  res.redirect(`/users/${user._id}`);
})

app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/users');
})




app.listen(3000, () => {
  console.log('serving on port 3000')
});