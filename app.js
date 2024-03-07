require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routerUser = require('./routes/users');
const routerAuth = require('./routes/auth');
const routerMovie = require('./routes/movies');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions } = require('./utils/constants');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const { PORT, DATABASE, NODE_ENV } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DATABASE : 'mongodb://127.0.0.1:27017/bitfilmsdb', {
});

const app = express();
app.use(cors(corsOptions));
app.use(helmet());
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

app.listen(PORT);
