const { Todo } = require('../models/TodoModel.js');

const itemController = {};

itemController.getItems = async (req, res, next) => {
  await Todo.find({})
    .then(data => {
      console.log('Get data successful');
      res.locals.items = data;
      return next();
    })
    .catch(err => {
      console.log(err.messsage);
      res.status(400).json(err.message);
    });
}

itemController.newItem = (req, res, next) => {
  Todo.create({ text: req.body.text })
    .then(() => {
      console.log('Item created successfully');
      // res.status(201).json('Item created successfully');
      return next();
    })
    .catch((err) => {
      console.log(err.messsage);
      res.status(400).json(err.message);
    });
}

itemController.deleteAll = (req, res, next) => {
  Todo.deleteMany({})
    .then(() => {
      console.log('Clear all successful');
      return next();
    })
    .catch(err => {
      console.log(err.messsage);
      res.status(400).json(err.message);
    });
}

itemController.deleteOne = (req, res, next) => {
  const { id } = req.params;
  Todo.deleteOne({ _id: id })
    .then(() => {
      console.log('Delete one successful');
      return next();
    })
    .catch(err => {
      console.log(err.messsage);
      res.status(400).json(err.message);
    });
}

module.exports = itemController;