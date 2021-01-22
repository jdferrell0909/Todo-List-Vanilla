const { User } = require('../models/UserModel.js');

const authController = {};

authController.login = (req, res, next) => {
  res.sendFile(path.join(__dirname, "./../index.html"));

}

module.exports = authController;