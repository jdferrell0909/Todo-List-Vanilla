const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRouter = require('./routes/items.js');
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

app.use('/api/items', itemRouter);

// app.get('/api/items', async (req, res, next) => {
//   await Todo.find({})
//     .then(data => {
//       console.log('Get data successful');
//       res.status(200).json(data);
//     })
//     .catch(err => {
//       console.log(err.messsage);
//       res.status(400).json(err.message);
//     });
// })

// app.post('/api/items/addItem', (req, res, next) => {
//   Todo.create({ text: req.body.text })
//     .then(() => {
//       console.log('Item created successfully');
//       res.status(201).json('Item created successfully');
//     })
//     .catch((err) => {
//       console.log(err.messsage);
//       res.status(400).json(err.message);
//     });
// })

// app.delete('/api/items/deleteAll', (req, res, next) => {
//   Todo.deleteMany({})
//     .then(() => {
//       console.log('Clear all successful');
//       res.status(200).json('Clear all successful');
//     })
//     .catch(err => {
//       console.log(err.messsage);
//       res.status(400).json(err.message);
//     });
// })

// app.delete('/api/items/deleteOne/:id', (req, res, next) => {
//   const { id } = req.params;
//   Todo.deleteOne({ _id: id })
//     .then(() => {
//       console.log('Delete one successful');
//       res.status(200).json('Delete one successful');
//     })
//     .catch(err => {
//       console.log(err.messsage);
//       res.status(400).json(err.message);
//     });
// })

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});


module.exports = app;