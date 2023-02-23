const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const stockController = require('../controllers/stockController');

router.get('/login/:username&:password', userController.login, stockController.getUserStocks, (req, res) => {
  res.status(200).json({portfolio : res.locals.portfolio, username : res.locals.activeUser.username, funds : res.locals.activeUser.funds})
})

router.post('/signup', userController.signUp, stockController.getUserStocks, (req, res) => {
  res.status(200).json({portfolio : res.locals.portfolio, username : res.locals.activeUser.username, funds : res.locals.activeUser.funds})
})

module.exports = router;