const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

const userController = require('./controllers/userController');
const stockController = require('./controllers/stockController');
const userRouter = require('./routes/userRouter');
const stockRouter = require('./routes/stockRouter');


app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/api/stocks', stockRouter);

app.use('/api/user', userRouter);

app.use((err, req, res, next) => {
  console.log(err.log);
  res.status(404).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});