const express = require('express');
const routerUser = require('./routes/users');
const routerAuth = require('./routes/auth');
const routerMovie = require('./routes/movies');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect('mongodb://127.0.0.1:27017//bitfilmsdb', {
  useUnifiedTopology: true,
});
const app = express();

app.use(routerAuth);
app.use(routerUser);
app.use(routerMovie);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('PORT 3000')
})
