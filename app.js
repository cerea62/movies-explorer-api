const express = require('express')

mongoose.connect('mongodb://127.0.0.1:27017//bitfilmsdb', {
  useUnifiedTopology: true,
});
const app = express();


app.listen(3000, () => {
  console.log('PORT 3000')
})
