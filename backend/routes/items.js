const express = require('express');
const itemController = require('../controllers/itemController.js');

const itemRouter = express.Router();

itemRouter.get('/', itemController.getItems, (req, res) => {
  res.status(200).json(res.locals.items);
})

itemRouter.post('/addItem', itemController.newItem, (req, res) => {
  res.status(201).json('Item created successfully');
})

itemRouter.delete('/deleteAll', itemController.deleteAll, (req, res) => {
  res.status(200).json('Clear all successful');
})

itemRouter.delete('/deleteOne/:id', itemController.deleteOne, (req, res) => {
  res.status(200).json('Delete one successful');
})

module.exports = itemRouter;