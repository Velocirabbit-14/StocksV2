const db = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// user table has username, password, funds

const userController = {};

userController.login = async (req, res, next) => {
  const { username, password } = req.params;
  const values = [username, hashedPassword];
  const checkUser = 'SELECT * FROM public.user WHERE username=$1';
  try {
    if (!db.query(checkUser).rows.length) throw TypeError('username or password incorrect');
    const passwordIsValid = await bcrypt.compare(checkUser.rows[0].password, password);
    if (!passwordIsValid) throw TypeError('username or password incorrect');
    return next();
  } catch (err) {
    return next(err);
  }
};

// expecting username and password and initial funds from request body
// check if username already taken
// if not taken, hash password with bcrypt and insert into database
// pass returned user info to next middleware
userController.signUp = async (req, res, next) => {
  const { username, password, funds } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const values = [username, hashedPassword, funds];
  const queryString =
      'INSERT INTO public.user(username, password, funds) VALUES($1, $2, $3) RETURNING *;';
  try {
    const newUserData = await db.query(queryString, values);
    res.locals.activeUser = newUserData;
    return next();
  } catch (err) {
    console.log('ERRORRRRRRRRRRRRRRRRRRRRR', err.detail);
    return next(err.detail);
  }
};

userController.buyStock = async (req, res, next) => {
  const { ticker, price, shares, user_id: userId } = res.locals.newPurchase;
  const values = [ticker, shares, userId];
  const queryString =
    'INSERT INTO public.owned_stock(ticker, shares, user_id) VALUES($1, $2, $3) ON CONFLICT (ticker, user_id) DO UPDATE SET shares = owned_stock.shares + $2 RETURNING*;';
  try {
    const data = await db.query(queryString, values);
    res.locals.updatedUserStock = data.rows[0];
    res.locals.priceModifier = +`-${price}`;
    return next();
  } catch(err) {
    return next(err);
  }
};

userController.sellStock = async (req, res, next) => {
  const { ticker, shares, price, user_id: userId } = res.locals.newSell;
  const values = [shares, ticker, userId];
  const queryString = 'UPDATE public.owned_stock SET shares = owned_stock.shares - $1 WHERE public.owned_stock.ticker = $2 AND public.owned_stock.user_id = $3 RETURNING *;';
  try {
    const data = await db.query(queryString, values);
    res.locals.updatedUserStock = data.rows[0];
    res.locals.priceModifier = price;
    return next();
  } catch(err) {
    return next(err);
  }
}

userController.adjustFunds = async (req, res, next) => {
  const userId = req.body.user_id;
  const values = [res.locals.priceModifier, userId];
  const queryString = 'UPDATE public.user SET funds = funds + $1 WHERE public.user._id = $2 RETURNING funds, username, _id;'
  try {
    const data = await db.query(queryString, values);
    res.locals.updatedUser = data.rows[0];
    res.locals.activeUser = data.rows[0];
    return next();
  } catch(err) {
    return next(err);
  }
}

module.exports = userController;
