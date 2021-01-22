const express = require('express');
const authController = require('../controllers/authControllers.js');

const authRouter = express.Router();

authRouter.post('/login', authController.login, (req, res) => {
  res.status(201).json('login POST');
})


module.exports = authRouter;