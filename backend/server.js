const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const itemRouter = require('./routes/items.js');
const authRouter = require('./routes/auth.js');
const { Todo } = require('./models/TodoModel.js');

const app = express();
dotenv.config();
app.use(express.json());

// app.use(express.static(path.join(__dirname, "../")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname + './../auth.html'));
});
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + './../auth.html'));
// })

const PORT = 3000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('database connected......'))
  .catch((err) => console.log(err.messages));

app.use('/api/items', itemRouter);
app.use('/api/auth', authRouter);


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});


module.exports = app;