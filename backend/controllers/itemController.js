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
      return next(err.message);
    });
}