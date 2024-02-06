require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUser = require('./routes/users');
const routerAuth = require('./routes/auth');
const routerMovie = require('./routes/movies');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
// const { PORT } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
});
const app = express();
app.use(bodyParser.json());

app.use(routerAuth);
app.use(auth);
app.use(routerUser);
app.use(routerMovie);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('PORT 3000')
})
