const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const stockController = require('../controllers/stockController');

router.post('/buy', stockController.buyStock, userController.buyStock, userController.adjustFunds, stockController.getUserStocks, (req, res) => {
  res.status(200).json({purchase : res.locals.newPurchase, userStock : res.locals.updatedUserStock, updatedUser : res.locals.updatedUser, portfolio : res.locals.portfolio})
})

router.post('/sell', stockController.sellStock, userController.sellStock, userController.adjustFunds, stockController.getUserStocks, (req, res) => {
  res.status(200).json({sell : res.locals.newSell, userStock : res.locals.updatedUserStock, updatedUser : res.locals.updatedUser, portfolio : res.locals.portfolio})
})

module.exports = router;