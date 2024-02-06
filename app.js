require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerUser = require('./routes/users');
const routerAuth = require('./routes/auth');
const routerMovie = require('./routes/movies');
const errorHandler = require('./middlewares/errorHandler');
const { corsOptions } = require('./utils/constants');
const auth = require('./middlewares/auth');
const { errors } = require('celebrate');
const { PORT } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
});
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(routerAuth);
app.use(auth);
app.use(routerUser);
app.use(routerMovie);
app.use(errors());
app.use(errorHandler);

app.listen(PORT)
