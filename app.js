require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerUser = require('./routes/users');
const routerAuth = require('./routes/auth');
const routerMovie = require('./routes/movies');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions } = require('./utils/constants');
const auth = require('./middlewares/auth');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');
const { PORT } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
});
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(routerAuth);
app.use(auth);
app.use(routerUser);
app.use(routerMovie);
app.use((req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT)
