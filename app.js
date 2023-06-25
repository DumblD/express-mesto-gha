const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorsHandler = require('./middlwares/error');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.use(errors());
app.use(errorsHandler);

app.listen(3000, () => {
  console.log('Listening port 3000');
});
