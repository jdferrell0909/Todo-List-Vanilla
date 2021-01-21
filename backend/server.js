const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Todo } = require('./models/TodoModel.js');

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../")));

const PORT = 3000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('database connected......'))
  .catch((err) => console.log(err.messages));

app.get('/api', async (req, res, next) => {
  console.log('inside GET')
  await Todo.find({})
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(err => console.log(err.message));
})

app.post('/api/addItem', (req, res, next) => {
  console.log('successful POST----> ', req.body.text);
  Todo.create({ text: req.body.text })
    .then((result) => console.log(result))
    .catch((err) => console.log(err.message));
  res.status(201).json('successful');
})

app.delete('/api/deleteAll', (req, res, next) => {
  console.log('inside DELETE');
  Todo.deleteMany({})
    .then(response => console.log(response))
    .catch(err => console.log(err.messsage));
  res.status(200).json();
})

app.delete('/api/deleteOne/:id', (req, res, next) => {
  console.log('inside delete one');
  const { id } = req.params;
  console.log(id);
  Todo.deleteOne({ _id: id })
    .then(response => console.log(response))
    .catch(err => console.log(err.message));
  res.status(200).json();
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;