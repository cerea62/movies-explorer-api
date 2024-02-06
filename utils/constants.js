const IS_URL = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s!"#'()*+,:;<>@[\\\]`{|}~]*$/;
const CREATED = 201;
const OK = 200;
const MONGO_DUPLICATE_ERROR = 11000;
const corsOptions = {
  origin: [
    'https://cerea62.nomoredomainsmonster.ru',
    'http://cerea62.nomoredomainsmonster.ru',
    'http://localhost:3000',
  ],
  credentials: true,
};

module.exports = {
  IS_URL, corsOptions, CREATED, OK, MONGO_DUPLICATE_ERROR,
};
