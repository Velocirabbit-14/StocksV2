const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const stockController = require('../controllers/stockController');

router.get(
  '/login/:username&:password',
  userController.login,
  userController.createSession,
  stockController.getUserStocks,
  (req, res) => {
    res
      .status(200)
      .json({
        portfolio: res.locals.portfolio,
        user: res.locals.activeUser,
        funds: res.locals.activeUser.funds,
        session: res.locals.newSession,
      });
  }
);

router.get(
  '/session',
  userController.checkSession,
  stockController.getUserStocks,
  (req, res) => {
    res
      .status(200)
      .json({
        portfolio: res.locals.portfolio,
        user: res.locals.activeUser,
        funds: res.locals.activeUser.funds,
      });
  }
);

router.post(
  '/signup',
  userController.signUp,
  userController.createSession,
  stockController.getUserStocks,
  (req, res) => {
    res
      .status(200)
      .json({
        portfolio: res.locals.portfolio,
        user: res.locals.activeUser,
        funds: res.locals.activeUser.funds,
        session: res.locals.newSession,
      });
  }
);

module.exports = router;
