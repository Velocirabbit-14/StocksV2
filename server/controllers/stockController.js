const db = require('../models/models');

const stockController = {};

// send {portfolio : [{ticker : , shares : }, ]}

stockController.getUserStocks = async (req, res, next) => {
  if (!res.locals.activeUser) return next();
  const userId = res.locals.activeUser._id;
  const values = [userId];
  const queryString = 'SELECT public.owned_stock.ticker, public.owned_stock.shares FROM public.owned_stock WHERE owned_stock.user_id = $1 AND owned_stock.shares != 0;';
  try {
    const data = await db.query(queryString, values);
    res.locals.portfolio = data.rows;
    return next();
  } catch (err) {
    return next(err);
  }
};

stockController.buyStock = async (req, res, next) => {
  const {ticker, price, shares, user_id: userId} = req.body;
  const values = [ticker, price, shares, userId];
  const queryString = 'INSERT INTO public.purchase(ticker, price, shares, user_id) VALUES($1, $2, $3, $4) RETURNING *;';
  try {
    const data = await db.query(queryString, values);
    res.locals.newPurchase = data.rows[0];
    return next();
  } catch (err) {
    return next(err);
  }
};

stockController.sellStock = async (req, res, next) => {
  const userId = req.body.user_id;
  const {ticker, price, shares} = req.body;
  const values = [ticker, price, shares, userId];
  const queryString = 'INSERT INTO public.sell(ticker, price, shares, user_id) VALUES($1, $2, $3, $4) RETURNING *;';
  try {
    const data = await db.query(queryString, values);
    res.locals.newSell = data.rows[0];
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = stockController;